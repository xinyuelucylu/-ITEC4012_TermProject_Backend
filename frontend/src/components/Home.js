import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{padding:"150px"}}>
            <h1>English-French Vocabulary</h1>
            <p>
                Welcome to English-French Vocabulary, a website for you to learn French words!
                Here are the lessons:
            </p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item "><Link to="/Animals" class="btn btn-primary">Lesson 1: Animals</Link></li>
                <li class="list-group-item"><Link to="/Colors" class="btn btn-primary">Lesson 2: Colors</Link></li>
            </ul>
        </div>
    );
};

export default Home;