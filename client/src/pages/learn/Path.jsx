import Tile from './Tile';

const Path = ({ index, lesson_set, clickedTile, setClickedTile, setLessonSlides }) => (
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
                clickedTile={clickedTile}
                setClickedTile={setClickedTile}
                setLessonSlides={setLessonSlides}
            />
        ))}
    </div>
);

export default Path;
