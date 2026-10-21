type VerbGroup = '1' | '2' | '3';
type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '-';
type WordClass =
  | 'Verb'
  | 'Noun'
  | 'Adverb'
  | 'Suffix'
  | 'Conjunction'
  | 'Counter'
  | 'Unit'
  | 'I-Adjective'
  | 'Na-Adjective'
  | 'Expression';

export type Word = {
  id: number | null;
  kanji: string;
  kana: string;
  meaning: string;
  level: JLPTLevel;
  class: WordClass, // To determine what can be made with the word (sentence)
  chapter: number,
  onReading?: string[],
  kunReading?: string[],
  verbGroup?: VerbGroup | '-',
  context?: string, // Make learning easier with similar kanji
  explain?: string, // To give further explanation about the usage
  indonesian?: string;
};

// Useful when
export type Forms = {
    id: number,
    structure: [],
    explanation: string,
    chapter: number
}

// Words, Forms and Particles can reference this variable for example sentences.
export type Sentences ={
    id: number,
    sentence: string,
    meaning: string,
    usedWord: [],
    usedParticles: [],
    usedForms?: [],
    usedExpression?: []
}

export type Expression ={
    id: number,
    sentence: string,
    meaning: string,
    politeness: "polite" | "casual"
}

// export type VerbForm = {
//     base: string,
//     dictionary: string;
//     masu: string;
//     te: string;
//     nai: string;
//     ta: string;
//     potential?: string;
// };

export function VerbNegativeConverter () {

}

// {  id: , kanji: "",  kana: "", meaning: "",  level: "", class: '', chapter: , verbGroup: '', onReading: [], kunReading: [], similar: [''],  context: '-', indonesian: ""}

