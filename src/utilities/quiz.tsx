// import { filter } from "motion/react-client";
import { kanaList, type Kana } from "../syllabary";
import { type Kanji } from "../syllabary-kanji";
import { useEffect, useRef, useState } from "react";
import { zIndexes } from "./general"; 

export const AnswerSound = {
    correct: '/sounds/benar.mp3',
    streak: '/sounds/benar-streak.mp3',
    incorrect: '/sounds/salah.mp3'
}

export const score = {
  correct: 1,
  multiplier: 3, // Kinder towards longer completion time
  minTime: 0.3,
  maxTime: 10
}

export function isKanji(item: Kana | Kanji | undefined): item is Kanji {
  return item !== undefined && "kanji" in item;
}

export function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export const getKanaList = (type: string, variation: string[] = ['basic']): Kana[] => {
    return kanaList.filter(
        kana => kana.type === type &&  variation.includes(kana.category)
    )
}

export function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateQuestion<T extends Kana | Kanji>(collection: T[], type: "kana" | "kanji" = "kana", requestedKanji: string[] = []) {
  const filteredCollection = requestedKanji.length == 0 ? collection
    : collection.filter(item => requestedKanji.includes((item as Kanji).kanji) ) 

  const correct: Kana | Kanji = 
    // filteredCollection[0]
    getRandomItem(filteredCollection);

  const wrongAnswers = shuffle(
    collection.filter(item => {
      if (type === "kana") {
        return item.kana !== correct.kana;
      }

      return isKanji(item) &&
             isKanji(correct) &&
             item.kanji !== correct.kanji;
    })
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

export const CountdowntoStartIndicator = {
  idling: 1,
  counting: 2,
  finished: 3,
  hasStarted: 4
}

export const CountdowntoStart = ({
  isStart,
  time = 3,
  setter
}: {
  isStart: number;
  time?: number;
  setter: Function
}) => {
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [countdown, setCountdown] = useState(time);
  const [isCounting, setIsCounting] = useState(false);

  // Start countdown
  function beginCountdown() {
    if (countdownRef.current !== null) return;

    setCountdown(time);
    setIsCounting(true);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          if (countdownRef.current !== null) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }

          setCountdown(time)
          setIsCounting(false);
          setter(CountdowntoStartIndicator.finished)
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  useEffect(() => {
    if (isStart === CountdowntoStartIndicator.counting) {
      beginCountdown();
    }
  }, [isStart]);

  useEffect(() => {
    return () => {
      if (countdownRef.current !== null) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{ zIndex: zIndexes.popup }}
    >
      <div
        className={`
          ${isCounting ? "visible" : "invisible"}
          absolute top-0 left-0
          w-screen h-screen
          flex items-center justify-center
          backdrop-blur-xs
        `}
      >
      </div>

      <div className={`flex h-screen w-screen justify-center items-center absolute top-0 left-0
          ${isCounting ? "visible" : "invisible"}
        `}>    
        <p
          key={countdown}
          className={`
            text-9xl
            font-bold
            text-white
            [text-stroke:1px_black]
            [-webkit-text-stroke:1px_black]
            ${isCounting && 'animate-big-to-disappear'}
          `}
        >
          {countdown == 0 ? 'START' : countdown}
        </p>
      </div>
    </div>
  );
};

// export function generateQuestion(kanaList: Kana[]) {
//   const correct = getRandomItem(kanaList);

//   const wrongAnswers = shuffle(
//     kanaList.filter(
//       kana => kana.kana !== correct.kana
//     )
//   ).slice(0, 3);

//   const answers = shuffle([
//     correct,
//     ...wrongAnswers,
//   ]);

//   return {
//     correct,
//     answers,
//   };
// }