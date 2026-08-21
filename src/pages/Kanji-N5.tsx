import { motion } from "motion/react";
import { supabase } from "../supabaseClient";
import { PopUpResult, storageNames, type Leaderboard, SortLeaderboard, CountUp, PopupTimesUp } from "../utilities/general";
import { Hidden, Reveal } from "../utilities/icons";
// import { BackdropBlur } from "../utilities/components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Kanji, n5Kanji, type HardKanji } from "../syllabary-kanji";
import { generateQuestion, AnswerSound, isKanji, score } from "../utilities/quiz";
import { KotobeLevelTheme } from "../syllabary/kanji-n5";
import "../style.css";

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

  const timerTotalSeconds = 600;
  const storageName = storageNames;
  const bouncingTime = 400;
  localStorage.setItem(storageName['learn'], JSON.stringify(['thisKanji', 'thatKanji']));
    
  const playCorrect = useSound(AnswerSound.correct);
  const playCorrectStreak = useSound(AnswerSound.streak);
  const playWrong = useSound(AnswerSound.incorrect);

  const [showAnswer, setShowAnswer] = useState(false); // Manually show the meaning of a kanji on the bottom right
  const [isBouncing, setIsBouncing] = useState(false); // Trigger bouncing effect when correct
  const [isWiggle, setIsWiggle] = useState(false); // Trigger wiggle effect when wrong
  const [scoreLeaderboard, setScoreLeaderboard] = useState<Leaderboard[]>([]);

  // Scoring
  const [popupScore, setPopupScore] = useState({ open: false, title: 'Default' })
  const [userScore, setUserScore] = useState({name: '', score: 0}) // User score by answering correctly
  const [initTimeScore, setInitTimeScore] = useState<number>(0) // Initial time before an answer for scoring purpose
  
  const [isTimesUp, setTimesUp] = useState(false) // Indicate time is up
  const [isLevelFinished, setIsLevelFinished] = useState(false) // Indicate if the user has finished answering a level
  const exerciseMode = isExercise; // Auto skip a review session after an incorrect answer

  const [levelSelect, setLevelSelect] = useState(0) // Level number
  const [levelTheme, setLevelTheme] = useState("") // Level name
  const [levelChange, setLevelChange] = useState(false) // Trigger level changing effects (Reset kanji list etc.)
  const [levelShow, setLevelShow] = useState(false); // Trigger to show dropdown of available levels
  const levelList = [
    ...new Set(
      library
        .map(item => item.round)
        .filter((round): round is number => round !== undefined)
    )
  ].sort((a, b) => a - b);

  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [wrongIndicator, setWrongIndicator] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState(1);
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
    setUserScore({ score: 0, name: ''})
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

  function beginCountdown() {
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
  }

  function isAnswerCorrect(selected: string){
    return selected === question.correct.romaji;
  }

  function handleTypeAnswer(selected: string) {
    if (selected === question.correct.romaji) {
      // Record if showAnswer was initially clicked by user.
      setUserScore((prev) => ({ ...prev, score: prev.score + calculatePoints(initTimeScore)})); // Calculate score
      const demandedShown = showAnswer
      if (!demandedShown) {
        setShowAnswer(true)
      }
      setIsBouncing(true)
      setTimeout(() => {
        setIsBouncing(false)
        if (!demandedShown) { 
          setShowAnswer(false)
        }
        // setRequestedKana(
        //   (requestedKana as Kanji[]).filter(
        //     ({ kanji }) => kanji !== (question.correct as Kanji).kanji
        //   )
        // );
        setRequestedKana(requestedKana.filter(item => item !== (question.correct as Kanji).kanji));
      }, bouncingTime)
      
      // nextQuestion(); Generated at useEffect
      if (correctStreak >= 10) {
        playCorrectStreak()
      } else {
        playCorrect()
      }
      
      return;
    } else {
      wrongAnswer()
    }
  }

  function wrongAnswer(){
    setIsWiggle(true)
    setTimeout(() => {
      setIsWiggle(false)

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
    setWrongIndicator(false)
  }

  function renewKanjiList(kanjis: Kanji[]){
    setLibraryDatabase(kanjis)
    setRequestedKana(kanjis.map(prev => prev.kanji))
  }

  function buttonChangeLevel(level: number){
    const kanjis = library.filter(item => item.round == level);
    setLevelSelect(level)
    setLevelShow(false)
    beginCountdown()
    setLevelTheme(
        KotobeLevelTheme.find(item => item.level === level)?.theme ?? ""
    );
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
        isLevelFinished
      })
      if (!countRunning || isTimesUp || isLevelFinished) return
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
        handleTypeAnswer(question.answers[index].romaji);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [wrongIndicator, question]);

  
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
    console.log('From ', !countRunning, ' to ', countRunning);
  }, [countRunning])

  useEffect(() => {
    const loadLeaderboard = async () => {
      const leaderboard = await getLeaderboard();
      setScoreLeaderboard(SortLeaderboard(leaderboard));
    };

    loadLeaderboard();
    beginCountdown();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        N5 Kanji Quiz
      </h1>
      {/* {popupTimesUp()} */}
      <PopupTimesUp 
        {...popupScore} 
        player={userScore}
        playerSetter={setUserScore}
        playerLeaderboard={scoreLeaderboard}
        levelResetter={ResetLevel}  
      />

      <div className="flex flex-col items-center gap-3 md:gap-6">
        <div>
          <p>
            {String(countdown.minutes).padStart(2, '0')}:
            {String(countdown.seconds).padStart(2, '0')}
          </p>
          <button 
            onClick={() => !triggerTimer ? beginCountdown() : pauseCountdown()}
            className="px-3 py-2 bg-slate-700 text-white font-bold rounded-sm hover:cursor-pointer">
              {!triggerTimer ? 'Start Timer' : 'Resume Timer'}
          </button>
        </div>
        <div className="flex w-80 justify-between">
          <p>Question {questionNo}</p>
          <p>{userScore.score}</p>
        </div>
        <div className="gap-3 relative flex min-w-80 justify-between"> 
          <button
            onClick={() => buttonChangeLevel(levelSelect)}
            className="bg-slate-600 text-white rounded-lg p-3 cursor-pointer "
          >Replay</button>

          <div className="w-full flex-1 relative">
            <button
              onClick={() => setLevelShow(!levelShow)}
              className="bg-slate-600 w-full text-white rounded-lg p-3 cursor-pointer "
            >Level {levelSelect ? levelSelect : 'All'} - {levelTheme}</button>

            {
              levelShow &&
                <div className="absolute z-15 min-w-35 w-full -bottom-3 translate-y-[100%] bg-white rounded-md text-black h-40 overflow-auto flex flex-col">
                  {levelList.map(item => (
                    <button key={item} className="text-left hover:bg-gray-800 hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-black cursor-pointer py-2 px-4"
                      disabled={item == levelSelect}
                      onClick={() => buttonChangeLevel(item)}
                    >
                      Level {item}
                    </button>
                  ))}
                </div>
            }
          </div>
        </div>

        {
          question && isKanji(question.correct) &&
            <motion.div 
              animate={correctStreak >= 1 ? { y: [0, -10, 0]} : {}}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  if (isLevelFinished) {
                    buttonChangeLevel(levelSelect)
                  }
                }}
                className={`
                  ${isBouncing &&'animate-bounce-right'}
                  text-6xl md:text-7xl px-3 py-12 w-70 my-3 md:my-0 md:w-80 scale-105 md:scale-110 relative duration-300 transition-all text-black rounded shadow ${wrongIndicator ? 'bg-red-300' : 'bg-green-300'}`}>
                {isLevelFinished ? 'Replay?' : question.correct.kanji}
                {
                  (wrongIndicator || showAnswer) &&
                    <div className="absolute bottom-2 left-0 right-0 grid grid-cols-3 px-3 text-xs md:text-sm">
                      <div className="flex items-center justify-center">  
                        {wrongIndicator && question.correct.romaji}
                      </div>
                      <div className="flex items-center justify-center">
                        {wrongIndicator && question.correct.kana}
                      </div>
                      <div className="flex items-center justify-center">
                        {question.correct.indonesian ?? question.correct.meaning}
                      </div>
                    </div>
                }
                <button 
                  className="absolute top-4 right-4 flex items-center justify-center"
                  onClick={() => setShowAnswer(!showAnswer)}  
                  // onClick={() => setBackdropActive(!backdropActive)}
                  disabled={wrongIndicator}
                >
                  {
                    showAnswer 
                      ? (
                        <Hidden size="30px" />
                      ) : (
                        <Reveal size="30px" />
                      )
                  }
                </button>
            </motion.div>
        }

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl px-10">
          {question && question.answers.map((answer, index) => (
            <button
              key={isKanji(answer) ? answer.kanji : answer.romaji}
              onClick={() => handleTypeAnswer(answer.romaji)}
              className={`
                ${wrongIndicator && "text-black"}
                ${wrongIndicator && isAnswerCorrect(answer.romaji) ? "border-green-400! bg-green-300! font-semibold!" : ( !wrongIndicator ? "bg-white" : "border-red-400! bg-red-200!") }
                border
                rounded
                py-2
                px-4
                md:p-4
                text-black
                text-md
                md:text-lg
                hover:bg-gray-200
                hover:text-black
                ${(!wrongIndicator && countRunning) && 'hover:-translate-y-1'}
                disabled:cursor-default
                cursor-pointer
                text-left
                transition-all
                duration-300
                relative
                ${isBouncing && isAnswerCorrect(answer.romaji) ? 'animate-bounce-right' : ''}
                ${isWiggle && !isAnswerCorrect(answer.romaji) ? 'animate-wiggle-wrong' : ''}
              `}
              disabled={wrongIndicator || !countRunning}
            >
              {index + 1}. {answer.kana} 
              {/* + {answer.romaji == question.correct.romaji ? 'Benar' : 'Salah'} */}
              {
                wrongIndicator && isKanji(answer) && !exerciseMode &&
                  <div className="absolute right-3 top-[50%] translate-y-[-50%] text-sm text-right">
                    <p className="">{answer.kanji}</p>
                    <p className="">{answer.meaning}</p>
                  </div>
              }
              
            </button>
          ))}
          <button
              key="skip"
              onClick={ wrongIndicator ? continueAfterWrong : wrongAnswer}
              className={`
                
                border
                rounded
                px-4
                py-2
                text-xl
                ${!wrongIndicator ? 'hover:bg-gray-100 hover:text-black' : 'hover:scale-103 cursor-pointer'}
                disabled:bg-gray-300
                disabled:text-black
                text-left
                transition
              `}
              disabled={!countRunning}
            >
              Tab. { isLevelFinished ? 'Replay' : (wrongIndicator ? 'Continue' : 'Skip')}
            </button>
        </div>
      </div>

      <div className="flex-1 flex items-end justify-center">
        <Link to='/' className="bg-red-900 text-white font-bold rounded-sm px-5 py-2 my-4">Back to Hom</Link>
      </div>

      <PopUpResult />
    </div>
  );
}