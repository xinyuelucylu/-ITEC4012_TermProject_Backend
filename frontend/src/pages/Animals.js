import React, { useState, useEffect } from 'react';

const Animals = () => {
    const [vocabularyItems, setVocabularyItems] = useState([]);
    const [userVocabularyWords, setUserVocabularyWords] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/animals/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setVocabularyItems(data.vocabulary_items);
                setUserVocabularyWords(data.user_vocabulary_words);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(isAuthenticated);
    }, []);

    const handleAddToVocab = async (model_name, wordId) => {
        const token = localStorage.getItem('token');

        console.log(`Adding word to vocabulary: model_name=${model_name}, wordId=${wordId}`);
        const response = await fetch(`http://127.0.0.1:8000/api/add_to_vocab/${model_name}/${wordId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });
        console.log('Response Body:', await response.text());

        if (response.ok) {
            // Refresh the data after adding to vocabulary
            const updatedResponse = await fetch('http://127.0.0.1:8000/api/${model_name}/');
            const updatedData = await updatedResponse.json();
            setVocabularyItems(updatedData.vocabulary_items);
            setUserVocabularyWords(updatedData.user_vocabulary_words);
        }else {
            console.error('Failed to add word to vocabulary:', response.statusText);
        }
    };

    return (
        <div style={{padding:"150px"}}>
            <h1>Animals</h1>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">English</th>
                    <th scope="col">French</th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                {vocabularyItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.english_word}</td>
                        <td>{item.french_translation}</td>
                        <td>
                            {isAuthenticated ? (
                                userVocabularyWords.includes(item.id) ? (
                                    <span style={{ color: 'red' }}>Added</span>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleAddToVocab('animals', item.id)}
                                    >
                                        Add
                                    </button>
                                )
                            ) : null}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default Animals;
