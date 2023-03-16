import React from 'react'
import { useState, useEffect } from 'react'

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
      <h2>portfolio total value</h2>
      <p>
        <span>Total Balance: ${totalValue}</span>
      </p>
    </>
  )
}

export default PortfolioValue