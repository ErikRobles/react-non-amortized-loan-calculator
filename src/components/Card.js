import React, { useState } from 'react';
import LoadImg from '../img/loading.gif';

const Card = () => {
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredInterest, setEnteredInterest] = useState('');
  const [enteredYears, setEnteredYears] = useState('');
  const [monthlyPay, setMonthlyPay] = useState('');
  const [totalPay, setTotalPay] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [error, setError] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    // console.log('I was Clicked.');
    const principle = parseFloat(enteredAmount);
    const calculatedInterest = parseFloat(enteredInterest) / 100 / 12;
    const calculatedPayments = parseFloat(enteredYears) * 12;
    // Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    // const monthly = (principle * x * calculatedInterest) / (x - 1);
    const monthly =
      (principle * Math.round(x * 100)) / 100 / calculatedPayments;
    if (isFinite(monthly)) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
      }, 2000);
      setMonthlyPay(monthly.toFixed(2));
      setTotalPay((monthly * calculatedPayments).toFixed(2));
      setTotalInterest((monthly * calculatedPayments - principle).toFixed(2));
      setTimeout(() => {
        setShowResult(true);
      }, 2000);
    } else {
      showError('Please check your numbers');
      // console.log('Please Check your numbers');
    }
  };

  // Show Error
  const showError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  return (
    <div className='card card-body text-center mt-5'>
      {error && <p className='alert alert-danger'>Please Check your Numbers</p>}
      <h1 className='heading display-5 pb-3'>Loan Calculator</h1>
      <form id='loan-form'>
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>$</span>
            </div>
            <input
              type='number'
              className='form-control'
              name='amount'
              id='amount'
              placeholder='Loan Amount'
              onChange={(e) => setEnteredAmount(e.target.value)}
            />
          </div>
        </div>
        <div className='form-group mt-2'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>%</span>
            </div>
            <input
              type='number'
              className='form-control'
              name='interest'
              id='interest'
              placeholder='Interest'
              onChange={(e) => setEnteredInterest(e.target.value)}
            />
          </div>
        </div>
        <div className='form-group mt-2'>
          <input
            type='number'
            className='form-control'
            name='years'
            id='years'
            placeholder='Years To Repay'
            onChange={(e) => setEnteredYears(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Calculate'
            className='btn btn-dark w-100 mt-2'
            onClick={handleCalculate}
          />
        </div>
      </form>
      {/* Loader here */}

      {showLoading && (
        <div className='loading'>
          <img src={LoadImg} alt='' />
        </div>
      )}

      {/* Results Here */}
      {showResult && (
        <div className='results'>
          <h5 className='mt-2'>Results</h5>
          <div className='form-group mt-2'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>Monthly Payment</span>
              </div>
              <input
                type='number'
                className='form-control'
                name='monthly-payment'
                id='monthly-payment'
                disabled
                value={monthlyPay}
              />
            </div>
          </div>

          <div className='form-group mt-2'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>Total Payment</span>
              </div>
              <input
                type='number'
                className='form-control'
                name='total-payment'
                id='total-payment'
                disabled
                value={totalPay}
              />
            </div>
          </div>
          <div className='form-group mt-2'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>Total Interest</span>
              </div>
              <input
                type='number'
                className='form-control'
                name='total-interest'
                id='total-interest'
                disabled
                value={totalInterest}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
