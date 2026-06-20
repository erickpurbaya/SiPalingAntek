export type Kana = {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
  category:
    | "basic"
    | "dakuten"
    | "handakuten"
    | "combination";
};

export const kanaList: Kana[] = [
  // =====================
  // HIRAGANA - BASIC
  // =====================

  { kana: "あ", romaji: "a", type: "hiragana", category: "basic" },
  { kana: "い", romaji: "i", type: "hiragana", category: "basic" },
  { kana: "う", romaji: "u", type: "hiragana", category: "basic" },
  { kana: "え", romaji: "e", type: "hiragana", category: "basic" },
  { kana: "お", romaji: "o", type: "hiragana", category: "basic" },

  { kana: "か", romaji: "ka", type: "hiragana", category: "basic" },
  { kana: "き", romaji: "ki", type: "hiragana", category: "basic" },
  { kana: "く", romaji: "ku", type: "hiragana", category: "basic" },
  { kana: "け", romaji: "ke", type: "hiragana", category: "basic" },
  { kana: "こ", romaji: "ko", type: "hiragana", category: "basic" },

  { kana: "さ", romaji: "sa", type: "hiragana", category: "basic" },
  { kana: "し", romaji: "shi", type: "hiragana", category: "basic" },
  { kana: "す", romaji: "su", type: "hiragana", category: "basic" },
  { kana: "せ", romaji: "se", type: "hiragana", category: "basic" },
  { kana: "そ", romaji: "so", type: "hiragana", category: "basic" },

  { kana: "た", romaji: "ta", type: "hiragana", category: "basic" },
  { kana: "ち", romaji: "chi", type: "hiragana", category: "basic" },
  { kana: "つ", romaji: "tsu", type: "hiragana", category: "basic" },
  { kana: "て", romaji: "te", type: "hiragana", category: "basic" },
  { kana: "と", romaji: "to", type: "hiragana", category: "basic" },

  { kana: "な", romaji: "na", type: "hiragana", category: "basic" },
  { kana: "に", romaji: "ni", type: "hiragana", category: "basic" },
  { kana: "ぬ", romaji: "nu", type: "hiragana", category: "basic" },
  { kana: "ね", romaji: "ne", type: "hiragana", category: "basic" },
  { kana: "の", romaji: "no", type: "hiragana", category: "basic" },

  { kana: "は", romaji: "ha", type: "hiragana", category: "basic" },
  { kana: "ひ", romaji: "hi", type: "hiragana", category: "basic" },
  { kana: "ふ", romaji: "fu", type: "hiragana", category: "basic" },
  { kana: "へ", romaji: "he", type: "hiragana", category: "basic" },
  { kana: "ほ", romaji: "ho", type: "hiragana", category: "basic" },

  { kana: "ま", romaji: "ma", type: "hiragana", category: "basic" },
  { kana: "み", romaji: "mi", type: "hiragana", category: "basic" },
  { kana: "む", romaji: "mu", type: "hiragana", category: "basic" },
  { kana: "め", romaji: "me", type: "hiragana", category: "basic" },
  { kana: "も", romaji: "mo", type: "hiragana", category: "basic" },

  { kana: "や", romaji: "ya", type: "hiragana", category: "basic" },
  { kana: "ゆ", romaji: "yu", type: "hiragana", category: "basic" },
  { kana: "よ", romaji: "yo", type: "hiragana", category: "basic" },

  { kana: "ら", romaji: "ra", type: "hiragana", category: "basic" },
  { kana: "り", romaji: "ri", type: "hiragana", category: "basic" },
  { kana: "る", romaji: "ru", type: "hiragana", category: "basic" },
  { kana: "れ", romaji: "re", type: "hiragana", category: "basic" },
  { kana: "ろ", romaji: "ro", type: "hiragana", category: "basic" },

  { kana: "わ", romaji: "wa", type: "hiragana", category: "basic" },
  { kana: "を", romaji: "wo", type: "hiragana", category: "basic" },
  { kana: "ん", romaji: "n", type: "hiragana", category: "basic" },

  // =====================
  // HIRAGANA - DAKUTEN
  // =====================

  { kana: "が", romaji: "ga", type: "hiragana", category: "dakuten" },
  { kana: "ぎ", romaji: "gi", type: "hiragana", category: "dakuten" },
  { kana: "ぐ", romaji: "gu", type: "hiragana", category: "dakuten" },
  { kana: "げ", romaji: "ge", type: "hiragana", category: "dakuten" },
  { kana: "ご", romaji: "go", type: "hiragana", category: "dakuten" },

  { kana: "ざ", romaji: "za", type: "hiragana", category: "dakuten" },
  { kana: "じ", romaji: "ji", type: "hiragana", category: "dakuten" },
  { kana: "ず", romaji: "zu", type: "hiragana", category: "dakuten" },
  { kana: "ぜ", romaji: "ze", type: "hiragana", category: "dakuten" },
  { kana: "ぞ", romaji: "zo", type: "hiragana", category: "dakuten" },

  { kana: "だ", romaji: "da", type: "hiragana", category: "dakuten" },
  { kana: "ぢ", romaji: "ji", type: "hiragana", category: "dakuten" },
  { kana: "づ", romaji: "zu", type: "hiragana", category: "dakuten" },
  { kana: "で", romaji: "de", type: "hiragana", category: "dakuten" },
  { kana: "ど", romaji: "do", type: "hiragana", category: "dakuten" },

  { kana: "ば", romaji: "ba", type: "hiragana", category: "dakuten" },
  { kana: "び", romaji: "bi", type: "hiragana", category: "dakuten" },
  { kana: "ぶ", romaji: "bu", type: "hiragana", category: "dakuten" },
  { kana: "べ", romaji: "be", type: "hiragana", category: "dakuten" },
  { kana: "ぼ", romaji: "bo", type: "hiragana", category: "dakuten" },

  // =====================
  // HIRAGANA - HANDAKUTEN
  // =====================

  { kana: "ぱ", romaji: "pa", type: "hiragana", category: "handakuten" },
  { kana: "ぴ", romaji: "pi", type: "hiragana", category: "handakuten" },
  { kana: "ぷ", romaji: "pu", type: "hiragana", category: "handakuten" },
  { kana: "ぺ", romaji: "pe", type: "hiragana", category: "handakuten" },
  { kana: "ぽ", romaji: "po", type: "hiragana", category: "handakuten" },

  // =====================
  // KATAKANA - BASIC
  // =====================

  { kana: "ア", romaji: "a", type: "katakana", category: "basic" },
  { kana: "イ", romaji: "i", type: "katakana", category: "basic" },
  { kana: "ウ", romaji: "u", type: "katakana", category: "basic" },
  { kana: "エ", romaji: "e", type: "katakana", category: "basic" },
  { kana: "オ", romaji: "o", type: "katakana", category: "basic" },

  { kana: "カ", romaji: "ka", type: "katakana", category: "basic" },
  { kana: "キ", romaji: "ki", type: "katakana", category: "basic" },
  { kana: "ク", romaji: "ku", type: "katakana", category: "basic" },
  { kana: "ケ", romaji: "ke", type: "katakana", category: "basic" },
  { kana: "コ", romaji: "ko", type: "katakana", category: "basic" },

  // ... continue exactly like hiragana ...

  { kana: "ガ", romaji: "ga", type: "katakana", category: "dakuten" },
  { kana: "ギ", romaji: "gi", type: "katakana", category: "dakuten" },
  { kana: "グ", romaji: "gu", type: "katakana", category: "dakuten" },
  { kana: "ゲ", romaji: "ge", type: "katakana", category: "dakuten" },
  { kana: "ゴ", romaji: "go", type: "katakana", category: "dakuten" },

  { kana: "パ", romaji: "pa", type: "katakana", category: "handakuten" },
  { kana: "ピ", romaji: "pi", type: "katakana", category: "handakuten" },
  { kana: "プ", romaji: "pu", type: "katakana", category: "handakuten" },
  { kana: "ペ", romaji: "pe", type: "katakana", category: "handakuten" },
  { kana: "ポ", romaji: "po", type: "katakana", category: "handakuten" },
];