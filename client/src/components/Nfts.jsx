import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const Nfts = ({chain, wallet, nfts, setNfts, filteredNfts, setFilteredNfts}) => {

  const [nameFilter, setNameFilter] = useState('')
  const [idFilter, setIdFilter] = useState('')

  async function getUserNfts() {
    const response = await axios.get('http://localhost:8080/nftBalance', {
      params: {
        address: wallet,
        chain: chain,
      }
    })
    if (response.data.result) {
      nftProcessing(response.data.result)
    }
  }

  function nftProcessing(t) {
    for (let i = 0; i < t.length; i++) {
      let meta = JSON.parse(t[i].metadata);
      if (meta && meta.image) {
        // console.log(i, meta.image)j
        if (meta.image.startsWith('ipfs://')) {
          t[i].image = 'https://ipfs.io/ipfs/' + meta.image.slice(7);
        } else if (meta.image.startsWith('https://ipfs.infura.io/ipfs/')) {
          t[i].image = 'https://ipfs.io/ipfs/' + meta.image.slice(28)
        } else if (meta.image.startsWith('https://roji.mypinata.cloud/ipfs/')) {
          t[i].image = 'https://ipfs.io/ipfs/' + meta.image.slice(33)
        }
        else {
          t[i].image = meta.image;
        }
      }
    }

    // https://ipfs.io/ipfs/

    setNfts(t);
    setFilteredNfts(t)
  }

  useEffect(() => {
    console.log('name filter: ', nameFilter)
    if (idFilter.length === 0 && nameFilter.length === 0) {
      return setFilteredNfts(nfts);
    }
    let filNfts = [];

    // console.log(nfts)

    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].name && nfts[i].name.toLowerCase().includes(nameFilter) && idFilter.length === 0) {
        filNfts.push(nfts[i])
      }
      else if (nfts[i].token_id.includes(idFilter) && nameFilter.length === 0) {
        filNfts.push(nfts[i])
      }
      else if (nfts[i].name && nfts[i].name.toLowerCase().includes(nameFilter) && nfts[i].token_id.includes(idFilter)) {
        filNfts.push(nfts[i])
      }
    }

    console.log('fil: ', filNfts);

    // for (let i = 0; i < nfts.length; i++) {
    //   else if (
    //     nfts[i].token_id.includes(idFilter) &&
    //     nfts[i].name.includes(nameFilter)
    //   ) {
    //     filNfts.push(nfts[i])
    //   }
    // }

    setFilteredNfts(filNfts)
  }, [nameFilter, idFilter])

  return (
    <>
      <h2>NFTs</h2>
      <div>
        <button onClick={getUserNfts}>Fetch NFTs</button>
        <span>name filter</span>
        <input
          onChange={(e) => setNameFilter(e.target.value)}
          value={nameFilter}
        />

        <span>Id filter</span>
        <input
          onChange={(e) => setIdFilter(e.target.value)}
          value={idFilter}
        />
        <br />
        {filteredNfts.length > 0 &&
          filteredNfts.map((e, i) => {
            return (
              <div>
                <span>{i}</span>
                {!e.image && <span>NO IMAGE</span>}
                {e.image && <img src={e.image} width={200} />}
                <span>Name: {e.name}</span>
                <span>ID - {e.token_id}</span>
                <br />
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Nfts