import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Animals from './pages/Animals';
import Colors from './pages/Colors';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from "./components/Nav";
import Flashcard from "./pages/Flashcard";
import {logout} from "./services/apiService";
import MyVocabList from "./pages/MyVocabList";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
            username: localStorage.getItem('username') || '',
        };
    }

    handleLoginSuccess = (username) => {
        console.log('Received username:', username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        this.setState({ isAuthenticated: true, username });
    };
    handleLogout = () => {
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('username');
        logout().then(() => {
            this.setState({ isAuthenticated: false, username: '' }, () => {
                // Reload the page after the state is updated
                window.location.reload();
            });
        });
    };

    render(){
  return (
      <Router>
          <NavBar isAuthenticated={this.state.isAuthenticated} username={this.state.username} onLogout={this.handleLogout} />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Animals" element={<Animals />} />
              <Route path="/Colors" element={<Colors />} />
              <Route path="/Login" element={<Login onLoginSuccess={this.handleLoginSuccess} />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Flashcard" element={<Flashcard />} />
              <Route path="/MyVocabList" element={<MyVocabList />} />
          </Routes>
      </Router>
  );}
}

export default App;