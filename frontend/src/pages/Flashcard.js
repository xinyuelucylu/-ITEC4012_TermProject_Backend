import React, { useState } from 'react';

const Flashcard = ({ vocabularyItems }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const nextWord = () => {
        if (currentCardIndex < (vocabularyItems?.length || 0) - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        } else {
            // Handle completion
        }
    };

    return (
        <div className="flashcard" style={{padding:"150px"}}>
            {vocabularyItems && vocabularyItems.length > 0 ? (
                <>
                    <p>{vocabularyItems[currentCardIndex].english_word}</p>
                    <details>
                        <summary>Reveal Answer</summary>
                        <p>{vocabularyItems[currentCardIndex].french_translation}</p>
                    </details>
                    <br />
                    <button onClick={nextWord}>Next</button>
                </>
            ) : (
                <p>No vocabulary items available.</p>
            )}
        </div>
    );
};
export default Flashcard;