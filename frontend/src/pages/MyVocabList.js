import React, { useState, useEffect } from 'react';
import { getMyVocabList } from '../services/apiService';

const MyVocabList = () => {
    const [myVocabList, setMyVocabList] = useState([]);

    useEffect(() => {
        // Fetch user's vocab list when the component mounts
        const fetchData = async () => {
            try {
                const response = await getMyVocabList();
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMyVocabList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '150px' }}>
            <h1>My Vocab List</h1>
            <ul>
                {myVocabList.map((item) => (
                    <li key={item.id}>{item.word}</li>
                ))}
            </ul>
        </div>
    );
};

export default MyVocabList;