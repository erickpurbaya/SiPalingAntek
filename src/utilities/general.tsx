import { Link } from "react-router-dom";
import { useState, useEffect, useRef, type RefObject } from "react";
import { addLeaderboardScore } from "./data-leaderboard";

export type Player = {
  name: string,
  score: number
}

export type Leaderboard = {
  id: number,
  name: string,
  score: number,
  created_at?: string, // timestamp.Excample: 2026-08-19T03:22:15.123Z
}

const zIndexes = {
  timesup: 10
}

export function scrollToComp(
  component: RefObject<HTMLDivElement | null>
) {
    component.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

export function SortLeaderboard(item: Leaderboard[]){
  return item.sort((a, b) => b.score - a.score);
} 

export function CapitalizeFirstWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function ThousandSeparator(value: number): string {
  return value.toLocaleString("en-US");
}


const ButtonPopup = (
  { caption, onClick, animateTrigger = true, disabled = true} 
  : { caption: string, onClick: Function, animateTrigger?: boolean, disabled?: boolean }) => (
  <button
    className={`
      rounded-sm
      px-10
      py-2
      mt-5
      border
      border-gray-500
      cursor-pointer
      text-xl
      font-bold
      text-white
      hover:-translate-y-1
      hover:shadow-lg
      hover:shadow-green-400/30
      duration-500
      transition-all
      disabled:scale-95
      disabled:bg-gray-500
      disabled:translate-y-0
      disabled:shadow-none
      disabled:cursor-not-allowed
      ${
        // AnimateScore: 4. Show leaderboard (show retry button)
        // isShowLeaderboard ? 'animate-rise' : 'opacity-0'
        animateTrigger ? 'animate-rise' : 'opacity-0'
      }
    `}
    disabled={disabled}
    onClick={() => onClick()}
  >
    {caption}
  </button>
)

export const PopupTimesUp = ({
    open,
    title,
    player,
    playerSetter,
    playerLeaderboard,
    levelResetter,
    submitLoading
  }: {
    open: boolean;
    title: string;
    player: Player;
    playerSetter: Function;
    playerLeaderboard: Leaderboard[];
    levelResetter: Function;
    submitLoading?: boolean;
  }) => {
    const animSeq = {
      popup_sink: -1,
      backdrop_sink: -2,
      init: 0,
      backdrop: 1,
      popup: 2,
      expand: 3,
      showLeaderboard: 4,
      scrollToPost: 4.1,
      postScore: 5,
    };

    const countUpTime = 1000;
    const sinkTime = 1000;
    const [visible, setVisible] = useState(false);
    const [appearAnim, setAppearAnim] = useState(animSeq.init);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const userScoreRow = useRef<HTMLDivElement>(null);

    const isShowBackdrop = appearAnim > animSeq.backdrop;
    const isShowPopup = appearAnim > animSeq.backdrop;
    const isExpanding = appearAnim > animSeq.popup;
    const isShowLeaderboard = appearAnim > animSeq.expand;
    const isScrollToScore = appearAnim > animSeq.showLeaderboard;
    const isPostScore = appearAnim > animSeq.scrollToPost;

    // console.log("Popup:", {
    //   open,
    //   visible,
    //   appearAnim,
    // });

    useEffect(() => {
      let timer1: ReturnType<typeof setTimeout>;

      if (submitLoading) {
        timer1 = setTimeout(() => {
          setLoadingCreate(!loadingCreate)
        }, sinkTime)
      }

      return () => {
        clearTimeout(timer1);
      }
    }, [submitLoading])

    useEffect(() => {
      console.log('triggered')
      let timer1: ReturnType<typeof setTimeout>;
      let timer2: ReturnType<typeof setTimeout>;
      let timer3: ReturnType<typeof setTimeout>;
      let timer4: ReturnType<typeof setTimeout>;
      let timer41: ReturnType<typeof setTimeout>;
      let timer5: ReturnType<typeof setTimeout>;

      if (open) {
        // Make sure popup exists
        setVisible(true);

        // Backdrop appears
        timer1 = setTimeout(() => {
          setAppearAnim(animSeq.backdrop);
        }, 100);

        // Popup appears
        timer2 = setTimeout(() => {
          setAppearAnim(animSeq.popup);
        }, 200);

        timer3 = setTimeout(() => {
          setAppearAnim(animSeq.expand);
        }, countUpTime + 250);
        
        timer4 = setTimeout(() => {
          setAppearAnim(animSeq.showLeaderboard);
        }, countUpTime + 250 + 250 );

        timer41 = setTimeout(() => {
          setAppearAnim(animSeq.showLeaderboard);
        }, countUpTime + 500 + 250 );

        timer5 = setTimeout(() => {
          setAppearAnim(animSeq.postScore);
        }, countUpTime * 4 );
      }

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
      };
    }, [open]);

    useEffect(() => {
      if (isScrollToScore) {
        scrollToComp(userScoreRow);
      }
    }, [appearAnim])

    useEffect(() => {
      if (!open && visible) {
        // Start closing animation immediately
        setAppearAnim(animSeq.popup_sink);

        const timer1 = setTimeout(() => {
          setAppearAnim(animSeq.backdrop_sink);
        }, 200);

        const timer2 = setTimeout(() => {
          setVisible(false);
          setAppearAnim(animSeq.init);
        }, 300);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }, [open, visible]);


    return (
      <div
        style={{
          zIndex: zIndexes.timesup,
          position: "fixed",
          display: !visible ? 'none' : undefined,
        }}
        className={`
          w-screen
          h-screen
          flex
          items-center
          justify-center
          left-0
          text-3xl
          text-black
          duration-300
          transition-all
          ${
            // AnimateScore: 1. Blur the background
            appearAnim > animSeq.init ||
            appearAnim === animSeq.popup_sink
              ? "backdrop-blur-xs"
              : "backdrop-blur-none"
          }
        `}
      >
        <div
          className={`
            flex
            flex-col
            bg-slate-800
            text-white
            rounded-md
            p-10
            w-100
            max-h-300
            duration-500
            transition-all
            overflow-hidden
            ${
              // AnimateScore: 2. Show the board
              isShowPopup
                ? "animate-rise"
                : appearAnim < animSeq.init
                  ? "animate-sink-disappear"
                  : "opacity-0"
            }

            ${
              // AnimateScore: 3. Expand the score board for leaderboard
              isExpanding
                ? "h-150"
                : "h-50"
            }
          `}
        >
          <p className="font-bold text-xl">
            {title}
          </p>

          <div className="w-full items-center justify-center flex flex-col my-3">
            <p className="font-semibold text-xl">
              Your Score
            </p>

            {
              isShowBackdrop &&
              <div>
                <p className={`
                    ${ isShowPopup ? 'animate-rise' : 'animate-none' }
                    text-4xl font-bold`
                  }
                >
                  <CountUp
                    target={player.score}
                    duration={countUpTime}
                  />
                </p>
                
                <input 
                  type="text"
                  name="username"
                  placeholder="Nama"
                  autoComplete="off"
                  maxLength={15}
                  value={player.name}
                  onChange={(e) => {
                    playerSetter((prev: Player) => ({ ...prev, name: e.target.value}))
                  }}
                  className={`
                    w-60
                    py-1
                    px-3
                    my-1
                    bg-white
                    text-black
                    text-sm
                    rounded-sm  
                    ${ isExpanding ? 'animate-rise' : 'opacity-0'}
                    ${ submitLoading ? 'animate-sink-disappear' : 'animate-rise' }
                  `}
                />
              </div>
            }
          </div>
         
          {/* Score Board */}
          {
            playerLeaderboard.length > 0 &&
              <div className={`
                  ${
                    // AnimateScore: 3. Expand the score board for leaderboard
                    isExpanding ? 'flex-1' : 'hidden'
                  } 
                  ${
                    // AnimateScore: 4. Show leaderboard
                    isShowLeaderboard ? 'animate-rise' : 'opacity-0'
                  }
                  flex flex-col gap-2 w-full overflow-y-auto overflow-x-hidden scrollbar-none my-3`}
                >
                {
                  playerLeaderboard.map(({ id, name, score }, number) => {
                    if (score < player.score) return

                    return (
                      <div key={`score-${id}`} 
                        className={`
                                                  
                          flex gap-3 text-sm w-full justify-between items-center px-5 py-2 border border-gray-400
                        `}
                      >
                        <p>{number+1}.</p>
                        <p>{name}</p>
                        <p className="text-right flex-1">
                          {
                            // AnimateScore: 4. Show leaderboard (count scores)
                            isShowLeaderboard &&
                              <CountUp
                                target={score}
                                duration={2000}
                              />
                          }
                        </p>
                      </div>
                    )}
                  )
                }
                
                <div key={`score-x`} 
                  ref={userScoreRow}
                  className={`
                    ${isPostScore ? 'scale-110' : 'scale-0'}   
                    flex gap-3 text-sm w-full justify-between items-center px-5 py-2 border border-gray-400 duration-300 transition-all
                  `}
                >
                  <p>99.</p>
                  <p>{player.name}</p>
                  <p className="text-right flex-1">
                    {
                      // AnimateScore: 4. Show leaderboard (count scores)
                      isShowLeaderboard &&
                        <CountUp
                          target={player.score}
                          duration={2000}
                        />
                    }
                  </p>
                </div>

                {
                  playerLeaderboard.map(({ id, name, score }, number) => {
                    if (score > player.score) return

                    return (
                      <div key={`score-${id}`} 
                        className={`
                          ${isPostScore ? 'translate-y-0' : '-translate-y-12'}   
                          flex gap-3 text-sm w-full justify-between items-center px-5 py-2 border border-gray-400 duration-300 transition-all
                        `}
                      >
                        <p>{number+1}.</p>
                        <p>{name}</p>
                        <p className="text-right flex-1">
                          {
                            // AnimateScore: 4. Show leaderboard (count scores)
                            isShowLeaderboard &&
                              <CountUp
                                target={score}
                                duration={2000}
                              />
                          }
                        </p>
                      </div>
                    )}
                  )
                }
              </div>
          }

          <div className="flex justify-between">
            <ButtonPopup 
              caption="Retry?"
              onClick={levelResetter}
              disabled={false}
              animateTrigger={isShowLeaderboard}
            /> 
            <ButtonPopup 
              caption="Submit"
              onClick={() => addLeaderboardScore({...player})}
              disabled={player.name.length < 2}
              animateTrigger={isShowLeaderboard}
            /> 
          </div>
        </div>
      </div>
    );
  };
  
  export function CountUp({ target, duration = 3000 }: {target: number, duration: number}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;

        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        // Ease-out animation
        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(Math.floor(eased * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(animate);
    }, [target, duration]);

    return <span>{count.toLocaleString()}</span>;
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