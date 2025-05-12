import { useState } from "react";
import CurrentTopic from "./CurrentTopic";
import Path from "./Path";
import { lesson_set } from "./lesson_data/lesson_set";

const LearningPath = () => {
    const [lessonSlides, setLessonSlides] = useState([]);
    const [clickedTile, setClickedTile] = useState({ pathIndex: null, tileIndex: null });

    return (
        <div className="flex flex-col items-center">
            {lessonSlides.length === 0 && <CurrentTopic section={1} unit={2} unitTitle="Testing. Testing." />}
            {lessonSlides.length === 0 && (
                <div className="pt-[8rem]">
                    <Path
                        index={1}
                        lesson_set={lesson_set}
                        clickedTile={clickedTile}
                        setClickedTile={setClickedTile}
                        setLessonSlides={setLessonSlides}
                    />
                    <Path
                        index={2}
                        lesson_set={lesson_set}
                        clickedTile={clickedTile}
                        setClickedTile={setClickedTile}
                        setLessonSlides={setLessonSlides}
                    />
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
