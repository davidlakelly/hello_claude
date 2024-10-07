import { useState } from 'react'
import Hero from './Hero'
import Chat from './Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import ChatResponse from './ChatResponse';

function App() {
  const [apiData, setApiData] = useState('')
  const clickHandler = (userQuestion: string) => {
    getData(userQuestion);
  };

   async function getData(data: string) {
    console.log('Getting data')
    const url = import.meta.env.VITE_APP_URL + '/chat'
    setApiData('Loading...')
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: data }) // Replace with actual data
    })
      .then(response => response.json())
      .then(data => setApiData(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }

  return (
    <>
      <div className='container'>
        <Hero />
        <Chat onSendMessage={clickHandler} />
        <ChatResponse result={apiData} />
      </div>
    </>
  )
}

export default App
