import React, { useState } from 'react'
import axios from 'axios'
import { Loading, Table } from '@web3uikit/core'
import { Reload } from '@web3uikit/icons'

const TransferHistory = ({chain, wallet, transfers, setTransfers}) => {
  const [isLoading, setIsLoading] = useState(false);

  async function getTokenTransfers() {
    setIsLoading(true)
    const response = await axios.get('http://localhost:8080/tokenTransfers', {
      params: {
        address: wallet,
        chain: chain
      }
    })

    if (response.data) {
      setTransfers(response.data);
    }
    setIsLoading(false)
  }

  console.log('transfers: ', transfers);
  return (
    <>
      <div className='tab-heading'><button onClick={getTokenTransfers}>Transfer History</button> <Reload onClick={getTokenTransfers}/></div>
      <div>
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
              text='loading transfer history...'
            />
          </div>
        ) : (
          transfers.length > 0 &&
          <Table
            pageSize={8}
            noPagination={false}
            style={{width: '90vw'}}
            columnsConfig='16vw 18vw 18vw 18vw 16vw'
            data={transfers.map((e) => [
              e.symbol,
              (Number(e.value) / Number(`1e${e.decimals}`)).toFixed(3),
              `${e.from_address.slice(0, 4)}...${e.from_address.slice(38)}`,
              `${e.to_address.slice(0, 4)}...${e.to_address.slice(38)}`,
              e.block_timestamp.slice(0, 10)
            ])}
            header={[
              <span>Token</span>,
              <span>Amount</span>,
              <span>From</span>,
              <span>To</span>,
              <span>Date</span>
            ]}
          />
        )}
      </div>
    </>
  )
}

export default TransferHistory