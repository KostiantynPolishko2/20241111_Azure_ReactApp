import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { OpenAI } from "openai";

const getNameAsteroid = (e: React.FormEvent<HTMLInputElement>): string | null => {
  e.preventDefault();
  
  if(e.currentTarget.value.length > 3){
    return e.currentTarget.value;
  }

  return null
}

function App() {

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [nameAsteroid, setNameAsteroid] = useState<string | null>(null);

  useEffect(() => {
    console.log('asterod', nameAsteroid);
  }, [nameAsteroid]);

  const generateImageUrl = async () => {
    console.log('call function: generateImageUrl()');
    const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_KEY, dangerouslyAllowBrowser: true});
  
    try{
      const responce = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `asteroid ${nameAsteroid || ''}`,
        n: 1
      }); 

      setImageUrl(responce.data[0].url?.toString() || null);
    }
    catch(error){
     
      setImageUrl(null);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageUrl || logo} className="App-logo" alt="logo" />
        <p>
          asteroid {nameAsteroid || ''}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input onBlur={(e) => {setNameAsteroid(getNameAsteroid(e))}} placeholder='asteroid name'></input>
        <button onClick={generateImageUrl}>ImageUrl</button>
      </header>
    </div>
  );
}

export default App;
