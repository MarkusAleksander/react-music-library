import React from 'react';
import AlbumList from './components/AlbumList/AlbumList';
import AlbumInput from './components/AlbumInput/AlbumInput';
//import './App.css';
import 'bulma/css/bulma.css';

function App() {
    return (
        <div className="App section">
            <div className="container">
                <AlbumList />
            </div>
            <div className="container">
                <AlbumInput />
            </div>
        </div>
    );
}

export default App;
