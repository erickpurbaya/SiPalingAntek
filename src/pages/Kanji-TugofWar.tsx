export default function MainTugofWar () {
    // const CreatePLayer = () => {

    // }

    return (
        <div>
            <div className="flex items-center justify-center">
                {/* Player A */}
                <div>
                    {/* Player Name */}
                    <p>PLayer A</p>
                    <div>
                        Kanji
                        {/* Options: 2 */}
                        <div 
                            className="
                                flex gap-3 justify-center
                            ">
                            <button 
                                className="
                                    flex-1 
                                "
                            >
                                Option 1
                            </button>
                            <button 
                                className="
                                    flex-1 
                                "
                            >
                                Option 2
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center relative">
                    <div className="flex flex-1 bg-red-400 rounded-md h-1 w-full">
                        Rope
                    </div>
                </div>

                {/* Player B */}
                <div>
                    {/* Player Name */}
                    <p>PLayer B</p>
                    <div>
                        Kanji
                        {/* Options: 2 */}
                        <div 
                            className="
                                flex gap-3 justify-center
                            ">
                            <button 
                                className="
                                    flex-1 
                                "
                            >
                                Option 1
                            </button>
                            <button 
                                className="
                                    flex-1 
                                "
                            >
                                Option 2
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}