export const WordList: Word[] = [
    {  id: 1, kanji: "私",  kana: "わたし", meaning: "I, Me",  level: "N5", class: 'Noun', chapter: 1, verbGroup: '-', onReading: ['シ'], kunReading: ['わたくし', 'わたし'],  context: '-', indonesian: "Saya"},
    // {  id: 2, kanji: "届く",  kana: "とどく", meaning: "to reach, to be delivered",  level: "N2", class: 'Noun', chapter: 36, verbGroup: '-', onReading: [], kunReading: [], similar: [''],  context: '-', indonesian: "Sampai"},
    {  id: 3, kanji: "-",  kana: "あいます", meaning: "accident, bad experience",  level: "-", class: 'Verb', chapter: 36, verbGroup: '1', onReading: [], kunReading: [],  context: '事故に (accident)', indonesian: "mengalam kecelakaan"},
    {  id: 4, kanji: "貯金します",  kana: "ちょきんします", meaning: "savings",  level: "N2", class: 'Verb', chapter: 36, verbGroup: '3', onReading: [], kunReading: [],  context: '-', indonesian: "tabungan"},
    {  id: 5, kanji: "過ぎる",  kana: "すぎる", meaning: "to go through、to pass",  level: "N3", class: 'Verb', chapter: 36, verbGroup: '2', onReading: [], kunReading: [],  context: '7時を～', indonesian: "melewati"},
    {  id: 6, kanji: "慣れます",  kana: "なれます", meaning: "to get used to",  level: "N3", class: 'Verb', chapter: 36, verbGroup: '2', onReading: [], kunReading: [],  context: '-', indonesian: ""},

    { id: null, kanji: "あいます", kana: "あいます", meaning: "to be involved in / encounter (an accident)", level: "N3", class: "Verb", chapter: 36, verbGroup: "1", onReading: [], kunReading: [], context: "事故にあいます", indonesian: "tertimpa (kecelakaan)" },
    { id: null, kanji: "貯金します", kana: "ちょきんします", meaning: "to save money", level: "N3", class: "Verb", chapter: 36, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "menabung" },
    { id: null, kanji: "過ぎます", kana: "すぎます", meaning: "to pass / exceed", level: "N4", class: "Verb", chapter: 36, verbGroup: "2", onReading: [], kunReading: [], context: "7時を過ぎます", indonesian: "lewat (pukul)" },
    { id: null, kanji: "慣れます", kana: "なれます", meaning: "to get used to", level: "N4", class: "Verb", chapter: 36, verbGroup: "2", onReading: [], kunReading: [], context: "仕事に慣れます", indonesian: "terbiasa (dengan tugas)" },
    { id: null, kanji: "腐ります", kana: "くさります", meaning: "to rot / go bad", level: "N3", class: "Verb", chapter: 36, verbGroup: "1", onReading: [], kunReading: [], context: "食べ物が腐ります", indonesian: "busuk" },
    { id: null, kanji: "剣道", kana: "けんどう", meaning: "kendo", level: "N2", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kendo (anggar gaya Jepang)" },
    { id: null, kanji: "柔道", kana: "じゅうどう", meaning: "judo", level: "N2", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "judo" },
    { id: null, kanji: "ラッシュ", kana: "ラッシュ", meaning: "rush hour / crowding", level: "N3", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "keramaian, kesibukan" },
    { id: null, kanji: "宇宙", kana: "うちゅう", meaning: "universe / space", level: "N3", class: "Noun", chapter: 36, verbGroup: "-", onReading: ["うちゅう"], kunReading: [], context: "", indonesian: "angkasa" },
    { id: null, kanji: "曲", kana: "きょく", meaning: "piece of music", level: "N4", class: "Noun", chapter: 36, verbGroup: "-", onReading: ["きょく"], kunReading: ["ま"], context: "", indonesian: "musik" },
    { id: null, kanji: "毎週", kana: "まいしゅう", meaning: "every week", level: "N5", class: "Noun", chapter: 36, verbGroup: "-", onReading: ["しゅう"], kunReading: [], context: "", indonesian: "setiap minggu" },
    { id: null, kanji: "毎月", kana: "まいつき", meaning: "every month", level: "N5", class: "Noun", chapter: 36, verbGroup: "-", onReading: ["げつ"], kunReading: [], context: "", indonesian: "setiap bulan" },
    { id: null, kanji: "毎年", kana: "まいとし", meaning: "every year", level: "N5", class: "Noun", chapter: 36, verbGroup: "-", onReading: ["ねん"], kunReading: [], context: "", indonesian: "setiap tahun" },
    { id: null, kanji: "このごろ", kana: "このごろ", meaning: "these days / lately", level: "N4", class: "Expression", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "akhir-akhir ini" },
    { id: null, kanji: "やっと", kana: "やっと", meaning: "finally / at last", level: "N4", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "akhirnya" },
    { id: null, kanji: "かなり", kana: "かなり", meaning: "considerably / fairly", level: "N3", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "cukup" },
    { id: null, kanji: "必ず", kana: "かならず", meaning: "without fail / certainly", level: "N3", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pasti" },
    { id: null, kanji: "絶対に", kana: "ぜったいに", meaning: "absolutely", level: "N3", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "mutlak" },
    { id: null, kanji: "上手に", kana: "じょうずに", meaning: "skillfully", level: "N4", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "dengan pandai" },
    { id: null, kanji: "ほとんど", kana: "ほとんど", meaning: "almost / mostly", level: "N4", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sebagian besar" },
    { id: null, kanji: "お客様", kana: "おきゃくさま", meaning: "guest / customer (honorific)", level: "N3", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "tamu" },
    { id: null, kanji: "特別[な]", kana: "とくべつ[な]", meaning: "special", level: "N3", class: "Na-Adjective", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "khusus, spesial" },
    { id: null, kanji: "していらっしゃいます", kana: "していらっしゃいます", meaning: "to be doing (honorific)", level: "N3", class: "Expression", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "melakukan (bentuk hormat)" },
    { id: null, kanji: "水泳", kana: "すいえい", meaning: "swimming", level: "N3", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "renang" },
    { id: null, kanji: "違います", kana: "ちがいます", meaning: "to be different / wrong", level: "N5", class: "Verb", chapter: 36, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "salah, tidak benar" },
    { id: null, kanji: "使っていらっしゃるんですね", kana: "つかっていらっしゃるんですね", meaning: "You are using it, aren't you? (honorific)", level: "N3", class: "Expression", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "menggunakan ~, ya" },
    { id: null, kanji: "チャレンジします", kana: "チャレンジします", meaning: "to challenge / try", level: "N3", class: "Verb", chapter: 36, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "menantang" },
    { id: null, kanji: "気持ち", kana: "きもち", meaning: "feeling / mood", level: "N4", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sikap, perasaan" },
    { id: null, kanji: "乗り物", kana: "のりもの", meaning: "vehicle", level: "N4", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kendaraan" },
    { id: null, kanji: "世紀", kana: "せいき", meaning: "century", level: "N3", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "abad ke-" },
    { id: null, kanji: "遠く", kana: "とおく", meaning: "far away", level: "N4", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "jauh" },
    { id: null, kanji: "珍しい", kana: "めずらしい", meaning: "rare / unusual", level: "N3", class: "I-Adjective", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "langka" },
    { id: null, kanji: "汽車", kana: "きしゃ", meaning: "train (steam train)", level: "N2", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kereta api" },
    { id: null, kanji: "船", kana: "ふね", meaning: "ship / boat", level: "N5", class: "Noun", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kapal" },
    { id: null, kanji: "大勢", kana: "おおぜい", meaning: "many people", level: "N4", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "banyak (orang)" },
    { id: null, kanji: "運びます", kana: "はこびます", meaning: "to carry / transport", level: "N3", class: "Verb", chapter: 36, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mengangkut" },
    { id: null, kanji: "利用します", kana: "りようします", meaning: "to use / make use of", level: "N3", class: "Verb", chapter: 36, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "menggunakan" },
    { id: null, kanji: "自由に", kana: "じゆうに", meaning: "freely", level: "N4", class: "Adverb", chapter: 36, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "dengan bebas" },

    // Lesson 37
    { id: null, kanji: "褒めます", kana: "ほめます", meaning: "to praise", level: "N4", class: "Verb", chapter: 37, verbGroup: "2", onReading: [], kunReading: [], context: "", indonesian: "memuji" },
    { id: null, kanji: "叱ります", kana: "しかります", meaning: "to scold", level: "N3", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "memarahi" },
    { id: null, kanji: "誘います", kana: "さそいます", meaning: "to invite / ask along", level: "N4", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mengajak" },
    { id: null, kanji: "招待します", kana: "しょうたいします", meaning: "to invite", level: "N4", class: "Verb", chapter: 37, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "mengundang" },
    { id: null, kanji: "頼みます", kana: "たのみます", meaning: "to ask / request", level: "N4", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "meminta" },
    { id: null, kanji: "注意します", kana: "ちゅういします", meaning: "to warn / advise / pay attention", level: "N4", class: "Verb", chapter: 37, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "menasihati" },
    { id: null, kanji: "盗ります", kana: "とります", meaning: "to steal", level: "N3", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mencuri" },
    { id: null, kanji: "踏みます", kana: "ふみます", meaning: "to step on", level: "N3", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "menginjak" },
    { id: null, kanji: "壊します", kana: "こわします", meaning: "to break / destroy something", level: "N4", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "merusak" },
    { id: null, kanji: "汚します", kana: "よごします", meaning: "to make dirty", level: "N3", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mengotori" },
    { id: null, kanji: "行います", kana: "おこないます", meaning: "to conduct / hold", level: "N3", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mengadakan" },
    { id: null, kanji: "輸出します", kana: "ゆしゅつします", meaning: "to export", level: "N3", class: "Verb", chapter: 37, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "mengekspor" },
    { id: null, kanji: "輸入します", kana: "ゆにゅうします", meaning: "to import", level: "N3", class: "Verb", chapter: 37, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "mengimpor" },
    { id: null, kanji: "翻訳します", kana: "ほんやくします", meaning: "to translate", level: "N3", class: "Verb", chapter: 37, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "menerjemahkan" },
    { id: null, kanji: "発明します", kana: "はつめいします", meaning: "to invent", level: "N3", class: "Verb", chapter: 37, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "menciptakan" },
    { id: null, kanji: "発見します", kana: "はっけんします", meaning: "to discover", level: "N3", class: "Verb", chapter: 37, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "menemukan" },
    { id: null, kanji: "米", kana: "こめ", meaning: "rice (uncooked)", level: "N5", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: ["こめ"], context: "", indonesian: "beras" },
    { id: null, kanji: "麦", kana: "むぎ", meaning: "wheat / barley", level: "N2", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: ["むぎ"], context: "", indonesian: "gandum" },
    { id: null, kanji: "石油", kana: "せきゆ", meaning: "petroleum", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: ["せきゆ"], kunReading: [], context: "", indonesian: "minyak tanah" },
    { id: null, kanji: "原料", kana: "げんりょう", meaning: "raw material", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: ["げんりょう"], kunReading: [], context: "", indonesian: "bahan baku" },
    { id: null, kanji: "インスタントラーメン", kana: "インスタントラーメン", meaning: "instant noodles", level: "N4", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "mi instan" },
    { id: null, kanji: "デート", kana: "デート", meaning: "date", level: "N4", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kencan" },
    { id: null, kanji: "泥棒", kana: "どろぼう", meaning: "thief", level: "N4", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pencuri" },
    { id: null, kanji: "警官", kana: "けいかん", meaning: "police officer", level: "N4", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "polisi" },
    { id: null, kanji: "世界中", kana: "せかいじゅう", meaning: "all over the world", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "seluruh dunia" },
    { id: null, kanji: "～中", kana: "～じゅう", meaning: "throughout / all over ~", level: "N3", class: "Suffix", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "世界中", indonesian: "seluruh ~" },
    { id: null, kanji: "～世紀", kana: "～せいき", meaning: "～th century", level: "N3", class: "Suffix", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "21世紀", indonesian: "abad ke-" },
    { id: null, kanji: "何語", kana: "なにご", meaning: "what language", level: "N4", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "bahasa apa" },
    { id: null, kanji: "誰か", kana: "だれか", meaning: "someone", level: "N5", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "siapa (seseorang)" },
    { id: null, kanji: "皆様", kana: "みなさま", meaning: "everyone (honorific)", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "semuanya" },
    { id: null, kanji: "焼けます", kana: "やけます", meaning: "to burn (house/building)", level: "N4", class: "Verb", chapter: 37, verbGroup: "2", onReading: [], kunReading: [], context: "うちが焼けます", indonesian: "terbakar" },
    { id: null, kanji: "その後", kana: "そのあと", meaning: "after that", level: "N4", class: "Expression", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "setelah itu, sesudah itu" },
    { id: null, kanji: "世界遺産", kana: "せかいいさん", meaning: "World Heritage Site", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "Situs Warisan Dunia UNESCO" },
    { id: null, kanji: "～の一つ", kana: "～のひとつ", meaning: "one of ~", level: "N4", class: "Expression", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "salah satu ~" },
    { id: null, kanji: "金色", kana: "きんいろ", meaning: "golden color", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "warna emas" },
    { id: null, kanji: "本物", kana: "ほんもの", meaning: "genuine / real thing", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "asli" },
    { id: null, kanji: "金", kana: "きん", meaning: "gold", level: "N5", class: "Noun", chapter: 37, verbGroup: "-", onReading: ["きん"], kunReading: ["かね"], context: "", indonesian: "emas" },
    { id: null, kanji: "美しい", kana: "うつくしい", meaning: "beautiful", level: "N3", class: "I-Adjective", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "indah, elok" },
    { id: null, kanji: "豪華[な]", kana: "ごうか[な]", meaning: "luxurious / gorgeous", level: "N3", class: "Na-Adjective", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "mewah" },
    { id: null, kanji: "彫刻", kana: "ちょうこく", meaning: "sculpture / carving", level: "N2", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "ukiran, pahatan" },
    { id: null, kanji: "伝統", kana: "でんとう", meaning: "tradition", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "tradisi" },
    { id: null, kanji: "眠ります", kana: "ねむります", meaning: "to sleep", level: "N3", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "tidur" },
    { id: null, kanji: "彫ります", kana: "ほります", meaning: "to carve / engrave", level: "N2", class: "Verb", chapter: 37, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mengukir, memahat" },
    { id: null, kanji: "仲間", kana: "なかま", meaning: "companion / friend", level: "N3", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "teman" },
    { id: null, kanji: "しかし", kana: "しかし", meaning: "however / but", level: "N4", class: "Conjunction", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "tetapi" },
    { id: null, kanji: "一匹もいません", kana: "いっぴきもいません", meaning: "there is not even one (small animal)", level: "N4", class: "Expression", chapter: 37, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "tidak ada seekor pun" },
    { id: null, kanji: "猫", kana: "ねこ", meaning: "cat", level: "N5", class: "Noun", chapter: 37, verbGroup: "-", onReading: [], kunReading: ["ねこ"], context: "", indonesian: "kucing" },

    // Lesson 38
    { id: null, kanji: "参加します", kana: "さんかします", meaning: "to participate", level: "N4", class: "Verb", chapter: 38, verbGroup: "3", onReading: [], kunReading: [], context: "旅行に参加します", indonesian: "mengikuti (perjalanan)" },
    { id: null, kanji: "育てます", kana: "そだてます", meaning: "to raise / bring up", level: "N4", class: "Verb", chapter: 38, verbGroup: "2", onReading: [], kunReading: [], context: "", indonesian: "memelihara" },
    { id: null, kanji: "運びます", kana: "はこびます", meaning: "to carry / transport", level: "N3", class: "Verb", chapter: 38, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mengangkut" },
    { id: null, kanji: "入院します", kana: "にゅういんします", meaning: "to be hospitalized", level: "N3", class: "Verb", chapter: 38, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "opname" },
    { id: null, kanji: "退院します", kana: "たいいんします", meaning: "to leave hospital", level: "N3", class: "Verb", chapter: 38, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "keluar dari rumah sakit" },
    { id: null, kanji: "入れます", kana: "いれます", meaning: "to turn on (power supply)", level: "N5", class: "Verb", chapter: 38, verbGroup: "2", onReading: [], kunReading: [], context: "電源を入れます", indonesian: "menghidupkan (power supply)" },
    { id: null, kanji: "切ります", kana: "きります", meaning: "to turn off (power supply)", level: "N5", class: "Verb", chapter: 38, verbGroup: "1", onReading: [], kunReading: [], context: "電源を切ります", indonesian: "mematikan (power supply)" },
    { id: null, kanji: "掛けます", kana: "かけます", meaning: "to lock", level: "N4", class: "Verb", chapter: 38, verbGroup: "2", onReading: [], kunReading: [], context: "鍵を掛けます", indonesian: "mengunci" },
    { id: null, kanji: "つきます", kana: "つきます", meaning: "to tell a lie", level: "N3", class: "Verb", chapter: 38, verbGroup: "1", onReading: [], kunReading: [], context: "うそをつきます", indonesian: "berbohong" },
    { id: null, kanji: "気持ちがいい", kana: "きもちがいい", meaning: "to feel good / pleasant", level: "N4", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "rasa enak" },
    { id: null, kanji: "気持ちが悪い", kana: "きもちがわるい", meaning: "to feel unpleasant / disgusting", level: "N4", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "rasa tidak enak, jijik" },
    { id: null, kanji: "大きな～", kana: "おおきな～", meaning: "big ~", level: "N5", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "besar ~" },
    { id: null, kanji: "小さな～", kana: "ちいさな～", meaning: "small ~", level: "N4", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kecil ~" },
    { id: null, kanji: "赤ちゃん", kana: "あかちゃん", meaning: "baby", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "bayi" },
    { id: null, kanji: "小学校", kana: "しょうがっこう", meaning: "elementary school", level: "N5", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "SD" },
    { id: null, kanji: "中学校", kana: "ちゅうがっこう", meaning: "junior high school", level: "N5", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "SMP" },
    { id: null, kanji: "駅前", kana: "えきまえ", meaning: "in front of the station", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "depan stasiun" },
    { id: null, kanji: "海岸", kana: "かいがん", meaning: "coast / seashore", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pantai laut" },
    { id: null, kanji: "工場", kana: "こうじょう", meaning: "factory", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pabrik" },
    { id: null, kanji: "村", kana: "むら", meaning: "village", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "desa, kampung" },
    { id: null, kanji: "指輪", kana: "ゆびわ", meaning: "ring", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "cincin" },
    { id: null, kanji: "電源", kana: "でんげん", meaning: "power supply", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "power supply" },
    { id: null, kanji: "習慣", kana: "しゅうかん", meaning: "habit / custom", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kebiasaan" },
    { id: null, kanji: "健康", kana: "けんこう", meaning: "health", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kesehatan" },
    { id: null, kanji: "～製", kana: "～せい", meaning: "made in / made by ~", level: "N3", class: "Suffix", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "日本製", indonesian: "buatan ~" },
    { id: null, kanji: "おととし", kana: "おととし", meaning: "the year before last", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "dua tahun yang lalu" },
    { id: null, kanji: "いけない", kana: "いけない", meaning: "Oh no! / that's bad!", level: "N4", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "[Ah,] Salah!" },
    { id: null, kanji: "お先に失礼します", kana: "おさきにしつれいします", meaning: "Excuse me for leaving first", level: "N3", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "Permisi duluan" },
    { id: null, kanji: "研究室", kana: "けんきゅうしつ", meaning: "laboratory / professor's office", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "laboratorium/ruang dosen" },
    { id: null, kanji: "きちんと", kana: "きちんと", meaning: "neatly / properly", level: "N3", class: "Adverb", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "dengan rapi" },
    { id: null, kanji: "方法", kana: "ほうほう", meaning: "method / way", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "cara" },
    { id: null, kanji: "～冊", kana: "～さつ", meaning: "counter for books", level: "N4", class: "Counter", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "buah (buku)" },
    { id: null, kanji: "はんこ", kana: "はんこ", meaning: "personal seal / stamp", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "cap" },
    { id: null, kanji: "押します", kana: "おします", meaning: "to stamp / press", level: "N5", class: "Verb", chapter: 38, verbGroup: "1", onReading: [], kunReading: [], context: "はんこを押します", indonesian: "mengecap" },
    { id: null, kanji: "双子", kana: "ふたご", meaning: "twins", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "anak kembar" },
    { id: null, kanji: "姉妹", kana: "しまい", meaning: "sisters", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "saudara perempuan" },
    { id: null, kanji: "5年生", kana: "ごねんせい", meaning: "fifth-grade student", level: "N5", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kelas lima" },
    { id: null, kanji: "似ています", kana: "にています", meaning: "to resemble", level: "N4", class: "Verb", chapter: 38, verbGroup: "2", onReading: [], kunReading: [], context: "", indonesian: "mirip" },
    { id: null, kanji: "性格", kana: "せいかく", meaning: "personality / character", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sifat" },
    { id: null, kanji: "おとなしい", kana: "おとなしい", meaning: "quiet / gentle", level: "N3", class: "I-Adjective", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pendiam" },
    { id: null, kanji: "優しい", kana: "やさしい", meaning: "kind / gentle", level: "N5", class: "I-Adjective", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "baik hati" },
    { id: null, kanji: "世話をします", kana: "せわをします", meaning: "to take care of", level: "N3", class: "Verb", chapter: 38, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "merawat" },
    { id: null, kanji: "時間がたちます", kana: "じかんがたちます", meaning: "time passes", level: "N3", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "waktu berlalu" },
    { id: null, kanji: "大好き[な]", kana: "だいすき[な]", meaning: "to like very much", level: "N5", class: "Na-Adjective", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "suka sekali" },
    { id: null, kanji: "点", kana: "てん", meaning: "point / score", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "poin" },
    { id: null, kanji: "気が強い", kana: "きがつよい", meaning: "strong-willed / fierce", level: "N3", class: "Expression", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "bersifat keras, galak" },
    { id: null, kanji: "けんかします", kana: "けんかします", meaning: "to quarrel / fight", level: "N4", class: "Verb", chapter: 38, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "bertengkar" },
    { id: null, kanji: "不思議[な]", kana: "ふしぎ[な]", meaning: "strange / mysterious", level: "N3", class: "Na-Adjective", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "aneh" },
    { id: null, kanji: "年齢", kana: "ねんれい", meaning: "age", level: "N3", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "usia, umur" },
    { id: null, kanji: "しかた", kana: "しかた", meaning: "way / method", level: "N4", class: "Noun", chapter: 38, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "cara" },

    // Lesson 39
    { id: null, kanji: "答えます", kana: "こたえます", meaning: "to answer", level: "N5", class: "Verb", chapter: 39, verbGroup: "2", onReading: [], kunReading: [], context: "質問に答えます", indonesian: "menjawab (pertanyaan)" },
    { id: null, kanji: "倒れます", kana: "たおれます", meaning: "to fall down / collapse", level: "N4", class: "Verb", chapter: 39, verbGroup: "2", onReading: [], kunReading: [], context: "ビルが倒れます", indonesian: "roboh (bangunan)" },
    { id: null, kanji: "通ります", kana: "とおります", meaning: "to pass through / go along", level: "N4", class: "Verb", chapter: 39, verbGroup: "1", onReading: [], kunReading: [], context: "道を通ります", indonesian: "lewat, melalui (jalan)" },
    { id: null, kanji: "死にます", kana: "しにます", meaning: "to die", level: "N5", class: "Verb", chapter: 39, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "meninggal dunia" },
    { id: null, kanji: "びっくりします", kana: "びっくりします", meaning: "to be surprised", level: "N4", class: "Verb", chapter: 39, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "kaget" },
    { id: null, kanji: "がっかりします", kana: "がっかりします", meaning: "to be disappointed", level: "N3", class: "Verb", chapter: 39, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "putus asa / kecewa" },
    { id: null, kanji: "安心します", kana: "あんしんします", meaning: "to feel relieved", level: "N3", class: "Verb", chapter: 39, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "lega" },
    { id: null, kanji: "けんかします", kana: "けんかします", meaning: "to quarrel / fight", level: "N4", class: "Verb", chapter: 39, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "bertengkar" },
    { id: null, kanji: "離婚します", kana: "りこんします", meaning: "to divorce", level: "N3", class: "Verb", chapter: 39, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "bercerai" },
    { id: null, kanji: "太ります", kana: "ふとります", meaning: "to gain weight", level: "N4", class: "Verb", chapter: 39, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "menjadi gemuk" },
    { id: null, kanji: "やせます", kana: "やせます", meaning: "to lose weight / become thin", level: "N4", class: "Verb", chapter: 39, verbGroup: "2", onReading: [], kunReading: [], context: "", indonesian: "menjadi kurus" },
    { id: null, kanji: "複雑[な]", kana: "ふくざつ[な]", meaning: "complicated", level: "N3", class: "Na-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "rumit" },
    { id: null, kanji: "邪魔[な]", kana: "じゃま[な]", meaning: "in the way / obstructive", level: "N3", class: "Na-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "gangguan" },
    { id: null, kanji: "硬い", kana: "かたい", meaning: "hard", level: "N4", class: "I-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "keras" },
    { id: null, kanji: "軟らかい", kana: "やわらかい", meaning: "soft", level: "N4", class: "I-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "lembut" },
    { id: null, kanji: "汚い", kana: "きたない", meaning: "dirty", level: "N5", class: "I-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kotor" },
    { id: null, kanji: "うれしい", kana: "うれしい", meaning: "happy / glad", level: "N5", class: "I-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "senang" },
    { id: null, kanji: "悲しい", kana: "かなしい", meaning: "sad", level: "N5", class: "I-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sedih" },
    { id: null, kanji: "恥ずかしい", kana: "はずかしい", meaning: "embarrassing / ashamed", level: "N3", class: "I-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "malu" },
    { id: null, kanji: "首相", kana: "しゅしょう", meaning: "prime minister", level: "N2", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "perdana menteri" },
    { id: null, kanji: "地震", kana: "じしん", meaning: "earthquake", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "gempa bumi" },
    { id: null, kanji: "津波", kana: "つなみ", meaning: "tsunami", level: "N2", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "tsunami" },
    { id: null, kanji: "台風", kana: "たいふう", meaning: "typhoon", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "angin topan" },
    { id: null, kanji: "火事", kana: "かじ", meaning: "fire (disaster)", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kebakaran" },
    { id: null, kanji: "事故", kana: "じこ", meaning: "accident", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kecelakaan" },
    { id: null, kanji: "ハイキング", kana: "ハイキング", meaning: "hiking", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "hiking" },
    { id: null, kanji: "お見合い", kana: "おみあい", meaning: "formal meeting for marriage", level: "N2", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "perjodohan" },
    { id: null, kanji: "操作", kana: "そうさ", meaning: "operation / manipulation", level: "N3", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "operasi" },
    { id: null, kanji: "会場", kana: "かいじょう", meaning: "venue", level: "N3", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "tempat" },
    { id: null, kanji: "～代", kana: "～だい", meaning: "fee / charge for ~", level: "N4", class: "Suffix", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "電話代", indonesian: "biaya untuk ~" },
    { id: null, kanji: "フロント", kana: "フロント", meaning: "front desk / reception", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "resepsionis" },
    { id: null, kanji: "～号室", kana: "～ごうしつ", meaning: "room number ~", level: "N4", class: "Suffix", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "301号室", indonesian: "kamar nomor ~" },
    { id: null, kanji: "タオル", kana: "タオル", meaning: "towel", level: "N5", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "handuk" },
    { id: null, kanji: "せっけん", kana: "せっけん", meaning: "soap", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sabun" },
    { id: null, kanji: "お疲れさまでした", kana: "おつかれさまでした", meaning: "thank you for your hard work", level: "N4", class: "Expression", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "terima kasih atas kerja samanya" },
    { id: null, kanji: "伺います", kana: "うかがいます", meaning: "to visit / go (humble)", level: "N3", class: "Verb", chapter: 39, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "pergi (bentuk merendahkan diri)" },
    { id: null, kanji: "途中で", kana: "とちゅうで", meaning: "on the way / midway", level: "N3", class: "Expression", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "di tengah" },
    { id: null, kanji: "トラック", kana: "トラック", meaning: "truck", level: "N5", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "truk" },
    { id: null, kanji: "ぶつかります", kana: "ぶつかります", meaning: "to collide / bump into", level: "N3", class: "Verb", chapter: 39, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "menabrak" },
    { id: null, kanji: "大人", kana: "おとな", meaning: "adult", level: "N5", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "orang dewasa" },
    { id: null, kanji: "洋服", kana: "ようふく", meaning: "Western-style clothes", level: "N4", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "baju" },
    { id: null, kanji: "西洋化します", kana: "せいようかします", meaning: "to become Westernized", level: "N2", class: "Verb", chapter: 39, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "kebarat-baratan" },
    { id: null, kanji: "合います", kana: "あいます", meaning: "to suit / fit / match", level: "N5", class: "Verb", chapter: 39, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "cocok" },
    { id: null, kanji: "今では", kana: "いまでは", meaning: "now / nowadays", level: "N3", class: "Expression", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sekarang" },
    { id: null, kanji: "成人式", kana: "せいじんしき", meaning: "Coming-of-Age ceremony", level: "N2", class: "Noun", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "upacara pendewasaan" },
    { id: null, kanji: "伝統的[な]", kana: "でんとうてき[な]", meaning: "traditional", level: "N3", class: "Na-Adjective", chapter: 39, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "secara tradisional" },

    // Lesson 40
    { id: null, kanji: "数えます", kana: "かぞえます", meaning: "to count", level: "N4", class: "Verb", chapter: 40, verbGroup: "2", onReading: [], kunReading: [], context: "", indonesian: "menghitung" },
    { id: null, kanji: "測ります", kana: "はかります", meaning: "to measure (length/size)", level: "N4", class: "Verb", chapter: 40, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mengukur" },
    { id: null, kanji: "量ります", kana: "はかります", meaning: "to weigh / measure quantity", level: "N3", class: "Verb", chapter: 40, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "menimbang" },
    { id: null, kanji: "確かめます", kana: "たしかめます", meaning: "to check / confirm", level: "N3", class: "Verb", chapter: 40, verbGroup: "2", onReading: [], kunReading: [], context: "", indonesian: "mengecek" },
    { id: null, kanji: "合います", kana: "あいます", meaning: "to fit / be the right size", level: "N4", class: "Verb", chapter: 40, verbGroup: "1", onReading: [], kunReading: [], context: "サイズが合います", indonesian: "cocok (ukurannya)" },
    { id: null, kanji: "出発します", kana: "しゅっぱつします", meaning: "to depart", level: "N4", class: "Verb", chapter: 40, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "berangkat" },
    { id: null, kanji: "到着します", kana: "とうちゃくします", meaning: "to arrive", level: "N3", class: "Verb", chapter: 40, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "tiba" },
    { id: null, kanji: "酔います", kana: "よいます", meaning: "to get drunk / motion-sick", level: "N4", class: "Verb", chapter: 40, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "mabuk" },
    { id: null, kanji: "うまくいきます", kana: "うまくいきます", meaning: "to go well / succeed", level: "N3", class: "Expression", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "berhasil dengan baik" },
    { id: null, kanji: "出ます", kana: "でます", meaning: "to be given / appear (exam question)", level: "N5", class: "Verb", chapter: 40, verbGroup: "2", onReading: [], kunReading: [], context: "問題が出ます", indonesian: "diberikan (soal ujian)" },
    { id: null, kanji: "相談します", kana: "そうだんします", meaning: "to consult", level: "N4", class: "Verb", chapter: 40, verbGroup: "3", onReading: [], kunReading: [], context: "", indonesian: "berkonsultasi" },
    { id: null, kanji: "必要[な]", kana: "ひつよう[な]", meaning: "necessary", level: "N4", class: "Na-Adjective", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "perlu" },
    { id: null, kanji: "天気予報", kana: "てんきよほう", meaning: "weather forecast", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "prakiraan cuaca" },
    { id: null, kanji: "忘年会", kana: "ぼうねんかい", meaning: "year-end party", level: "N2", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pesta akhir tahun" },
    { id: null, kanji: "新年会", kana: "しんねんかい", meaning: "New Year's party", level: "N2", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pesta tahun baru" },
    { id: null, kanji: "二次会", kana: "にじかい", meaning: "after-party / second party", level: "N2", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pesta untuk kedua kalinya" },
    { id: null, kanji: "発表会", kana: "はっぴょうかい", meaning: "presentation / recital", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "presentasi" },
    { id: null, kanji: "大会", kana: "たいかい", meaning: "tournament / convention", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "lomba" },
    { id: null, kanji: "マラソン", kana: "マラソン", meaning: "marathon", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "maraton" },
    { id: null, kanji: "コンテスト", kana: "コンテスト", meaning: "contest", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pertandingan" },
    { id: null, kanji: "表", kana: "おもて", meaning: "front / outside", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "muka" },
    { id: null, kanji: "裏", kana: "うら", meaning: "back / reverse side", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "belakang" },
    { id: null, kanji: "間違い", kana: "まちがい", meaning: "mistake / error", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kesalahan" },
    { id: null, kanji: "傷", kana: "きず", meaning: "wound / scratch / flaw", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "cacat, luka" },
    { id: null, kanji: "ズボン", kana: "ズボン", meaning: "trousers / pants", level: "N5", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "celana" },
    { id: null, kanji: "[お]年寄り", kana: "[お]としより", meaning: "elderly person", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "orang lanjut usia" },
    { id: null, kanji: "長さ", kana: "ながさ", meaning: "length", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "panjangnya" },
    { id: null, kanji: "重さ", kana: "おもさ", meaning: "weight", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "beratnya" },
    { id: null, kanji: "高さ", kana: "たかさ", meaning: "height", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "tingginya" },
    { id: null, kanji: "大きさ", kana: "おおきさ", meaning: "size", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "besarnya" },
    { id: null, kanji: "～便", kana: "～びん", meaning: "flight / service number", level: "N3", class: "Suffix", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "JL107便", indonesian: "nomor penerbangan" },
    { id: null, kanji: "～個", kana: "～こ", meaning: "counter for small objects", level: "N5", class: "Counter", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "buah (benda kecil)" },
    { id: null, kanji: "～本", kana: "～ほん", meaning: "counter for long cylindrical objects", level: "N5", class: "Counter", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "batang (benda panjang)" },
    { id: null, kanji: "～杯", kana: "～はい", meaning: "counter for cups / glasses", level: "N5", class: "Counter", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "cangkir, gelas" },
    { id: null, kanji: "～センチ", kana: "～センチ", meaning: "centimeter", level: "N5", class: "Unit", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "senti" },
    { id: null, kanji: "～ミリ", kana: "～ミリ", meaning: "millimeter", level: "N4", class: "Unit", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "mili" },
    { id: null, kanji: "～グラム", kana: "～グラム", meaning: "gram", level: "N5", class: "Unit", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "gram" },
    { id: null, kanji: "～以上", kana: "～いじょう", meaning: "at least / more than ~", level: "N4", class: "Suffix", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "ke atas ~" },
    { id: null, kanji: "～以下", kana: "～いか", meaning: "at most / less than or equal to ~", level: "N4", class: "Suffix", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "ke bawah ~" },
    { id: null, kanji: "どうでしょうか", kana: "どうでしょうか", meaning: "How about it? (polite)", level: "N4", class: "Expression", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "Bagaimana?" },
    { id: null, kanji: "テスト", kana: "テスト", meaning: "test / exam", level: "N5", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "ujian" },
    { id: null, kanji: "成績", kana: "せいせき", meaning: "grade / results", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "nilai" },
    { id: null, kanji: "ところで", kana: "ところで", meaning: "by the way", level: "N4", class: "Conjunction", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "ngomong-ngomong" },
    { id: null, kanji: "いらっしゃいます", kana: "いらっしゃいます", meaning: "to come / go / be (honorific)", level: "N3", class: "Verb", chapter: 40, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "datang (bentuk hormat)" },
    { id: null, kanji: "様子", kana: "ようす", meaning: "state / condition / appearance", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kondisi, suasana" },
    { id: null, kanji: "事件", kana: "じけん", meaning: "incident / case", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "kejadian" },
    { id: null, kanji: "オートバイ", kana: "オートバイ", meaning: "motorcycle", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sepeda motor" },
    { id: null, kanji: "爆弾", kana: "ばくだん", meaning: "bomb", level: "N2", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "bom" },
    { id: null, kanji: "積みます", kana: "つみます", meaning: "to load / pile up", level: "N3", class: "Verb", chapter: 40, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "memuatkan" },
    { id: null, kanji: "運転手", kana: "うんてんしゅ", meaning: "driver", level: "N4", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sopir" },
    { id: null, kanji: "離れた", kana: "はなれた", meaning: "separated / away from", level: "N3", class: "Expression", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "terpisah" },
    { id: null, kanji: "急に", kana: "きゅうに", meaning: "suddenly", level: "N4", class: "Adverb", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "mendadak, tiba-tiba" },
    { id: null, kanji: "動かします", kana: "うごかします", meaning: "to move something", level: "N4", class: "Verb", chapter: 40, verbGroup: "1", onReading: [], kunReading: [], context: "", indonesian: "menggerakkan" },
    { id: null, kanji: "一生懸命", kana: "いっしょうけんめい", meaning: "with all one's effort", level: "N3", class: "Adverb", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sungguh-sungguh" },
    { id: null, kanji: "本人", kana: "ほんにん", meaning: "the person concerned / the person himself", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "orang yang bersangkutan" },
    { id: null, kanji: "犯人", kana: "はんにん", meaning: "criminal / culprit", level: "N3", class: "Noun", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "pelaku" },
    { id: null, kanji: "手に入れます", kana: "てにいれます", meaning: "to obtain / get hold of", level: "N3", class: "Verb", chapter: 40, verbGroup: "2", onReading: [], kunReading: [], context: "", indonesian: "mendapatkan" },
    { id: null, kanji: "今まで", kana: "いままで", meaning: "until now / so far", level: "N5", class: "Expression", chapter: 40, verbGroup: "-", onReading: [], kunReading: [], context: "", indonesian: "sampai sekarang" }
]