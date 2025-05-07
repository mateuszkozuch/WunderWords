import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid"
import LearningPath from "./LearningPath"
import LearnQuiz from './LearnQuiz'

const Learn = () => {
    const CurrentTopic = (props) => {
        return(
            <div className="h-[6rem] w-[30vw] bg-sky-900 rounded-3xl m-2 fixed p-3 z-999">
                <div className="flex items-center gap-2">
                    <ArrowLeftCircleIcon className="h-[2rem] text-white cursor-pointer" />
                    <h1 className="font-bold text-white">Section {props.section}, Unit {props.unit}</h1>
                </div>                
                <h1 className="font-bold text-white text-[1.5vw] pl-2">{props.unitTitle}</h1>
            </div>
        )
    }



    return(
        <div className="flex flex-col items-center">
            <CurrentTopic section={1} unit={2} unitTitle="Gemüse & Obst"/>
            <LearningPath />
            {/* <LearnQuiz /> */}
        </div>
    )
}

export default Learn;