import { kanaList, type Kana } from "../syllabary";

export const AnswerSound = {
    correct: '/sounds/benar.mp3',
    streak: '/sounds/benar-streak.mp3',
    incorrect: '/sounds/salah.mp3'
}

export function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export const getKanaList = (type: string, variation: string[] = ['basic']): Kana[] => {
    return kanaList.filter(
        kana => kana.type === type &&  variation.includes(kana.category)
    )
};

export function generateQuestion(kanaList: Kana[]) {
  const correct = getRandomItem(kanaList);

  const wrongAnswers = shuffle(
    kanaList.filter(
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