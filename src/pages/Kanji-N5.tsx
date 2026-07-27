import { motion } from "motion/react";
import { PopUpResult, storageNames } from "../utilities/general";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Kanji, n5Kanji, type HardKanji } from "../syllabary-kanji";
import { generateQuestion, AnswerSound, isKanji } from "../utilities/quiz";
import "../style.css";

export default function KanjiQuizN5({ library = n5Kanji }) {
  const [requestedKana, setRequestedKana] = useState<Kanji[]>(library);

  const storageName = storageNames;
  const [storeKanjiLearn, setStorageKanjiLearn] = useState()
  localStorage.setItem(storageName['learn'], JSON.stringify(['thisKanji', 'thatKanji']));
    
  const playCorrect = useSound(AnswerSound.correct);
  const playCorrectStreak = useSound(AnswerSound.streak);
  const playWrong = useSound(AnswerSound.incorrect);

  // const [typeAnswer, setTypeAnswer] = useState<string>("");
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [wrongIndicator, setWrongIndicator] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState(1);
  const [question, setQuestion] = useState(getQuestion());
 
  function getQuestion() {
    return generateQuestion(requestedKana, "kanji");
  }

  function remedyKanji(kanji: string) {
    const hardKanji: HardKanji[] = JSON.parse(
      localStorage.getItem("hard_kanji") ?? "[]"
    );

    console.log('List');
    console.log(hardKanji);

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
      setQuestionNo(prev => prev + 1);
    }
    setCorrectStreak(prev => prev + 1)
    setQuestion(getQuestion());
    setWrongIndicator(false);
  }

  function isAnswerCorrect(selected: string){
    return selected === question.correct.romaji;
  }

  function handleTypeAnswer(selected: string) {
    if (selected === question.correct.romaji) {
      setRequestedKana(
        (requestedKana as Kanji[]).filter(
          ({ kanji }) => kanji !== (question.correct as Kanji).kanji
        )
      );
      // nextQuestion(); Generated at useEffect
      if (correctStreak >= 10) {
        playCorrectStreak()
      } else {
        playCorrect()
      }
      
      console.log('Correct')
      return;
    } else {
      wrongAnswer()
      console.log('False')
    }
  }

  function wrongAnswer(){
    setCorrectStreak(0);
    remedyKanji((question.correct as Kanji).kanji)
    playWrong()
    setWrongIndicator(true)
  }

  function continueAfterWrong() {
    nextQuestion(false)
    setWrongIndicator(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (wrongIndicator) {
          continueAfterWrong();
        } else if (!wrongIndicator){
          wrongAnswer()
        }
        return;
      }

      const index = Number(e.key) - 1;
      console.log(index)
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
    nextQuestion()
  }, [requestedKana])


  return (
    <div className="flex flex-col h-full min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        N5 Kanji Quiz
      </h1>

      <div className="flex flex-col items-center gap-6">
        <p>Question {questionNo}</p>

        {
          isKanji(question.correct) &&
            <motion.div 
              animate={correctStreak >= 1 ? { y: [0, -10, 0]} : {}}
              transition={{ duration: 0.3 }}
              className={`text-7xl px-10 py-12 w-80 relative duration-300 transition-all text-black rounded shadow ${wrongIndicator ? 'bg-red-300' : 'bg-green-300 scale-110'}`}>
                {question.correct.kanji}
                {
                  wrongIndicator &&
                    <div className="absolute bottom-2 left-0 right-0 grid grid-cols-3 px-5 text-sm">
                      <div className="flex items-center justify-center">  
                        {question.correct.romaji}
                      </div>
                      <div className="flex items-center justify-center">
                        {question.correct.kana}
                      </div>
                      <div className="flex items-center justify-center">
                        {question.correct.meaning}
                      </div>
                    </div>
                }
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

        <div className="grid grid-cols-1 gap-4 w-full max-w-md px-10">
          {question.answers.map((answer, index) => (
            <button
              key={isKanji(answer) ? answer.kanji : answer.romaji}
              onClick={() => handleTypeAnswer(answer.romaji)}
              className={`
                ${wrongIndicator && "text-black"}
                ${wrongIndicator && isAnswerCorrect(answer.romaji) ? "border-green-400 bg-green-300" : ( !wrongIndicator ? "bg-white" : "border-red-400 bg-red-200") }
                border
                rounded
                p-4
                text-black
                text-lg
                hover:bg-gray-100
                hover:text-black
                text-left
                transition-all
                duration-300
                relative
              `}
              disabled={wrongIndicator}
            >
              {index + 1}. {answer.kana}
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
                hover:bg-gray-100
                hover:text-black
                text-left
                transition
              `}
              // disabled={wrongIndicator}
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