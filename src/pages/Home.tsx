import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
        <h1 className="">Selamat Datang!</h1>
        <h2>Silahkan pilih mode latihan.</h2>
        <div className="flex gap-3 text-white justify-center">
            <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/hiragana'>Hiragana</Link>
            <Link className='bg-slate-800 rounded-lg font-bold px-5 py-3 hover:bg-slate-700 duration-100 transition-all' to='/quiz/katakana'>Katakana</Link>
        </div>
    </div>
)}

