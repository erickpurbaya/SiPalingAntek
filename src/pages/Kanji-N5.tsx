import { motion } from "motion/react";
import { PopUpResult, storageNames } from "../utilities/general";
import { Hidden, Reveal } from "../utilities/icons";
// import { BackdropBlur } from "../utilities/components";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Kanji, n5Kanji, type HardKanji } from "../syllabary-kanji";
import { generateQuestion, AnswerSound, isKanji } from "../utilities/quiz";
import { KotobeLevelTheme } from "../syllabary/kanji-n5";
import "../style.css";

export default function KanjiQuizN5({ library = n5Kanji }) {
  const [libraryDatabase, setLibraryDatabase] = useState<Kanji[]>(library); // To be searched on
  const [requestedKana, setRequestedKana] = useState<string[]>(libraryDatabase.map(item => item.kanji));  
  // const [requestedKana, setRequestedKana] = useState<Kanji[]>(libraryDatabase);  

  const timerTotalSeconds = 600;
  const bouncingTime = 500;
  // const [timerCount, setTimerCount] = useState({
  //   minutes: Math.max(0, Math.floor(timerTotalSeconds / 60)),
  //   seconds: timerTotalSeconds % 60
  // })

  const storageName = storageNames;
  // const [storeKanjiLearn, setStorageKanjiLearn] = useState()
  localStorage.setItem(storageName['learn'], JSON.stringify(['thisKanji', 'thatKanji']));
    
  const playCorrect = useSound(AnswerSound.correct);
  const playCorrectStreak = useSound(AnswerSound.streak);
  const playWrong = useSound(AnswerSound.incorrect);

  const [showAnswer, setShowAnswer] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isWiggle, setIsWiggle] = useState(false);
  // const [backdropActive, setBackdropActive] = useState(true);

  const [levelSelect, setLevelSelect] = useState(0)
  const [levelTheme, setLevelTheme] = useState("")
  const [levelChange, setLevelChange] = useState(false)
  const [levelShow, setLevelShow] = useState(false);
  const levelList = [
    ...new Set(
      library
        .map(item => item.round)
        .filter((round): round is number => round !== undefined)
    )
  ].sort((a, b) => a - b);

  // const [typeAnswer, setTypeAnswer] = useState<string>("");
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [wrongIndicator, setWrongIndicator] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState(1);
  const [question, setQuestion] = useState(() =>
    getQuestion('initialization')
  );

  function getQuestion(from: string) {
    console.log(from);
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

  function beginCountdown() {
    // Prevent multiple intervals
    if (timerRef.current !== null) return;

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

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCountTimer(prev => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         handleTimeOut();
  //         return 0;
  //       }

  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  function handleTimeOut() {
    console.log("Time's up!");
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

  function nextQuestion(correct: boolean = true) {
    if (correct) {
      setQuestionNo(prev => prev + 1); // Trigger useEffect
      setCorrectStreak(prev => prev + 1)
    }
    setQuestion(getQuestion('next question'));
    setWrongIndicator(false);
  }

  function isAnswerCorrect(selected: string){
    return selected === question.correct.romaji;
  }

  function handleTypeAnswer(selected: string) {
    if (selected === question.correct.romaji) {
      // Record if showAnswer was initially clicked by user.
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
    setRequestedKana(library.map(prev => prev.kanji))
  }

  function buttonChangeLevel(level: number){
    const kanjis = library.filter(item => item.round == level);
    setLevelSelect(level)
    setLevelShow(false)
    setLevelTheme(
        KotobeLevelTheme.find(item => item.level === level)?.theme ?? ""
    );
    if (kanjis.length > 0) {
      // setRequestedKana(kanjis);
      renewKanjiList(kanjis)
      setLevelChange(true);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!countRunning) return
      e.preventDefault();

      if (e.key === "Tab") {
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
        if (index == 4) {
          wrongAnswer()
          return
        }
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
      setQuestion(getQuestion('useEffect level'))
      setLevelChange(false)
    } else {
      nextQuestion()
    }
  }, [levelChange, requestedKana])

  useEffect(() => {
    beginCountdown() // Immediately start timer
  }, [])

  return (
    <div className="flex flex-col h-full min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        N5 Kanji Quiz
      </h1>

      <div className="flex gap-3">
        {/* <button 
          onClick={stopTimer}
          className="hover:bg-red-300 w-fit min-w-30 hover:font-bold cursor-pointer text-black rounded-xl px-4 py-2 bg-yellow-600 duration-500 transition-colors">
            Stop Timer
        </button> */}
        {/* <button 
          onClick={resumeTimer}
          className="hover:bg-red-300 w-fit min-w-30 hover:font-bold cursor-pointer text-black rounded-xl px-4 py-2 bg-yellow-600 duration-500 transition-colors">
            Resume Timer
        </button> */}
      </div>

      <div className="flex flex-col items-center gap-6">
        <div>
          <p>
            {String(countdown.minutes).padStart(2, '0')}:
            {String(countdown.seconds).padStart(2, '0')}
          </p>
          <button 
            onClick={!triggerTimer ? beginCountdown : pauseCountdown}
            className="px-3 py-2 bg-slate-700 text-white font-bold rounded-sm hover:cursor-pointer">
              {!triggerTimer ? 'Start Timer' : 'Resume Timer'}
            </button>
        </div>
        <p>Question {questionNo}</p>
        <div className="gap-3 relative flex min-w-80 justify-between">
          {/* <input 
            onChange={(e) => setLevelSelect(Number(e.target.value))}
            onFocus={() => setLevelChanging(true)}
            onBlur={() => setLevelChanging(false)}
            disabled={wrongIndicator}
            type="number" className="bg-white text-black p-3" placeholder="Level 1-18"   
          />   */}          
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
                className={`
                  ${isBouncing &&'animate-bounce-right'}
                  text-7xl px-3 py-12 w-80 relative duration-300 transition-all text-black rounded shadow ${wrongIndicator ? 'bg-red-300' : 'bg-green-300 scale-110'}`}>
                {question.correct.kanji}
                {
                  (wrongIndicator || showAnswer) &&
                    <div className="absolute bottom-2 left-0 right-0 grid grid-cols-3 px-3 text-sm">
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
        
        {/* I want to detect enter, if  */}
        {/* <div>
          <input 
            ref={mainInput}
            type="text" 
            value={typeAnswer}
            disabled={wrongIndicator}
            onChange={(e) => handleTypeAnswer(e.target.value)} 
            className={`border-3 shadow-2xl/50 duration-200 transition-all ${wrongIndicator ? 'border-red-700 cursor-not-allowed bg-gray-100' : '' } bg-white rounded-lg p-3 text-black text-2xl text-center`} 
          />
        </div> */}

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
                p-4
                text-black
                text-lg
                hover:bg-gray-200
                hover:text-black
                ${(!wrongIndicator && countRunning) && 'hover:scale-103'}
                disabled:cursor-not-allowed
                cursor-pointer
                text-left
                transition-all
                duration-200
                relative
                ${isBouncing && isAnswerCorrect(answer.romaji) ? 'animate-bounce-right' : ''}
                ${isWiggle && !isAnswerCorrect(answer.romaji) ? 'animate-wiggle-wrong' : ''}
              `}
              disabled={wrongIndicator || !countRunning}
            >
              {index + 1}. {answer.kana} 
              {/* + {answer.romaji == question.correct.romaji ? 'Benar' : 'Salah'} */}
              {
                wrongIndicator && isKanji(answer) &&
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
                p-4
                text-xl
                ${!wrongIndicator ? 'hover:bg-gray-100 hover:text-black' : 'hover:scale-103 cursor-pointer'}
                disabled:bg-gray-300
                disabled:text-black
                text-left
                transition
              `}
              disabled={!countRunning}
            >
              { wrongIndicator ? 'TAB. CONTINUE' : 'TAB. SKIP'}
            </button>
        </div>
      </div>
      
      {/* {
        wrongIndicator &&
          <div className="flex justify-center w-full relative my-3">
            <button
              key='continue'
              onClick={continueAfterWrong}
              className="
                w-fit
                border
                rounded
                p-4
                text-xl
                hover:bg-gray-100
                hover:text-black
                transition
              "
            >
              Tab to Continue
            </button>
          </div>
      } */}

      <div className="flex-1 flex items-end justify-center">
        <Link to='/' className="bg-red-900 text-white font-bold rounded-sm px-5 py-2 my-4">Back to Hom</Link>
      </div>

      <PopUpResult />
    </div>
  );
}