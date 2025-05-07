import React from 'react';

const MatchWords = () => {
    const test = [
        {Q: "Gemuse", A: "vegetable"},
        {Q: "Obst", A: "Fruit"},
        {Q: "Fleisch", A: "meat"},
        {Q: "Milch", A: "milk"},
        {Q: "Brot", A: "bread"},
        {Q: "Käse", A: "cheese"},
        {Q: "Fisch", A: "fish"},
    ];

    const shuffleArray = (array) => {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const shuffledQuestions = shuffleArray(test);
    const shuffledAnswers = shuffleArray(test);

    const ItemElement = (props) => {
        return <li className="p-3 text-3xl text-white bg-sky-800 rounded-4xl text-center cursor-pointer
            hover:bg-sky-950
        ">{props.content}</li>
    }

    const Questions = shuffledQuestions.map((element, index) => {
        return <ItemElement key={index} content={element.Q} />
    });

    const Answers = shuffledAnswers.map((element, index) => {
        return <ItemElement key={index} content={element.A} />
    });

    return (
        <div>
            <h1>Match the Words</h1>
            <div className="flex">
                <ul className="p-3 gap-1 flex flex-col">
                    {Questions}
                </ul>
                <ul className="p-3 gap-1 flex flex-col">
                    {Answers}
                </ul>
            </div>    
        </div>
    );
}

export default MatchWords;
