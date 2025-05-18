import { useState, useMemo } from "react";

const MatchWords = ({ array }) => {
    const [clickedIds, addId] = useState([]);
    const [clickedWord, setClickedWord] = useState(null);
    const [isQorA, setQorA] = useState(null);
    const [correctMatches, addCorrectMatch] = useState([]);
    const [missMatched, addMissMatched] = useState([]);

    const { questions, answers } = useMemo(() => {
        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        const questions = [];
        const answers = [];
        
        array.forEach(item => {
            questions.push({ id: item.id, title: item.Q });
            answers.push({ id: item.id, title: item.A });
        });

        return {
            questions: shuffleArray(questions),
            answers: shuffleArray(answers)
        };
    }, [array]);

    const handleClick = (id, word, QorA) => {
        if (clickedWord !== word && !correctMatches.includes(id)) {
            setQorA(QorA)
            setClickedWord(word);
            if (clickedIds.length < 2 || isQorA == QorA) {
                addId([id]);
            }
            if (clickedIds[0] === id && isQorA != QorA) {
                addCorrectMatch(prev => [...prev, id]);
                addId([]);
                setClickedWord(null);
            } else if (clickedIds.length === 1 && isQorA != QorA) {
                addMissMatched(prev => [...prev, clickedWord, word]);
                setClickedWord(null);
                addId([]);
                const lastTwoWords = [clickedWord, word];
                setTimeout(() => {
                    addMissMatched(prev => prev.filter(item => !lastTwoWords.includes(item)));
                }, 1500);
            }
        }
    };

    const WordElement = ({ id, word, QorA }) => {
        return (
            <li className={`flex items-center justify-center w-[16rem] h-[5rem] m-1 rounded-xl text-white font-bold
                text-3xl select-none
                ${clickedWord === word ? 'border-2 border-white' : ''}
                ${missMatched.includes(word) && missMatched.length >= 2 && !correctMatches.includes(id) ? 
                    'bg-red-900' : ''}
                ${correctMatches.includes(id) ? `bg-green-700` : 'cursor-pointer bg-gray-900'}
                `}
                onClick={() => { handleClick(id, word, QorA) }}>
                <h1 className={clickedWord === word ? 'scale-110' : 'scale-100'}>
                    {word}
                </h1>
            </li>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex gap-5">
                <ul className="flex flex-col items-center">
                    <img className="h-[4rem] w-[7rem] m-3" src="german_flag.png"></img>
                    {questions.map((question, index) => (
                        <WordElement 
                            id={question.id} 
                            key={index} 
                            word={question.title} 
                            QorA={'Q'} 
                        />
                    ))}
                </ul>
                <ul className="flex flex-col items-center">
                    <img className="h-[4rem] w-[7rem] m-3" src="usa_flag.jpg"></img>
                    {answers.map((answer, index) => (
                        <WordElement 
                            id={answer.id} 
                            key={index} 
                            word={answer.title} 
                            QorA={'A'} 
                        />
                    ))}
                </ul>
            </div>
            <h1 className="text-2xl text-white font-bold">{correctMatches.length} / {array.length}</h1>
        </div>
    );
};

export default MatchWords;