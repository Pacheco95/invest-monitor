import React, { useState, useEffect } from 'react';
import './style.css';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const [operation, setOperation] = useState('');

  useEffect(() => {
    switch (operation) {
      case 'revenue':
        history.push(`/calculate/revenue`);
        break;
      case 'commitment':
        history.push(`/calculate/commitment`);
        break;
      default: 
        break;
    }
  }, [history, operation]);

  return (
    <>
      <header>
        <h1>O que você deseja fazer?</h1>
      </header>
      <ul className='calc-opts'>
        <li onClick={() => setOperation('revenue')}>Calcular meu rendimento</li>
        <li onClick={() => setOperation('commitment')}>Calcular meu aporte mensal</li>
      </ul>
    </>
  );
}

export default Home;
