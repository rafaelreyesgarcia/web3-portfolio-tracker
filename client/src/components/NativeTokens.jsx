import React, { useState} from 'react'
import axios from 'axios'
import { Table, Loading } from '@web3uikit/core'
import { Reload } from '@web3uikit/icons'

const NativeTokens = ({
  wallet,
  chain,
  nativeBalance,
  nativeValue,
  setNativeBalance,
  setNativeValue,
}) => {

  const [native, setNative] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  async function getNativeBalance() {

    setIsLoading(true)

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
    const native = chain === '0x1' ? 'ETH': 'MATIC'
    setNative(native)
    setIsLoading(false)
  }
  // console.log(nativeBalance)
  return (
    <>
      <div className='tab-heading'>
        <button onClick={getNativeBalance}>Native Balance</button> <Reload onClick={getNativeBalance}/>
      </div>
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
            text='loading native balance...'
          />
        </div>
      ) : (
        nativeBalance > 0 && nativeValue > 0 && wallet.length === 42 &&
        <Table
          pageSize={1}
          noPagination={true}
          // style={{width: '900px'}}
          columnsConfig='100px 200px 200px'
          data={[[native, nativeBalance, nativeValue]]}
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

export default NativeTokens

{/* <h2>Native</h2>
<p>
  <button onClick={getNativeBalance}>fetch balance</button>
  <br />
  <span>
    {Number(chain) === 0x89 ? 'MATIC' : 'ETH'}: {nativeBalance.toFixed(2)} - (${nativeValue.toFixed(2)})
  </span>
</p> */}