import { useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { lesson_set } from "./lesson_data/lesson_set";

const LearningPath = () => {
    const [lessonSlides, setLessonSlides] = useState([]);
    const [clickedTile, setClickedTile] = useState({ pathIndex: null, tileIndex: null });

    const CurrentTopic = ({ section, unit, unitTitle }) => (
        <div className="h-[6rem] w-[30vw] bg-sky-900 rounded-3xl m-2 fixed p-3 z-999">
            <div className="flex items-center gap-2">
                <ArrowLeftCircleIcon className="h-[2rem] text-white cursor-pointer" />
                <h1 className="font-bold text-white">Section {section}, Unit {unit}</h1>
            </div>
            <h1 className="font-bold text-white text-[1.5vw] pl-2">{unitTitle}</h1>
        </div>
    );

const Tile = ({ pathIndex, tileIndex, title, slides, icon }) => {
    const isClicked = clickedTile.pathIndex === pathIndex && clickedTile.tileIndex === tileIndex;

    const handleClick = () => {
        setClickedTile({ pathIndex, tileIndex });
    };

    const tileClasses = isClicked 
        ? "w-[20rem] rounded-xl" 
        : `${getTilePosition(tileIndex)} rounded-full`;

    return (
        <div
            className={`TILEELEMENT h-[5rem] w-[5rem] relative cursor-pointer bg-sky-400 flex items-center justify-center ${tileClasses}`}
            onClick={handleClick}
        >
            {isClicked ? (
                <div className="w-full h-full flex justify-around items-center">
                    <h1 className="text-white font-bold text-xl">{title}</h1>
                    <button 
                        className="text-white bg-gray-500 p-2 rounded-full cursor-pointer font-bold"
                        onClick={() => setLessonSlides(slides)}
                    >
                        Start lesson!
                    </button>
                </div>
            ) : icon}
        </div>
    );
};


    const getTilePosition = (index) => {
        switch (index % 8) {
            case 1: return 'left-13';
            case 2: return 'left-25';
            case 3: return 'left-13';
            case 5: return '-left-13';
            case 6: return '-left-25';
            case 7: return '-left-13';
            default: return '';
        }
    };

    const Path = ({ index }) => (
        <div className="flex flex-col items-center w-[50vw]">
            <h1 className="text-white font-bold text-2xl m-2 p-3 rounded-3xl w-full bg-sky-600 text-center">
                {lesson_set[index - 1].title}
            </h1>
            {lesson_set[index - 1].lessons.map((lesson, lessonIndex) => (
                <Tile
                    key={lessonIndex}
                    pathIndex={index}
                    tileIndex={lessonIndex}
                    title={lesson.title}
                    slides={lesson.slides}
                    icon={lesson.icon}
                />
            ))}
        </div>
    );

    return (
        <div className="flex flex-col items-center">
            {lessonSlides.length === 0 && <CurrentTopic section={1} unit={2} unitTitle="Gemüse & Obst" />}
            {lessonSlides.length === 0 && (
                <div className="pt-[8rem]">
                    <Path index={1} />
                    <Path index={2} />
                </div>
            )}

            {lessonSlides.length > 0 && (
                <div>
                    {lessonSlides.map((SlideComponent, index) => (
                        <div key={index}>{SlideComponent}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LearningPath;

