import { useState } from "react";

const MatchWords = ({ array }) => {
    const [idsList, setIds] = useState([]);
    const [correctMatches, addCorrectMatch] = useState([]);
    const [clickedWord, setClickedWord] = useState(null);
    const [missMatched, setMissMatched] = useState([]);

    const handleClick = (id, text) => {
        if (text !== clickedWord) {
            setClickedWord(text);
            setIds(prev => {
                if (prev[0] === id && !correctMatches.includes(id)) {
                    console.log('correctMatch');
                    addCorrectMatch(prev => [...prev, id]);
                    return prev;
                }

                if (prev.length !== 2) {
                    return [id];
                }

                return prev;
            });
            if (missMatched.length === 0) {
                setMissMatched([text]);
            } 
            else if (missMatched.length === 1 && !correctMatches.includes(id)) {
                setMissMatched(prev => [...prev, text]);
                console.log('missMatch');
            }
            else if (missMatched.length >= 2) {
                console.log('Resetting missMatched');
                setMissMatched([text]);
            }
        }
    };

    const WordElement = ({ id, word }) => {
        return (
            <li className={`flex items-center justify-center w-[16rem] h-[5rem] m-1 rounded-xl cursor-pointer text-white font-bold
                text-3xl ${clickedWord === word ? 'border-4 border-white' : ''}
                ${correctMatches.includes(id) ? 'bg-green-500' : 'bg-gray-500'}
                ${missMatched.includes(word) && missMatched.length >= 2 ? 'bg-red-600' : null}
                `}
                onClick={() => { handleClick(id, word) }}>
                <h1>{word}</h1>
            </li>
        );
    };

    const displayWords = array.map((item, index) => {
        return (
            <div key={index} className="flex">
                <ul>
                    <WordElement id={item.id} word={item.Q} />
                </ul>
                <ul>
                    <WordElement id={item.id} word={item.A} />
                </ul>
            </div>
        );
    });

    return (
        <>
            {displayWords}
            <h1>{idsList.join(', ')}</h1>
            <h1>MissMatched: {missMatched.join(', ')}</h1>
        </>
    );
};

export default MatchWords;
