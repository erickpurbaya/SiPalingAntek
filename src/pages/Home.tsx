import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='p-5 relative'>
        <h1 className="flex flex-col gap-4">Selamat Datang!
            <p className='text-slate-500 text-lg'>Silahkan pilih mode latihan.</p>
        </h1>

        <div className="flex gap-3 text-white justify-center">
            
            {/* HIRAGANA */}
            <div data-div='parent-button-kana' className='flex flex-col gap-4'>
                <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/hiragana'>Hiragana</Link>
                <div data-div='button-kana' className='flex gap-3'>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/hiragana-dakuten'>Dakuten</Link>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/hiragana-handakuten'>Handakuten</Link>
                </div>
            </div>

            {/* KATAKANA */}
            <div data-div='parent-button-kana' className='flex flex-col gap-4'>
                <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/katakana'>Katakana</Link>
                <div data-div='button-kana' className='flex gap-3'>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/katakana-dakuten'>Dakuten</Link>
                    <Link data-div='button-kana-variation' className='bg-slate-800 rounded-lg font-bold px-5 flex-1 text-auto py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/katakana-handakuten'>Handakuten</Link>
                </div>
            </div>
        </div>
    </div>
)}

