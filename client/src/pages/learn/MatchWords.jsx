import React, { useState, useEffect } from 'react';

const MatchWords = () => {
    const pairs = [
        { Q: "Gemuse", A: "vegetable" },
        { Q: "Obst", A: "Fruit" },
        { Q: "Fleisch", A: "meat" },
        { Q: "Milch", A: "milk" },
        { Q: "Brot", A: "bread" },
    ];

    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const [questions, setQuestions] = useState(() => shuffleArray(pairs));
    const [answers, setAnswers] = useState(() => shuffleArray(pairs));

    // State for current selections
    const [selectedQIndex, setSelectedQIndex] = useState(null);
    const [selectedAIndex, setSelectedAIndex] = useState(null);

    // Store matched pairs as arrays of indices: [{qIndex, aIndex}]
    const [matchedPairs, setMatchedPairs] = useState([]);

    // Handle selecting a question
    const onSelectQuestion = (index) => {
        if (matchedPairs.find(pair => pair.qIndex === index)) return; // already matched
        setSelectedQIndex(index === selectedQIndex ? null : index);
    };

    // Handle selecting an answer
    const onSelectAnswer = (index) => {
        if (matchedPairs.find(pair => pair.aIndex === index)) return; // already matched
        setSelectedAIndex(index === selectedAIndex ? null : index);
    };

    // Effect to check for match when both selected
    useEffect(() => {
        if (selectedQIndex !== null && selectedAIndex !== null) {
            const qItem = questions[selectedQIndex];
            const aItem = answers[selectedAIndex];
            if (qItem.Q === aItem.Q && qItem.A === aItem.A) {
                // Correct match - add to matched pairs
                setMatchedPairs(prev => [...prev, { qIndex: selectedQIndex, aIndex: selectedAIndex }]);
            }
            // Reset selections after short delay to allow user to see highlight
            const timeout = setTimeout(() => {
                setSelectedQIndex(null);
                setSelectedAIndex(null);
            }, 700);
            return () => clearTimeout(timeout);
        }
    }, [selectedQIndex, selectedAIndex, questions, answers]);

    // Check if a question or answer index is matched
    const isQMatched = (index) => matchedPairs.some(pair => pair.qIndex === index);
    const isAMatched = (index) => matchedPairs.some(pair => pair.aIndex === index);

    return (
        <div className="max-w-xl mx-auto p-4 bg-gradient-to-br from-sky-700 to-sky-900 rounded-3xl shadow-lg text-white select-none">
            <h1 className="text-4xl font-extrabold mb-6 text-center">Connect the Correct Words</h1>
            <div className="flex justify-between">
                {/* Questions Column */}
                <ul className="flex flex-col gap-3 w-1/2">
                    {questions.map((item, index) => {
                        const isSelected = selectedQIndex === index;
                        const matched = isQMatched(index);
                        return (
                            <li
                                key={item.Q}
                                onClick={() => onSelectQuestion(index)}
                                className={
                                    `p-4 rounded-3xl text-center cursor-pointer text-2xl font-semibold
                                     transition-colors duration-300
                                     ${matched ? 'bg-green-700 pointer-events-none' : ''}
                                     ${!matched && isSelected ? 'bg-sky-500' : 'bg-sky-800 hover:bg-sky-600'}`
                                }
                            >
                                {item.Q}
                            </li>
                        );
                    })}
                </ul>

                {/* Answers Column */}
                <ul className="flex flex-col gap-3 w-1/2">
                    {answers.map((item, index) => {
                        const isSelected = selectedAIndex === index;
                        const matched = isAMatched(index);
                        return (
                            <li
                                key={item.A}
                                onClick={() => onSelectAnswer(index)}
                                className={
                                    `p-4 rounded-3xl text-center cursor-pointer text-2xl font-semibold
                                     transition-colors duration-300
                                     ${matched ? 'bg-green-700 pointer-events-none' : ''}
                                     ${!matched && isSelected ? 'bg-sky-500' : 'bg-sky-800 hover:bg-sky-600'}`
                                }
                            >
                                {item.A}
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* Show matched pairs count */}
            <div className="mt-6 text-center text-xl font-semibold">
                Matched: {matchedPairs.length} / {pairs.length}
            </div>
        </div>
    );
};

export default MatchWords;

