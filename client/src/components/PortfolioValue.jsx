import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'

const PortfolioValue = ({nativeValue, tokens}) => {
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {

    let val = 0;
    for (let i = 0; i < tokens.length; i++) {
      val = val + ((Number(tokens[i].balance) / Number(`1E${tokens[i].decimals}`)) * (tokens[i].value))
    }
    val = val + Number(nativeValue);

    setTotalValue((Number(val.toFixed(2))).toLocaleString('en-US'))

  }, [nativeValue, tokens])
  console.log('native value: ', nativeValue)
  console.log('tokens: ', tokens)
  return (
    <>
      <div className='total-value'>
        <h3>Portfolio Total Balance</h3>
        <h2>
          ${totalValue}
        </h2>
      </div>
    </>
  )
}

export default PortfolioValue