import { supabase } from "../supabaseClient";
import { PopUpResult, storageNames, type Leaderboard, SortLeaderboard, PopupTimesUp } from "../utilities/general";
import { Hidden, Reveal } from "../utilities/icons";
// import { BackdropBlur } from "../utilities/components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Kanji, n5Kanji, type HardKanji } from "../syllabary-kanji";
import { generateQuestion, AnswerSound, isKanji, score, CountdowntoStart, CountdowntoStartIndicator } from "../utilities/quiz";
// import { KotobeLevelTheme } from "../syllabary/kanji-n5";
import "../style.css";

type KanjiMastery ={
  kanji: string,
  correct: number,
  incorrect: number,
  mastery: number
}

export default function KanjiQuizN5({ library = n5Kanji, isExercise = false }) {

  const [libraryDatabase, setLibraryDatabase] = useState<Kanji[]>(library); // A level of kanjis
  const [requestedKana, setRequestedKana] = useState<string[]>(libraryDatabase.map(item => item.kanji));  // List of kanji to be tested

  // Supabase trial
  const getLeaderboard = async () => {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (error) {
      console.error(error)
      return []
    }

    return data;
  }

  const timerTotalSeconds = 1800;
  const storageName = storageNames;
  const bouncingTime = 400;
  localStorage.setItem(storageName['learn'], JSON.stringify(['thisKanji', 'thatKanji']));
    
  const playCorrect = useSound(AnswerSound.correct);
  const playCorrectStreak = useSound(AnswerSound.streak);
  const playWrong = useSound(AnswerSound.incorrect);

  const [showAnswer, setShowAnswer] = useState(false); // Manually show the meaning of a kanji on the bottom right
  const [isBouncing, setIsBouncing] = useState(false); // Trigger bouncing effect when correct
  // const [isWiggle, setIsWiggle] = useState(false); // Trigger wiggle effect when wrong
  const [scoreLeaderboard, setScoreLeaderboard] = useState<Leaderboard[]>([]);

  // Scoring
  const [popupScore, setPopupScore] = useState({ open: false, title: 'Default' })
  const [userScore, setUserScore] = useState({name: '', score: 0, correct: 0, incorrect: 0}) // User score by answering correctly
  const [initTimeScore, setInitTimeScore] = useState<number>(0) // Initial time before an answer for scoring purpose
  
  // To help in determining if a user has mastered a certain kanji
  const [kanjiMastery, setKanjiMastery] = useState<KanjiMastery[] | null>(() => {
    const saved = localStorage.getItem("kanji");
    return saved ? JSON.parse(saved) : null;
  });

  const isProcessing = useRef(false); // Prevent undesirable double clicks

  const [isTimesUp, setTimesUp] = useState(false) // Indicate time is up
  // const [countdownStatus, setCountdownStatus] = useState<number>(CountdowntoStartIndicator.idling)
  const [countdownStatus, setCountdownStatus] = useState<number>(CountdowntoStartIndicator.finished)
  const gameOngoing = countdownStatus > CountdowntoStartIndicator.finished

  const [isLevelFinished, setIsLevelFinished] = useState(false) // Indicate if the user has finished answering a level
  const exerciseMode = isExercise; // Auto skip a review session after an incorrect answer


  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [levelSelect, setLevelSelect] = useState(0) // Level number
  // const [levelTheme, setLevelTheme] = useState("") // Level name
  const [levelChange, setLevelChange] = useState(false) // Trigger level changing effects (Reset kanji list etc.)
  // const [levelShow, setLevelShow] = useState(false); // Trigger to show dropdown of available levels
  // const levelList = [
  //   ...new Set(
  //     library
  //       .map(item => item.round)
  //       .filter((round): round is number => round !== undefined)
  //   )
  // ].sort((a, b) => a - b);

  // Cl

  // Set the marked choice as wrong
  const [chosenWrongAnswer, setChosenWrongAnswer] = useState({
    target: null as HTMLButtonElement | null,
    kanji: null as Kanji | null
  });
  const answerReferences = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];

  const hasStarted = countdownStatus >= CountdowntoStartIndicator.finished
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [wrongIndicator, setWrongIndicator] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState(1);
  const [questionLength, setQuestionLength] = useState(library.length);
  const [question, setQuestion] = useState(() =>
    getQuestion()
  );

  function getQuestion() {
    return generateQuestion(libraryDatabase, "kanji", requestedKana);
  }

  function remedyKanji(kanji: string) {
    const hardKanji: HardKanji[] = JSON.parse(
      localStorage.getItem("hard_kanji") ?? "[]"
    );

    const existing = hardKanji.find(k => k.kanji === kanji);

    if (existing) {
      existing.wrongCount++;
    } else {
      hardKanji.push({
        kanji,
        wrongCount: 1,
      });
    }

    localStorage.setItem("hard_kanji", JSON.stringify(hardKanji));
  }

  // Timer
  const [countTimer, setCountTimer] = useState(timerTotalSeconds);
  const [countRunning, setCountRunning] = useState(false);
  const [countdown, setCountdown] = useState({ minutes: 0, seconds: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [triggerTimer, setTriggerTimer] = useState(false);

  const calculatePoints = (completionTime: number) => {
    const elapsed = (performance.now() - completionTime) / 1000;

    const interval = Math.min(
      score.maxTime,
      Math.max(score.minTime, elapsed)
    );

    const normalized =
      1 -
      (interval - score.minTime) /
      (score.maxTime - score.minTime);

    return Math.floor(
      500 *
      Math.pow(normalized, score.multiplier) *
      Math.max(1, Math.min(10, correctStreak))
    );
  }
  
  function ClosePopupScore(title: string = "Time's up") {
    setPopupScore(prev => ({
      title: title ?? prev.title,
      open: false,
    }));
  }
  
  function ResetScore(){
    setCorrectStreak(0)
    setUserScore({ score: 0, name: '', incorrect: 0, correct: 0})
  }

  function ResetLevelKanji() {
    setRequestedKana(libraryDatabase.map(item => item.kanji));
    setQuestionNo(1)
    setIsLevelFinished(false)
    setTriggerTimer(false)
    ResetScore()
  }

  function ResetLevel(){
    pauseCountdown()
    ClosePopupScore()
    ResetLevelKanji()
    setTimesUp(false)
    setCountRunning(false)
    setCountTimer(timerTotalSeconds)
  }

  // Countdown before the quiz is active.
  function beginStartCountdown(){
    setCountdownStatus(CountdowntoStartIndicator.counting)
  }

  // Timer start
  function beginCountdown() {
    // Check if 
    if (countdownStatus < CountdowntoStartIndicator.finished) return
    setCountdownStatus(CountdowntoStartIndicator.hasStarted)

    // Prevent multiple intervals
    if (popupScore.open) {
      setPopupScore((prev) => ({ ...prev, open: false}))
    }

    if (timerRef.current !== null || countRunning) return;
    setInitTimeScore(performance.now()) // Set initial time before answering

    setTriggerTimer(!triggerTimer);
    setCountRunning(true)

    timerRef.current = setInterval(() => {
      setCountTimer(prev => {
        if (prev <= 1) {
          pauseCountdown();
          handleTimeOut();
          setCountRunning(false)
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  function pauseCountdown() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setCountRunning(false)
    setTriggerTimer(!triggerTimer);
  }

  function handleTimeOut() {
    setTimesUp(true);
    setPopupScore({ open: true, title: "Time's Up"})
  }

  useEffect(() => {
    const countMinutes = Math.floor(countTimer / 60);
    const countSeconds = countTimer % 60

    setCountdown({
      minutes: countMinutes,
      seconds: countSeconds
    })
  }, [countTimer])

  function useSound(path: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      audioRef.current = new Audio(path);
      audioRef.current.load();
    }, [path]);

    const play = () => {
      if (!audioRef.current) return;

      audioRef.current.currentTime = 0;
      audioRef.current.play();
    };

    return play;
  }

  function processLevelFinished(){
      setIsLevelFinished(true)
      pauseCountdown()
  }

  function nextQuestion(correct: boolean = true) {
    if (isProcessing) {
      transitionTimeoutRef.current = setTimeout(() => {
        isProcessing.current = false;
      }, 200)
    }

    // User has ansewered all kanjis in the corresponding level
    if (requestedKana.length == 0) {
      processLevelFinished()
      return
    }

    if (correct) {
      setQuestionNo(prev => prev + 1); // Trigger useEffect
      setCorrectStreak(prev => prev + 1)
    }
    setInitTimeScore(performance.now()) // Set up for the next score calculation
    setQuestion(getQuestion());
    setWrongIndicator(false);

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }

  function isAnswerCorrect(selected: string){
    return selected === question.correct.romaji;
  }

  function calculateMastery(isCorrect: boolean, kanji: Kanji) {
    setKanjiMastery(prev => {
      const current = prev ?? [];
      const existing = current.find(item => item.kanji === kanji.kanji);

      if (!existing) {
        return [
          ...current,
          {
            kanji: kanji.kanji,
            incorrect: isCorrect ? 0 : 1,
            correct: isCorrect ? 1 : 0,
            mastery: isCorrect ? 0.2 : 0
          }
        ];
      }

      return current.map(item => {
        if (item.kanji !== kanji.kanji) return item;

        const correct = item.correct + (isCorrect ? 1 : 0);
        const incorrect = item.incorrect + (isCorrect ? 0 : 1);

        return {
          ...item,
          correct,
          incorrect,
          mastery: correct - incorrect >= 20 
            ? 1 
            : Math.min(Math.max(0, correct / (correct + incorrect)), 0.70)
        };
      });
    });
  }

  function handleTypeAnswer(chosen: Kanji, answer?: HTMLButtonElement | null ) {
    // Prevent double click
    if (isProcessing.current) return;
    isProcessing.current = true;

    const selected = chosen.romaji

    // Correct
    if (selected === question.correct.romaji) {
      // Record if showAnswer was initially clicked by user.
      setUserScore((prev) => ({ ...prev, score: prev.score + calculatePoints(initTimeScore), correct: prev.correct + 1 })); // Calculate score
      const demandedShown = showAnswer
      if (!demandedShown) {
        setShowAnswer(true)
      }
      setIsBouncing(true)
      countdownTimeoutRef.current = setTimeout(() => {
        setIsBouncing(false)
        if (!demandedShown) { 
          setShowAnswer(false)
        }
        setRequestedKana(requestedKana.filter(item => item !== (question.correct as Kanji).kanji));
      }, bouncingTime)
      
      // nextQuestion(); Generated at useEffect
      if (correctStreak >= 10) {
        playCorrectStreak()
      } else {
        playCorrect()
      }

      calculateMastery(true, chosen)
      return () => {
        if (countdownTimeoutRef.current) {
          clearTimeout(countdownTimeoutRef.current);
        }
      };
    } else {
      if (answer) {
        setChosenWrongAnswer({
          target: answer,
          kanji: chosen
        })
      }
      calculateMastery(false, chosen)
      wrongAnswer()
    }
  }

  function wrongAnswer(){
    pauseCountdown()
    setUserScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }))
    // setIsWiggle(true)
    setTimeout(() => {
      // setIsWiggle(false)

      // Auto skip review for maximum time spend to exercise
      if (exerciseMode) {
        continueAfterWrong()
      }
    }, bouncingTime)
    setCorrectStreak(0);
    remedyKanji((question.correct as Kanji).kanji)
    playWrong()
    setWrongIndicator(true)
  }

  function continueAfterWrong() {
    nextQuestion(false)
    beginCountdown()
    setWrongIndicator(false)
    setChosenWrongAnswer({kanji: null, target: null})
  }

  function renewKanjiList(kanjis: Kanji[]){
    setLibraryDatabase(kanjis);
    setQuestionLength(kanjis.length);
    setRequestedKana(kanjis.map(prev => prev.kanji));
  }

  function buttonChangeLevel(level: number){
    const kanjis = library.filter(item => item.round == level);
    setLevelSelect(level)
    // setLevelShow(false)
    beginCountdown()
    // setLevelTheme(
    //     KotobeLevelTheme.find(item => item.level === level)?.theme ?? ""
    // );
    if (kanjis.length > 0) {
      // setRequestedKana(kanjis);
      console.log(kanjis)
      renewKanjiList(kanjis)
      setLevelChange(true);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("Triggered keydown: ", {
        countRunning,
        isTimesUp,
        isLevelFinished,
        gameOngoing
      })
      if (!countRunning || isTimesUp || isLevelFinished || !gameOngoing) return
      e.preventDefault();

      if (e.key === "Tab") {
        if (isLevelFinished) {
          buttonChangeLevel(levelSelect)
          return
        }

        if (wrongIndicator) {
          continueAfterWrong();
        } else if (!wrongIndicator){
          wrongAnswer()
        }
        return;
      }

      const index = Number(e.key) - 1;
      if (
        !wrongIndicator &&
        index >= 0 &&
        index < question.answers.length + 1
      ) {
        e.preventDefault();
        handleTypeAnswer(question.answers[index] as Kanji);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wrongIndicator, question, triggerTimer]);

  
  useEffect(() => {
    if (library.length === requestedKana.length) return
    if (levelChange) {
      setIsLevelFinished(false) // Equal to replay
      setQuestion(getQuestion())
      setLevelChange(false)
    } else {
      nextQuestion(requestedKana.length !== libraryDatabase.length)
    }
  }, [levelChange, requestedKana])

  useEffect(() => {
    if (isLevelFinished) {
      setPopupScore({ open: true, title: "Level Complete"})
    }
  }, [isLevelFinished])

  useEffect(() => {
    if (countdownStatus == CountdowntoStartIndicator.finished) {
      beginCountdown()
    }
  }, [countdownStatus])

  useEffect(() => {
    console.log('From ', !countRunning, ' to ', countRunning);
  }, [countRunning])

  useEffect(() => {
    const loadLeaderboard = async () => {
      const leaderboard = await getLeaderboard();
      setScoreLeaderboard(SortLeaderboard(leaderboard));
    };

    loadLeaderboard();
    // beginStartCountdown();
    // handleTypeAnswer('incorrect')
    beginCountdown();
  }, []);

  useEffect(() => {
    localStorage.setItem('kanji', JSON.stringify(kanjiMastery))
    console.log(kanjiMastery)
  }, [kanjiMastery])

  return (
    <div className="flex flex-col overflow-hidden px-5 py-10 h-dvh relative">
      <Link
        to='/'
        className={`
          absolute
          top-5
          left-5
          gap-1
          flex
          items-center
        `}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Home
      </Link>
      <h1 className="text-3xl font-bold mb-8">
        N5 Kanji Quiz
      </h1>

      {/* Question number, level name, time */}
      <div 
        className="
          flex 
          items-center my-2
        "
      >
        <div className="flex-1 flex flex-col justify-center items-start gap-1 text-white">
          <p>
            Question <span className="font-bold">{questionNo}</span> of {questionLength}
          </p>
          <p className={`
              border
              border-gray-300
              bg-gray-400/10
                
              text-[10px]
              py-px
              px-3
              rounded-sm
            `}
          >
            MNN Chapter 1
          </p>
        </div>
        <div>
          <p 
            className="
              text-2xl
              text-white
            ">
            {String(countdown.minutes).padStart(2, '0')}:
            {String(countdown.seconds).padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* {popupTimesUp()} */}
      <PopupTimesUp 
        {...popupScore} 
        player={userScore}
        playerSetter={setUserScore}
        playerLeaderboard={scoreLeaderboard}
        levelResetter={ResetLevel}  
      />

      {/* Countdown before start */}
      <CountdowntoStart isStart={countdownStatus} setter={setCountdownStatus} />

      <div className="flex flex-1 flex-col items-center gap-3 md:gap-6">

        {/* Kanji Container */}
        <div
          className="
            relative
            flex
            flex-1
            p-5
            border
            rounded-sm
            overflow-hidden
            border-gray-500
            w-full
            h-full
          "  
        >
        {
          question && isKanji(question.correct) &&
          <div
            className={`
              w-full
              flex
              flex-col
            `}
          >
            {/* Score and others */}
            <div
              className="
                flex
                justify-between
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-0
                  flex-1
                  text-2xl
                "
              >
                <p className="text-xs">
                  CORRECT
                </p>
                <p>{userScore.correct}</p>
              </div>

                            <div
                className="
                  flex
                  flex-col
                  gap-0
                  flex-1
                  text-2xl
                "
              >
                <p className="text-xs">
                  INCORRECT
                </p>
                <p>{userScore.incorrect}</p>
              </div>

              {/* Score */}
              <div
                className="
                  flex
                  flex-col
                  gap-0
                  flex-1
                  text-2xl
                "
              >
                <p className="text-xs">
                  SCORE
                </p>
                <p>{userScore.score}</p>
              </div>
            </div>

            {/* Questioned Kanji */}
            <div
              className="
                relative
                flex
                flex-1
                items-center
                justify-center
              "
            >
              <p 
              className="
                text-6xl
                w-full
                relative
                text-white
              ">
                {question.correct.kanji}
                {
                  (wrongIndicator || showAnswer) &&
                    <div className="absolute -bottom-20 w-full">
                      <div className="right-0 grid grid-cols-2 px-3 text-base mb-5 text-white">
                        {/* <div className="flex items-center justify-center">  
                          {wrongIndicator && question.correct.romaji}
                        </div> */}
                        <div className="flex items-center justify-center">
                          {wrongIndicator && question.correct.kana}
                        </div>
                        <div className="flex items-center justify-center">
                          {question.correct.indonesian ?? question.correct.meaning}
                        </div>
                      </div>
                    </div>
                }
              </p>

              
              {/* Explanation */}
              <div
                className={`
                  absolute
                  bottom-0
                  w-full
                  flex
                  flex-1
                  transition-all
                  ${wrongIndicator || showAnswer ? 'visible' : 'invisible animate-sink-disappear'}
                `}
              >
                {
                  wrongIndicator && chosenWrongAnswer.kanji &&
                    <div
                      className={`
                        flex
                        w-full
                        justify-between
                        items-center
                        gap-3
                        border
                        rounded-md
                        border-red-500
                        text-xs
                        text-left
                        p-3
                        transition-all
                        ${wrongIndicator ? 'visible animate-rise' : 'invisible'}
                      `}
                    >
                      <div className="flex-1">
                        <p>{chosenWrongAnswer.kanji?.kana}</p>
                        <p>{chosenWrongAnswer.kanji?.indonesian}</p>
                      </div>
                      <p className="text-xl text-gray-300">{chosenWrongAnswer.kanji?.kanji}</p>
                    </div>
                }
              </div>
            </div>


          </div>
        }

        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full max-w-3xl">
          {question && question.answers.map((answer, index) => (
            <button
              key={isKanji(answer) ? answer.kanji : answer.romaji}
              ref={answerReferences[index]}
              onClick={() => handleTypeAnswer(answer as Kanji, answerReferences[index].current)}
              className={`
                ${wrongIndicator && "text-black"}
                ${wrongIndicator && isAnswerCorrect(answer.romaji) ? "border-green-400! bg-green-400/5!"  : ( !wrongIndicator ? "border-gray-600  text-white" : "") }
                ${(chosenWrongAnswer.target == answerReferences[index].current && wrongIndicator) ? "border-red-400! bg-red-400/5! animate-wiggle-wrong" : (wrongIndicator && !isAnswerCorrect(answer.romaji) && "opacity-30!")}
                border
                rounded
                py-3
                px-2
                md:p-4
                text-white
                text-md
                md:text-lg
                ${(!wrongIndicator && countRunning) && 'hover:-translate-y-1 hover:bg-gray-200/5 hover:border-white'}
                disabled:cursor-default
                cursor-pointer
                text-center
                transition-all
                duration-300
                relative
                ${isBouncing && isAnswerCorrect(answer.romaji) ? 'animate-bounce-right' : ''}
              `}
              disabled={wrongIndicator || !countRunning}
            >
              
                {/* ${isBouncing && isAnswerCorrect(answer.romaji) ? 'animate-bounce-right' : ''}
                ${isWiggle && chosenWrongAnswer.target == answerReferences[index].current ? 'animate-wiggle-wrong' : ''} */}
              {answer.kana}
              {/* {
                wrongIndicator && isKanji(answer) && !exerciseMode && 
                  <div className="absolute right-3 top-[50%] translate-y-[-50%] text-sm text-right">
                    <p className="">{answer.kanji}</p>
                    <p className="">{answer.meaning}</p>
                  </div>
              } */}
              
            </button>
          ))}
        </div>
        
            {/* Footer */}
            <div
              className={`
                  w-full flex relative justify-between
              `}
            >
              <button
                key="skip"
                onClick={ 
                  !hasStarted 
                    // ? (countdownStatus >= CountdowntoStartIndicator.finished ? beginCountdown() : beginStartCountdown()) 
                    ? beginStartCountdown 
                    : wrongIndicator ? continueAfterWrong : wrongAnswer}
                className={`
                  w-40
                  border
                  rounded
                  p-2
                  text-sm
                  text-gray-400
                  border-gray-600
                  ${!wrongIndicator 
                    ? 'hover:bg-gray-100 hover:text-black' 
                    : 'bg-yellow-400/5 border-yellow-400! font-semibold text-white'}
                  disabled:bg-gray-300
                  disabled:text-black
                  text-center
                  transition

                `}
                // disabled={wrongIndicator}
              >
                { 
                  !hasStarted ? "Start" :
                  isLevelFinished ? 'Replay' : 
                  wrongIndicator ? 'Continue' : 'Skip'}
              </button>

              
              <button 
                className="items-center justify-center"
                onClick={() => setShowAnswer(!showAnswer)}  
                disabled={wrongIndicator}
              >
                {
                  showAnswer 
                    ? (
                      <Hidden size="30px" color="#ffffff" />
                    ) : (
                      <Reveal size="30px" color="#ffffff" />
                    )
                }
              </button>
            </div>
      </div>

      <PopUpResult />
    </div>
  );
}