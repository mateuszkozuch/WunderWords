import React, { useState, useEffect } from 'react';

const Memory = () => {
    const words = [
        { id: 1, content: "Gemuse" },
        { id: 2, content: "Obst" },
        { id: 3, content: "Fleisch" },
        { id: 4, content: "Milch" },
        { id: 5, content: "Brot" },
        { id: 6, content: "Käse" },
        { id: 7, content: "Fisch" },
    ];

    // Create pairs and shuffle
    const createShuffledDeck = () => {
        const pairedWords = [...words, ...words].map(item => ({ ...item, uniqueId: Math.random() }));
        for (let i = pairedWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairedWords[i], pairedWords[j]] = [pairedWords[j], pairedWords[i]];
        }
        return pairedWords;
    };

    const [deck, setDeck] = useState(createShuffledDeck());
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedIds, setMatchedIds] = useState([]);
    const [disableAll, setDisableAll] = useState(false);

    // Handle card click
    const handleCardClick = (index) => {
        if (disableAll) return;
        if (flippedCards.length === 0) {
            setFlippedCards([index]);
        } else if (flippedCards.length === 1) {
            if (flippedCards[0] === index) return; // prevent clicking same card twice
            setFlippedCards([flippedCards[0], index]);
            setDisableAll(true);
        }
    };

    // Check for match
    useEffect(() => {
        if (flippedCards.length === 2) {
            const firstCard = deck[flippedCards[0]];
            const secondCard = deck[flippedCards[1]];
            if (firstCard.id === secondCard.id) {
                setMatchedIds(prev => [...prev, firstCard.uniqueId, secondCard.uniqueId]);
            }
            // Flip cards back after short delay
            const timeout = setTimeout(() => {
                setFlippedCards([]);
                setDisableAll(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [flippedCards, deck]);

    // Card element
    const Card = ({ card, index }) => {
        const isFlipped = flippedCards.includes(index) || matchedIds.includes(card.uniqueId);
        return (
            <div 
                className={`w-20 h-28 m-2 rounded-2xl cursor-pointer flex items-center justify-center text-xl font-bold text-white select-none 
                    ${
                        isFlipped 
                        ? 'bg-sky-800' 
                        : 'bg-sky-950 hover:bg-sky-700'
                    }`}
                onClick={() => handleCardClick(index)}
                aria-label={isFlipped ? card.content : "Hidden card"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === "Enter" || e.key === " ") handleCardClick(index); }}
            >
                {isFlipped ? card.content : ""}
            </div>
        );
    };

    return (
        <div className="max-w-xl mx-auto mt-6 p-4 bg-gradient-to-br from-sky-700 to-sky-900 rounded-3xl shadow-lg select-none">
            <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Match the Words - Memory Game</h1>
            <div className="flex flex-wrap justify-center">
                {deck.map((card, index) => (
                    <Card key={card.uniqueId} card={card} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Memory;
