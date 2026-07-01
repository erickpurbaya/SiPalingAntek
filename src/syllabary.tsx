export type Kana = {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
  category:
    | "basic"
    | "dakuten"
    | "handakuten"
    | "combination"
    | "youon";
};

export type Kanji = {
  kana: string;
  romaji: string;
  type: "on" | "kun";
  meaning: string
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
  // HIRAGANA - YOUON
  // =====================

  { kana: "きゃ", romaji: "kya", type: "hiragana", category: "youon" },
  { kana: "きゅ", romaji: "kyu", type: "hiragana", category: "youon" },
  { kana: "きょ", romaji: "kyo", type: "hiragana", category: "youon" },

  { kana: "ぎゃ", romaji: "gya", type: "hiragana", category: "youon" },
  { kana: "ぎゅ", romaji: "gyu", type: "hiragana", category: "youon" },
  { kana: "ぎょ", romaji: "gyo", type: "hiragana", category: "youon" },

  { kana: "しゃ", romaji: "sha", type: "hiragana", category: "youon" },
  { kana: "しゅ", romaji: "shu", type: "hiragana", category: "youon" },
  { kana: "しょ", romaji: "sho", type: "hiragana", category: "youon" },

  { kana: "じゃ", romaji: "ja", type: "hiragana", category: "youon" },
  { kana: "じゅ", romaji: "ju", type: "hiragana", category: "youon" },
  { kana: "じょ", romaji: "jo", type: "hiragana", category: "youon" },

  { kana: "ちゃ", romaji: "cha", type: "hiragana", category: "youon" },
  { kana: "ちゅ", romaji: "chu", type: "hiragana", category: "youon" },
  { kana: "ちょ", romaji: "cho", type: "hiragana", category: "youon" },

  { kana: "にゃ", romaji: "nya", type: "hiragana", category: "youon" },
  { kana: "にゅ", romaji: "nyu", type: "hiragana", category: "youon" },
  { kana: "にょ", romaji: "nyo", type: "hiragana", category: "youon" },

  { kana: "ひゃ", romaji: "hya", type: "hiragana", category: "youon" },
  { kana: "ひゅ", romaji: "hyu", type: "hiragana", category: "youon" },
  { kana: "ひょ", romaji: "hyo", type: "hiragana", category: "youon" },

  { kana: "びゃ", romaji: "bya", type: "hiragana", category: "youon" },
  { kana: "びゅ", romaji: "byu", type: "hiragana", category: "youon" },
  { kana: "びょ", romaji: "byo", type: "hiragana", category: "youon" },

  { kana: "ぴゃ", romaji: "pya", type: "hiragana", category: "youon" },
  { kana: "ぴゅ", romaji: "pyu", type: "hiragana", category: "youon" },
  { kana: "ぴょ", romaji: "pyo", type: "hiragana", category: "youon" },

  { kana: "みゃ", romaji: "mya", type: "hiragana", category: "youon" },
  { kana: "みゅ", romaji: "myu", type: "hiragana", category: "youon" },
  { kana: "みょ", romaji: "myo", type: "hiragana", category: "youon" },

  { kana: "りゃ", romaji: "rya", type: "hiragana", category: "youon" },
  { kana: "りゅ", romaji: "ryu", type: "hiragana", category: "youon" },
  { kana: "りょ", romaji: "ryo", type: "hiragana", category: "youon" },

  { kana: "ぢゃ", romaji: "ja", type: "hiragana", category: "youon" },
  { kana: "ぢゅ", romaji: "ju", type: "hiragana", category: "youon" },
  { kana: "ぢょ", romaji: "jo", type: "hiragana", category: "youon" },

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

  { kana: "サ", romaji: "sa", type: "katakana", category: "basic" },
  { kana: "シ", romaji: "shi", type: "katakana", category: "basic" },
  { kana: "ス", romaji: "su", type: "katakana", category: "basic" },
  { kana: "セ", romaji: "se", type: "katakana", category: "basic" },
  { kana: "ソ", romaji: "so", type: "katakana", category: "basic" },

  { kana: "タ", romaji: "ta", type: "katakana", category: "basic" },
  { kana: "チ", romaji: "chi", type: "katakana", category: "basic" },
  { kana: "ツ", romaji: "tsu", type: "katakana", category: "basic" },
  { kana: "テ", romaji: "te", type: "katakana", category: "basic" },
  { kana: "ト", romaji: "to", type: "katakana", category: "basic" },

  { kana: "ナ", romaji: "na", type: "katakana", category: "basic" },
  { kana: "ニ", romaji: "ni", type: "katakana", category: "basic" },
  { kana: "ヌ", romaji: "nu", type: "katakana", category: "basic" },
  { kana: "ネ", romaji: "ne", type: "katakana", category: "basic" },
  { kana: "ノ", romaji: "no", type: "katakana", category: "basic" },

  { kana: "ハ", romaji: "ha", type: "katakana", category: "basic" },
  { kana: "ヒ", romaji: "hi", type: "katakana", category: "basic" },
  { kana: "フ", romaji: "fu", type: "katakana", category: "basic" },
  { kana: "ヘ", romaji: "he", type: "katakana", category: "basic" },
  { kana: "ホ", romaji: "ho", type: "katakana", category: "basic" },

  { kana: "マ", romaji: "ma", type: "katakana", category: "basic" },
  { kana: "ミ", romaji: "mi", type: "katakana", category: "basic" },
  { kana: "ム", romaji: "mu", type: "katakana", category: "basic" },
  { kana: "メ", romaji: "me", type: "katakana", category: "basic" },
  { kana: "モ", romaji: "mo", type: "katakana", category: "basic" },

  { kana: "ヤ", romaji: "ya", type: "katakana", category: "basic" },
  { kana: "ユ", romaji: "yu", type: "katakana", category: "basic" },
  { kana: "ヨ", romaji: "yo", type: "katakana", category: "basic" },

  { kana: "ラ", romaji: "ra", type: "katakana", category: "basic" },
  { kana: "リ", romaji: "ri", type: "katakana", category: "basic" },
  { kana: "ル", romaji: "ru", type: "katakana", category: "basic" },
  { kana: "レ", romaji: "re", type: "katakana", category: "basic" },
  { kana: "ロ", romaji: "ro", type: "katakana", category: "basic" },

  { kana: "ワ", romaji: "wa", type: "katakana", category: "basic" },
  { kana: "ヲ", romaji: "wo", type: "katakana", category: "basic" },
  { kana: "ン", romaji: "n", type: "katakana", category: "basic" },

  // =====================
  // KATAKANA - DAKUTEN
  // =====================
  
  { kana: "ガ", romaji: "ga", type: "katakana", category: "dakuten" },
  { kana: "ギ", romaji: "gi", type: "katakana", category: "dakuten" },
  { kana: "グ", romaji: "gu", type: "katakana", category: "dakuten" },
  { kana: "ゲ", romaji: "ge", type: "katakana", category: "dakuten" },
  { kana: "ゴ", romaji: "go", type: "katakana", category: "dakuten" },

  { kana: "ザ", romaji: "za", type: "katakana", category: "dakuten" },
  { kana: "ジ", romaji: "ji", type: "katakana", category: "dakuten" },
  { kana: "ズ", romaji: "zu", type: "katakana", category: "dakuten" },
  { kana: "ゼ", romaji: "ze", type: "katakana", category: "dakuten" },
  { kana: "ゾ", romaji: "zo", type: "katakana", category: "dakuten" },

  { kana: "ダ", romaji: "da", type: "katakana", category: "dakuten" },
  { kana: "ヂ", romaji: "ji", type: "katakana", category: "dakuten" },
  { kana: "ヅ", romaji: "zu", type: "katakana", category: "dakuten" },
  { kana: "デ", romaji: "de", type: "katakana", category: "dakuten" },
  { kana: "ド", romaji: "do", type: "katakana", category: "dakuten" },

  { kana: "バ", romaji: "ba", type: "katakana", category: "dakuten" },
  { kana: "ビ", romaji: "bi", type: "katakana", category: "dakuten" },
  { kana: "ブ", romaji: "bu", type: "katakana", category: "dakuten" },
  { kana: "ベ", romaji: "be", type: "katakana", category: "dakuten" },
  { kana: "ボ", romaji: "bo", type: "katakana", category: "dakuten" },

  // =====================
  // KATAKANA - HANDAKUTEN
  // =====================

  { kana: "パ", romaji: "pa", type: "katakana", category: "handakuten" },
  { kana: "ピ", romaji: "pi", type: "katakana", category: "handakuten" },
  { kana: "プ", romaji: "pu", type: "katakana", category: "handakuten" },
  { kana: "ペ", romaji: "pe", type: "katakana", category: "handakuten" },
  { kana: "ポ", romaji: "po", type: "katakana", category: "handakuten" },

  // =====================
  // KATAKANA - YOUON
  // =====================

  { kana: "キャ", romaji: "kya", type: "katakana", category: "youon" },
  { kana: "キュ", romaji: "kyu", type: "katakana", category: "youon" },
  { kana: "キョ", romaji: "kyo", type: "katakana", category: "youon" },

  { kana: "ギャ", romaji: "gya", type: "katakana", category: "youon" },
  { kana: "ギュ", romaji: "gyu", type: "katakana", category: "youon" },
  { kana: "ギョ", romaji: "gyo", type: "katakana", category: "youon" },

  { kana: "シャ", romaji: "sha", type: "katakana", category: "youon" },
  { kana: "シュ", romaji: "shu", type: "katakana", category: "youon" },
  { kana: "ショ", romaji: "sho", type: "katakana", category: "youon" },

  { kana: "ジャ", romaji: "ja", type: "katakana", category: "youon" },
  { kana: "ジュ", romaji: "ju", type: "katakana", category: "youon" },
  { kana: "ジョ", romaji: "jo", type: "katakana", category: "youon" },

  { kana: "チャ", romaji: "cha", type: "katakana", category: "youon" },
  { kana: "チュ", romaji: "chu", type: "katakana", category: "youon" },
  { kana: "チョ", romaji: "cho", type: "katakana", category: "youon" },

  { kana: "ニャ", romaji: "nya", type: "katakana", category: "youon" },
  { kana: "ニュ", romaji: "nyu", type: "katakana", category: "youon" },
  { kana: "ニョ", romaji: "nyo", type: "katakana", category: "youon" },

  { kana: "ヒャ", romaji: "hya", type: "katakana", category: "youon" },
  { kana: "ヒュ", romaji: "hyu", type: "katakana", category: "youon" },
  { kana: "ヒョ", romaji: "hyo", type: "katakana", category: "youon" },

  { kana: "ビャ", romaji: "bya", type: "katakana", category: "youon" },
  { kana: "ビュ", romaji: "byu", type: "katakana", category: "youon" },
  { kana: "ビョ", romaji: "byo", type: "katakana", category: "youon" },

  { kana: "ピャ", romaji: "pya", type: "katakana", category: "youon" },
  { kana: "ピュ", romaji: "pyu", type: "katakana", category: "youon" },
  { kana: "ピョ", romaji: "pyo", type: "katakana", category: "youon" },

  { kana: "ミャ", romaji: "mya", type: "katakana", category: "youon" },
  { kana: "ミュ", romaji: "myu", type: "katakana", category: "youon" },
  { kana: "ミョ", romaji: "myo", type: "katakana", category: "youon" },

  { kana: "リャ", romaji: "rya", type: "katakana", category: "youon" },
  { kana: "リュ", romaji: "ryu", type: "katakana", category: "youon" },
  { kana: "リョ", romaji: "ryo", type: "katakana", category: "youon" },

  { kana: "ヂャ", romaji: "ja", type: "katakana", category: "youon" },
  { kana: "ヂュ", romaji: "ju", type: "katakana", category: "youon" },
  { kana: "ヂョ", romaji: "jo", type: "katakana", category: "youon" },
];