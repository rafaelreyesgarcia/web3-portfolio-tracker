import React, { useState } from 'react'
import axios from 'axios'

const Tokens = ({wallet, chain, tokens, setTokens}) => {
  const [isLoading, setIsLoading] = useState(false);

  async function getTokenBalances() {
    setIsLoading(true);
    const response = await axios.get('http://localhost:8080/tokenBalances', {
      params: {
        address: wallet,
        chain: chain,
      }
    })

    if(response.data) {
      let t = response.data;
      console.log('axios response:', t);

      // for (let i = 0; i < t.length; i++) {
      //   t[i].balance = (Number(t[i].nativePrice.value)) / (Number(`1E${t[i].nativePrice.decimals}`)).toFixed(3); //1E18
      //   t[i].totalValue = t[i].balance * Number(t[i].usdPrice.toFixed(2))
      // }

      setTokens(t);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div>
        <span>ERC-20 Tokens</span>
        <button onClick={getTokenBalances}>Get Tokens</button>
        <br />
        <table>
          <tbody>
            <tr>
              <th>NAME</th>
              <th>SYMBOL</th>
              <th>BALANCE</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
            {isLoading ?
              <>
                <div>loading...</div>
              </> : (
              tokens.length > 0 && tokens.map((token) => {
                return (
                  <>
                    <tr key={token.name}>
                      <td>{token.name}</td>
                      <td>{token.symbol}</td>
                      <td>{(Number(token.balance) / Number(`1E${token.decimals}`)).toLocaleString('en-US')}</td>
                      <td>{(token.value).toFixed(2)}</td>
                      <td>{Number(((Number(token.balance) / Number(`1E${token.decimals}`)) * (token.value)).toFixed(2)).toLocaleString('en-US')}</td>
                    </tr>
                  </>
                )})
              )}
          </tbody>
        </table>
        
      </div>
    </>
  )
}

export default Tokens