import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';

import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

const moment = require('moment');

registerLocale('pt-BR', ptBR);

const Commitment = () => {
  const [futureValue, setFutureValue] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [futureDate, setFutureDate] = useState(moment.now());
  const [firstCommitmentDate, setFirstCommitmentDate] = useState(moment().add(5, 'y').toDate());

  function handFormSubmit(e) {
    e.preventDefault();
    console.log(futureValue, interestRate)
  }

  return (
    <>
      <header>
        <h1>Cálculo de aporte mensal</h1>
      </header>
      <div id='commit-form-container'>
        <form className='commit-form'>
          <label htmlFor='future-value'>Valor futuro desejado</label>
          <CurrencyInput
            decimalSeparator=','
            thousandSeparator='.'
            prefix='R$ '
            id='future-value'
            value={futureValue}
            onChangeEvent={(e, m, floatvalue) => setFutureValue(floatvalue)} />

          <label htmlFor='future-value'>Data do vencimento</label>
          <DatePicker
            id='future-value'
            className='reactjs-date-picker'
            locale='pt-BR'
            selected={futureDate}
            onChange={date => setFutureDate(date)}
            dateFormat='dd/MM/yyyy'
          />

          <label htmlFor='first-commitment'>Data do primeiro aporte</label>
          <DatePicker
            id='first-commitment'
            className='reactjs-date-picker'
            locale='pt-BR'
            selected={firstCommitmentDate}
            onChange={date => setFirstCommitmentDate(date)}
            dateFormat='dd/MM/yyyy'
          />

          <label htmlFor='interest-rate'>Taxa de juros ao ano (%)</label>
          <CurrencyInput
            decimalSeparator=','
            thousandSeparator='.'
            id='interest-rate'
            value={interestRate}
            onChangeEvent={(e, m, floatvalue) => setInterestRate(floatvalue)} />

          <label htmlFor='pmt-freq'>Frequência dos aportes</label>
          <select name='select' id='pmt-freq' defaultValue='monthly' required>
            <option value='daily'>Diária</option>
            <option value='weekly'>Semanal</option>
            <option value='monthly'>Mensal</option>
            <option value='quarterly'>Trimestral</option>
            <option value='semiannual'>Semestral</option>
            <option value='anually'>Anual</option>
          </select>

          <button id='submit-button' onClick={handFormSubmit}>Calcular</button>
        </form>
      </div>
    </>
  );
}

export default Commitment;
