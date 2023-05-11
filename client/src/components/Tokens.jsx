import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Loading, Table } from '@web3uikit/core'
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
  console.log(tokens);

  return (
    <>
      <div> <button onClick={getTokenBalances}>ERC20 Tokens</button> <Reload onClick={getTokenBalances}/></div>
      {isLoading ? (
        <div
          style={{
            backgroundColor: '#ECECFE',
            borderRadius: '8px',
            padding: '20px'
          }}
        >
          <Loading
            fontSize={12}
            size={12}
            spinnerColor='#2E7DAF'
            spinnerType='wave'
            text='loading token balance...'
          />
        </div>
      ) : (
        tokens.length > 0 &&
        <Table
          pageSize={6}
          noPagination={true}
          // style={{width: '500px'}}
          columnsConfig='300px 300px 250px 250px'
          data={tokens.map(e => [e.symbol, (Number(e.balance) / Number(`1E${e.decimals}`)), e.value.toFixed(2), ((Number(e.balance) / Number(`1E${e.decimals}`)) * e.value) ])}
          header={[
            <span>Currency</span>,
            <span>Balance</span>,
            <span>Price</span>,
            <span>Value</span>
          ]}
        />
      )}
    </>
  )
}

export default Tokens