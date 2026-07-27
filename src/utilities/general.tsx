import { Link } from "react-router-dom";

export function CapitalizeFirstWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const PopUpResult = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center hidden">
      {/* Blurred dark background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Popup */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-2xl flex flex-col gap-3">
        <h2 className="mb-10 text-2xl font-bold text-center">
          Results
        </h2>

        {/* <div className="space-y-3">
          <div className="rounded-lg bg-gray-100 p-3">
            水 - You answered: みち
          </div>

          <div className="rounded-lg bg-gray-100 p-3">
            火 - You answered: き
          </div>

          <div className="rounded-lg bg-gray-100 p-3">
            山 - You answered: やま
          </div>
        </div> */}

        <div
          className="w-full flex justify-between gap-3  "  
        >
          <div
            className="bg-red-500/50 w-full h-30 p-4 shadow-xl flex flex-col justify-center inset-shadow-red-500/30 border rounded-sm shadow-red-500/40"
          >
            <p
              className="font-semibold text-xl text-white my-4"
            >Correct</p>
            <p
              className="flex-1 flex items-center justify-center"
            >
              Total: 
            </p>
            {/* Correct */}
          </div>
          <div
            className="bg-green-500/50 w-full h-30 p-4 shadow-xl flex flex-col justify-center inset-shadow-green-500/30 border rounded-sm shadow-green-500/40"
          >
            <p
              className="font-semibold text-xl text-white my-4"
            >Incorrect</p>
            <p
              className="flex-1 flex items-center justify-center"
            >
              Total: 
            </p>
            {/* Incorrect */}
          </div>
        </div>

        <Link
          to={'/'}
          className="mt-5 w-full rounded-lg bg-slate-700 p-3 text-white transition hover:bg-blue-700"
        >
          Continue
        </Link>
      </div>
    </div>
  )

}

export const storageNames = {
  learn: 'learnKanji'
};