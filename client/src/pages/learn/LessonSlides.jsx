

const LessonSlides = ({slide}) => {
    return(
        <div className="h-screen flex flex-col items-center">
            <div className="w-full h-[4rem] bg-amber-500">
                90%!!!
            </div>
            <div className="flex flex-col justify-center h-full">
                {slide}
            </div>
        </div>
    )
}

export default LessonSlides;