import { useState, useCallback, useEffect, useRef } from 'react'
import './App.scss'
import DividerPatternDesktop from './assets/pattern-divider-desktop.svg?react';
import DividerPatternMobile from './assets/pattern-divider-mobile.svg?react';
import Dice from './assets/icon-dice.svg?react';

function App() {

  const [advice, setAdvice] = useState({})
  const [isDiceDisabled, setDiceDisabled] = useState(false);
  const windowWidth = useRef(window.innerWidth);

  const getAdvice = useCallback(async () => {
    try {
      setDiceDisabled(true);
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdvice(data.slip);
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      setTimeout(() => {
        setDiceDisabled(false);        
      }, 2000);
    }
  }, []);

  useEffect(() => {
    getAdvice()
  }, []);

  return (
    <section className="advice-container">
      <small>ADVICE #{advice.id}</small>
      <p>{advice.advice}</p>
      {windowWidth?.current <= 576 ? <DividerPatternMobile /> : <DividerPatternDesktop />}      
      <button className="dice" onClick={() => getAdvice()} disabled={isDiceDisabled}>
        <Dice />
      </button>
    </section>
  )
}

export default App
