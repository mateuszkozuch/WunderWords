import { useState, useEffect, useRef } from "react";
import Tile from "./Tile";
import { lesson_set } from "./lesson_data/lesson_set";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import LessonSlides from "./LessonSlides";

const LearningPath = () => {
    const [lessonSlides, setLessonSlides] = useState([]);
    const [clickedTile, setClickedTile] = useState({ pathIndex: null, tileIndex: null });
    const [currentUnitTitle, setCurrentUnitTitle] = useState();

    const currentTopicRef = useRef(null);
    const pathRefs = useRef([]);

    useEffect(() => {
        pathRefs.current = pathRefs.current.slice(0, lesson_set.length);
    }, []);

    useEffect(() => {
        const handleScrollOrMouseMove = () => {
            if (!currentTopicRef.current) return;

            const currentTopicRect = currentTopicRef.current.getBoundingClientRect();
            let overlappedTitle = null;

            pathRefs.current.forEach((pathEl, i) => {
                if (pathEl) {
                    const pathRect = pathEl.getBoundingClientRect();
                    const verticalOverlap = !(currentTopicRect.bottom < pathRect.top || currentTopicRect.top > pathRect.bottom);
                    const horizontalOverlap = !(currentTopicRect.right < pathRect.left || currentTopicRect.left > pathRect.right);

                    if (verticalOverlap && horizontalOverlap) {
                        overlappedTitle = lesson_set[i].title;
                    }
                }
            });

            setCurrentUnitTitle(overlappedTitle || lesson_set[0].title);
        };

        window.addEventListener("scroll", handleScrollOrMouseMove);
        window.addEventListener("mousemove", handleScrollOrMouseMove);

        return () => {
            window.removeEventListener("scroll", handleScrollOrMouseMove);
            window.removeEventListener("mousemove", handleScrollOrMouseMove);
        };
    }, []);

    const CurrentTopic = ({ section, unit, unitTitle }) => (
        <div ref={currentTopicRef} className="h-[6rem] w-[30vw] bg-sky-900 rounded-3xl m-2 fixed p-3 z-999">
            <div className="flex items-center gap-2">
                <ArrowLeftCircleIcon className="h-[2rem] text-white cursor-pointer" />
                <h1 className="font-bold text-white">Section {section}, Unit {unit}</h1>
            </div>
            <h1 className="font-bold text-white text-[1.5vw] pl-2">{unitTitle}</h1>
        </div>
    );

    const Path = ({ index }) => (
        <div ref={(el) => (pathRefs.current[index] = el)} className="w-full flex flex-col items-center">
            <h1 className="text-white font-bold text-2xl m-4 p-1 rounded-xl w-full text-center bg-gray-950 cursor-pointer">
                {lesson_set[index].title}
            </h1>
            {lesson_set[index].lessons.map((lesson, lessonIndex) => (
                <Tile
                    key={lessonIndex}
                    pathIndex={index + 1}
                    tileIndex={lessonIndex}
                    title={lesson.title}
                    slides={lesson.slides}
                    icon={lesson.icon}
                    clickedTile={clickedTile}
                    setClickedTile={setClickedTile}
                    setLessonSlides={setLessonSlides}
                />
            ))}
        </div>
    );

    return (
        <>
            {lessonSlides.length === 0 && <CurrentTopic section={1} unit={2} unitTitle={currentUnitTitle} />}
            {lessonSlides.length === 0 && (
                <div className="pt-[8rem] flex flex-col items-center w-full">
                    {lesson_set.map((_, idx) => (
                        <Path key={idx} index={idx} />
                    ))}
                </div>
            )}
            {lessonSlides.length > 0 && <LessonSlides
                
                slide={
                    lessonSlides.map((SlideComponent, index) => (
                        <div key={index}>{SlideComponent}</div>
                    ))
                }
            />}
        </>
    );
};

export default LearningPath;
