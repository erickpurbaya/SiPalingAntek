import { useState, useRef, useEffect } from "react";
import { kanaList, type Kana } from "../syllabary";
import "../style.css";

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

const hiraganaList = kanaList.filter(
  kana => kana.type === "hiragana"
);

function generateQuestion() {
  const correct = getRandomItem(hiraganaList);

  const wrongAnswers = shuffle(
    hiraganaList.filter(
      kana => kana.kana !== correct.kana
    )
  ).slice(0, 3);

  const answers = shuffle([
    correct,
    ...wrongAnswers,
  ]);

  return {
    correct,
    answers,
  };
}

export default function Hiragana() {
  const playCorrect = useSound('/sounds/benar.mp3');
  const playCorrectStreak = useSound('/sounds/benar-streak.mp3');
  const playWrong = useSound('/sounds/salah.mp3');

  const [typeAnswer, setTypeAnswer] = useState<string>();
  const [correctStreak, setCcorrectStreaj] = useState<number>(0);
  const [wrongIndicator, setWrongIndicator] = useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState(1);
  const [question, setQuestion] = useState(
    generateQuestion()
  );

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
    setQuestion(generateQuestion());
    setTypeAnswer("");
    setWrongIndicator(false);
  }

  function handleAnswer(selected: Kana) {
    if (selected.kana === question.correct.kana) {
      setQuestionNo(prev => prev + 1);
      setQuestion(generateQuestion());
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
      setCcorrectStreaj(0);
      playWrong()
      nextQuestion()
      setWrongIndicator(true)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Hiragana Quiz
      </h1>

      <div className="flex flex-col items-center gap-6">
        <p>Question {questionNo}</p>

        <div className={`text-7xl p-10  duration-300 transition-all  text-black rounded shadow ${wrongIndicator ? 'bg-red-300' : 'bg-green-300 scale-110'}`}>
          {question.correct.kana}
        </div>
        
        <div>
          {/* I want to detect enter, if  */}
          <input 
            type="text" 
            value={typeAnswer}
            onChange={(e) => handleTypeAnswer(e.target.value)} 
            className={`border-3 shadow-2xl/50 duration-200 transition-all ${wrongIndicator ? 'border-red-700' : '' } bg-white rounded-lg p-3 text-black text-2xl text-center`} 
          />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
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
        </div>
      </div>
    </div>
  );
}