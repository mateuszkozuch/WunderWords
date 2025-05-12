const Tile = ({ pathIndex, tileIndex, title, slides, icon, clickedTile, setClickedTile, setLessonSlides }) => {
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

export default Tile;
