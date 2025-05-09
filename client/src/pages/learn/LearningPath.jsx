import { useState } from "react";
import { setOfLessons } from "./lessons_data/SetOfLessons";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid"

const LearningPath = () => {
    // test purpose
    const currentSection = 1;
    const currentUnit = 1;

    const [clickedTile, setClickedTile] = useState(null);

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
    const TilePopup = (props) => {
        return(
            <div className="fixed h-[8rem] w-[16rem] bg-yellow-300 z-999 rounded-2xl">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-xl pl-4">{props.title}</h1>
                    <XMarkIcon onClick={() => {setClickedTile(null)}} className="w-[3rem]"/>
                </div>
                <h2 className="text-center">Something, something, something...</h2>
            </div>
        )
    }
    const Tile = (props) => {
        return(
            <>
            <div className={`h-[5rem] w-[5rem] rounded-full
                relative cursor-pointer
                ${props.index % 8 == 1 ? 'left-15 bottom-2' : null}
                ${props.index % 8 == 2 ? 'left-25' : null}
                ${props.index % 8 == 3 ? 'left-15 top-2' : null}
                ${props.index % 8 == 5 ? '-left-15 bottom-1.5' : null}
                ${props.index % 8 == 6 ? '-left-25' : null}
                ${props.index % 8 == 7 ? '-left-13' : null}
                ${clickedTile == props.index ? "bg-green-300" : "bg-sky-600"}
            `} onClick={() => {setClickedTile(props.index)}}
            >
                {props.content}
            </div>
            {   clickedTile != null &&
                <TilePopup
                    title={props.content}
                />
            }
            </>
        )
    }


    const Items = () => {
        return(
            <div className="flex flex-col items-center w-[50vw]">
                <h1 className="text-white font-bold text-2xl m-2 p-3 rounded-3xl w-full
                bg-sky-600 text-center">
                    {setOfLessons[currentSection - 1].sourceFile.title}
                </h1>
                {
                setOfLessons.map((lesson, index) => {
                return <Tile key={index} index={index} content={lesson.sourceFile.title}/>
                })
                }
            </div>
        )
    }


    return(
        <div className="flex flex-col items-center">
            <CurrentTopic section={1} unit={2} unitTitle="Gemüse & Obst"/>
            <div className="pt-[8rem]">
                <Items></Items>
                <Items></Items>
            </div>
        </div>
    )
}

export default LearningPath;