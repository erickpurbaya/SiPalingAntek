import { Link } from 'react-router-dom';
// import { resetRemedy } from '../syllabary-kanji';

export default function Home() {
  return (
    <div className='p-5 relative flex flex-col justify-center items-center min-h-screen'>
        <div className='flex justify-center'>
            <img src='/logo.png' className='w-70 aspect-square bg-white rounded-full'  />
        </div>
        <h1 className="flex flex-col gap-2">Si Paling Antek
            <p className='text-slate-500 text-xl'>Japanese Kotoba</p>
        </h1>

        <div className="flex gap-3 text-white justify-center">
            
            {/* HIRAGANA */}
            <div data-div='parent-button-kana' className='flex flex-col gap-4'>
                <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/hiragana'>Hiragana</Link>
                {/* <div data-div='button-kana' className='flex gap-3'>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/hiragana-dakuten'>Dakuten</Link>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/hiragana-handakuten'>Handakuten</Link>
                </div> */}
            </div>

            {/* KATAKANA */}
            <div data-div='parent-button-kana' className='flex flex-col gap-4'>
                <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/katakana'>Katakana</Link>
                {/* <div data-div='button-kana' className='flex gap-3'>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/katakana-dakuten'>Dakuten</Link>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/katakana-handakuten'>Handakuten</Link>
                </div> */}
            </div>
        </div>
        
        {/* N5 Kanji */}
        <div data-div='parent-button-kana' className='flex flex-col gap-4 my-5 relativez'>
            <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all text-white' to='/quiz/kanji/n5-levels'>Kanji Training</Link>
            <div className='flex flex-col gap-3 mt-5'>
                <p>Miscellaneous (Test)</p>
                <div className='flex gap-3'>
                    <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all text-white' to='/quiz/kanji/n5'>N5 Kanji</Link>
                    <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all text-white' to='/quiz/kanji/n5-2'>N5 Kanji 2</Link>
                    <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all text-white' to='/quiz/kanji/n5-3'>N5 Kanji 3</Link>
                </div>
            </div>
        </div>

        {/* Reset Remedy */}
        {/* <div data-div='parent-button-kana' className='flex flex-col gap-4 '>
            <button onClick={resetRemedy} className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all'>Reset Remedy</button>
        </div> */}

        <p className='fixed bottom-5 text-sm'>
            ©2026 Erick Purbaya
        </p>
    </div>
)}

