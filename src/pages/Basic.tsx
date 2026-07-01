import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { type Kana } from "../syllabary";
import { generateQuestion, getKanaList } from "../utilities/quiz";
import { AnswerSound } from "../utilities/quiz";
import { CapitalizeFirstWord } from "../utilities/general";
import "../style.css";

const variationChoice = ['handakuten', 'dakuten', 'youon'];

export default function BasicKana({ 
    type = 'hiragana',
    variation = ['basic'] 
  } : { 
    type?: string,
    variation?: string[] }
  ) {

  const mainInput = useRef<HTMLInputElement>(null);
  
  const [kanaVariations, setKanaVariations] = useState<string[]>(variation) // Checkboxes for kana variations
  const [previousVariations, setPreviousVariation] = useState<string[]>(variation) // Check if the requested variations the same as before

  const [requestedKana, setRequestedKana] = useState<Kana[]>(getKanaList(type, kanaVariations));
  
  
  const playCorrect = useSound(AnswerSound.correct);
  const playCorrectStreak = useSound(AnswerSound.streak);
  const playWrong = useSound(AnswerSound.incorrect);

  const [typeAnswer, setTypeAnswer] = useState<string>("");
  const [correctStreak, setCcorrectStreaj] = useState<number>(0);
  const [wrongIndicator, setWrongIndicator] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState(1);
  const [question, setQuestion] = useState(
    getQuestion()
  );
 
  function getQuestion() {
    return generateQuestion(requestedKana);
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

  function nextQuestion() {
    setCcorrectStreaj(prev => prev + 1)
    setQuestionNo(prev => prev + 1);
    setQuestion(getQuestion());
    setTypeAnswer("");
    setWrongIndicator(false);
  }

  function handleAnswer(selected: Kana) {
    if (selected.kana === question.correct.kana) {
      setQuestionNo(prev => prev + 1);
      setQuestion(getQuestion());
    } else {
      alert("Wrong!");
    }
  }

  function handleTypeAnswer(selected: string) {
    if (selected === question.correct.romaji) {
      nextQuestion();
      if (correctStreak >= 10) {
        playCorrectStreak()
      } else {
        playCorrect()
      }
      return;
    } 
    setTypeAnswer(selected);

    if (selected.length >= question.correct.romaji.length) {
      wrongAnswer()
    }
  }

  function wrongAnswer(){
    setCcorrectStreaj(0);
    playWrong()
    setWrongIndicator(true)
  }

  function continueAfterWrong() {
    nextQuestion()
    setWrongIndicator(false)
  }

  function renewList() {
    const newKanaList = getKanaList(type, kanaVariations);
    
    // Renew kana list
    setRequestedKana(newKanaList);
    setQuestion(getQuestion())

    // Remember previously requested variations, to diable request button.
    setPreviousVariation(kanaVariations); 
  }

  useEffect(() => {
    if (!wrongIndicator) {
      mainInput.current?.focus();
    }
  }, [wrongIndicator]);

  return (
    <div className="flex flex-col h-full min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        {CapitalizeFirstWord(type)} Quiz
        <div className="text-lg text-slate-600 flex gap-3 justify-center">
          {/* {CapitalizeFirstWord(variation)} */}
          {variationChoice.map((choice) => (
            <label key={choice}>
              <input
                type='checkbox'
                disabled={wrongIndicator}
                checked={kanaVariations.includes(choice)}
                onClick={() => 
                  setKanaVariations(prev =>
                    prev.includes(choice)
                      ? prev.filter(item => item !== choice)
                      : [...prev, choice]
                  ) 
                }
              /> 
              {CapitalizeFirstWord(choice)} 
            </label>
          ))}
        </div>
      </h1>
      
      <button 
        onClick={renewList}
        disabled={wrongIndicator} 
        className="text-white font-bold rounded-lg px-5 py-2 w-fit text-center">
          Change
      </button>

      <div className="flex flex-col items-center gap-6">
        <p>Question {questionNo}</p>

        <div className={`text-7xl p-10 w-75 relative duration-300 transition-all  text-black rounded shadow ${wrongIndicator ? 'bg-red-300' : 'bg-green-300 scale-110'}`}>
          {question.correct.kana}
          {
            wrongIndicator &&
              <div className="absolute bottom-2 left-[50%] -translate-x-[50%] text-xl">
                {question.correct.romaji}
              </div>
          }
        </div>
        
        <div>
          {/* I want to detect enter, if  */}
          <input 
            ref={mainInput}
            type="text" 
            value={typeAnswer}
            disabled={wrongIndicator}
            onChange={(e) => handleTypeAnswer(e.target.value)} 
            className={`border-3 shadow-2xl/50 duration-200 transition-all ${wrongIndicator ? 'border-red-700 cursor-not-allowed bg-gray-100' : '' } bg-white rounded-lg p-3 text-black text-2xl text-center`} 
          />
        </div>

        {
          wrongIndicator &&
            <button
              key='continue'
              onClick={continueAfterWrong}
              className="
                border
                rounded
                p-4
                text-2xl
                hover:bg-gray-100
                hover:text-black
                transition
              "
            >
              Continue
          </button>
        }

        {/* <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {question.answers.map(answer => (
            <button
              key={answer.kana}
              onClick={() => handleAnswer(answer)}
              className="
                border
                rounded
                p-4
                text-2xl
                hover:bg-gray-100
                hover:text-black
                transition
              "
            >
              {answer.romaji}
            </button>
          ))}
        </div> */}
      </div>

      <div className="flex-1 flex items-end justify-center">
        <Link to='/' className="bg-red-900 text-white font-bold rounded-sm px-5 py-2 my-4">Back to Hom</Link>
      </div>
    </div>
  );
}

// export function Result(
  
// )