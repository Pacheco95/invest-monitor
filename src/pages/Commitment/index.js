import React, { useState, useRef } from 'react';
import CurrencyInput from 'react-currency-input';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';

import ptBR from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';

import { aporte, formatCurrency } from '../../utils/finnance-utils'

import moment from 'moment';
import BasicModal from '../../components/BasicModal';

registerLocale('pt-BR', ptBR);

const Commitment = () => {
  const modalRef = useRef();

  const [futureValue, setFutureValue] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [initialCapital, setInitialCapital] = useState(0);
  const [futureDate, setFutureDate] = useState(moment().add(5, 'years').toDate());
  const [firstCommitmentDate, setFirstCommitmentDate] = useState(moment().toDate());

  function handFormSubmit(e) {
    e.preventDefault();

    const startDate = moment(firstCommitmentDate);
    const endDate = moment(futureDate);
    const monthDiff = Math.ceil(Math.abs(endDate.diff(startDate, 'months', true)));

    const ap = aporte(initialCapital, interestRate / 1200, futureValue, monthDiff);

    const text = 'Para você atingir R$ {0} em {1} meses ' +
      'a uma taxa de juros de {2}% ao ano e com um capital inicial de ' +
      'R$ {3} você  deverá aportar mensalmente  o valor de R$ {4}';

    const msg = String.format(
      text,
      formatCurrency(futureValue),
      monthDiff,
      interestRate,
      formatCurrency(initialCapital),
      formatCurrency(ap));

    modalRef.current.show('Aporte mensal', msg);
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

          <label htmlFor='current-capital'>Capital atual</label>
          <CurrencyInput
            decimalSeparator=','
            thousandSeparator='.'
            prefix='R$ '
            id='current-capital'
            value={initialCapital}
            onChangeEvent={(e, m, floatvalue) => setInitialCapital(floatvalue)} />

          <label htmlFor='first-commitment'>Data do primeiro aporte</label>
          <DatePicker
            id='first-commitment'
            className='reactjs-date-picker'
            locale='pt-BR'
            selected={firstCommitmentDate}
            onChange={date => setFirstCommitmentDate(date)}
            dateFormat='dd/MM/yyyy'
          />

          <label htmlFor='future-value'>Data do vencimento</label>
          <DatePicker
            id='future-date'
            className='reactjs-date-picker'
            locale='pt-BR'
            selected={futureDate}
            onChange={date => setFutureDate(date)}
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
            <option value='monthly'>Mensal</option>
            <option value='quarterly'>Trimestral</option>
            <option value='semiannual'>Semestral</option>
            <option value='annually'>Anual</option>
          </select>

          <button id='submit-button' onClick={handFormSubmit}>Calcular</button>
        </form>

        <BasicModal ref={modalRef} />
      </div>
    </>
  );
};

export default Commitment;
