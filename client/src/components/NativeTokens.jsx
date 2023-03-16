import React, { useState } from 'react'
import axios from 'axios'
import { Table } from '@web3uikit/core'
import { Reload } from '@web3uikit/icons'

const NativeTokens = ({
  wallet,
  chain,
  nativeBalance,
  nativeValue,
  setNativeBalance,
  setNativeValue
}) => {

  const [native, setNative] = useState(null)
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
    const native = chain === '0x1' ? 'ETH': 'MATIC'
    setNative(native)

  }
  // console.log(nativeBalance)
  return (
    <>
      <div className='tab-heading'>
        Native Balance <Reload onClick={getNativeBalance}/>
      </div>
      {nativeBalance > 0 && nativeValue > 0 &&

        <Table
          pageSize={1}
          noPagination={true}
          style={{width: '900px'}}
          columnsConfig='300px 300px 250px'
          data={[[`${native}`, nativeBalance, `$${nativeValue}`]]}
          header={[
            <span>Currency</span>,
            <span>Balance</span>,
            <span>Value</span>
          ]}
        />
      } 
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