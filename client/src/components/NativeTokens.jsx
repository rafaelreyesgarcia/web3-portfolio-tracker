import React from 'react'
import axios from 'axios'

const NativeTokens = ({
  wallet,
  chain,
  nativeBalance,
  nativeValue,
  setNativeBalance,
  setNativeValue
}) => {

  async function getNativeBalance() {

    const response = await axios.get('http://localhost:8080/nativeBalance', {
      params: {
        address: wallet,
        chain: chain,
      }
    });

    // console.log(response)

    if (response.data.nativeBalance && response.data.usdPrice ) {
      setNativeBalance(Number(response.data.nativeBalance))
      setNativeValue(Number(response.data.nativeBalance) * Number(response.data.usdPrice))
    }

  }
  // console.log(nativeBalance)
  return (
    <>
      <h2>Native</h2>
      <p>
        <button onClick={getNativeBalance}>fetch balance</button>
        <br />
        <span>
          {Number(chain) === 0x89 ? 'MATIC' : 'ETH'}: {nativeBalance.toFixed(2)} - (${nativeValue.toFixed(2)})
        </span>
      </p>
    </>
  )
}

export default NativeTokens