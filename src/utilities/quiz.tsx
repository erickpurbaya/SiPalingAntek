import { kanaList, type Kana } from "../syllabary";
import { type Kanji } from "../syllabary-kanji";

export const AnswerSound = {
    correct: '/sounds/benar.mp3',
    streak: '/sounds/benar-streak.mp3',
    incorrect: '/sounds/salah.mp3'
}

export const score = {
  correct: 1,
  multiplier: 5
}

export function isKanji(item: Kana | Kanji): item is Kanji {
  return "kanji" in item;
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

export function generateQuestion<T extends Kana | Kanji>(collection: T[], type: "kana" | "kanji" = "kana") {
  const correct: Kana | Kanji = getRandomItem(collection);

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