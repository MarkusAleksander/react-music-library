import React from 'react';
import AlbumList from './components/AlbumList/AlbumList';
import AlbumInput from './components/AlbumInput/AlbumInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <AlbumList />
      <AlbumInput />
    </div>
  );
}

export default App;
