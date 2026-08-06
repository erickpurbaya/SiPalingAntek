export const BackdropBlur = ({
    active = false
}) => {
    return (
        <div 
            className={`fixed w-screen h-screen 
                ${active ? 'backdrop-blur-sm' : 'hidden'} 
                z-50`}>
        </div>
    )
}