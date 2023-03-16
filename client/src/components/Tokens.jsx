import React, { useState } from 'react'
import axios from 'axios'
import { Table } from '@web3uikit/core'
import { Reload } from '@web3uikit/icons'

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
      <div>ERC20 Tokens <Reload onClick={getTokenBalances}/></div>
      {tokens.length > 0 && (
        <Table
          pageSize={6}
          noPagination={true}
          style={{width: '900px'}}
          columnsConfig='300px 300px 250px'
          data={tokens.map(e => [e.symbol, e.balance, `$${e.value}`])}
          header={[
            <span>Currency</span>,
            <span>Balance</span>,
            <span>Value</span>
          ]}
        />
      )}
    </>
  )
}

export default Tokens