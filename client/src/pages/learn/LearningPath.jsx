import { setOfLessons } from "./lessons_data/SetOfLessons";


const LearningPath = () => {
    // test purpose
    const currentSection = 1;
    const currentUnit = 1;

    const Tile = (props) => {
        return(
            <div className={`h-[5rem] w-[5rem] rounded-full bg-gray-600
                relative cursor-pointer
                ${props.index % 8 == 1 ? 'left-15 bottom-2' : null}
                ${props.index % 8 == 2 ? 'left-25' : null}
                ${props.index % 8 == 3 ? 'left-15 top-2' : null}
                ${props.index % 8 == 5 ? '-left-15 bottom-1.5' : null}
                ${props.index % 8 == 6 ? '-left-25' : null}
                ${props.index % 8 == 7 ? '-left-13' : null}
            `} onClick={() => {console.log("hello")}}
            >
                {props.content}
            </div>
        )
    }
    const topics2 = [
        "hello",
        "hello",
        "hello",
        "hello",
        "hello",
        "hello",
        "hello",
        "hello",
        "hello",
    ]
    const Items = () => {
        return(
            <div className="flex flex-col items-center w-[50vw]">
                <h1 className="text-white font-bold text-2xl m-2 p-3 rounded-3xl
                bg-sky-600 text-center">{setOfLessons[currentSection - 1].sourceFile.title}</h1>
                {
                topics2.map((topic, index) => {
                return <Tile key={index} index={index} content={topic}/>
                })
                }
            </div>
        )
    }


    return(
        <div className="pt-[8rem] bg-amber-400">
            <Items></Items>
            <Items></Items>
        </div>
    )
}

export default LearningPath;