import './App.css'
// import axios from 'axios'
import { useState } from 'react'
import WalletInputs from './components/WalletInputs'
import NativeTokens from './components/NativeTokens'
import Tokens from './components/Tokens'

function App() {
  const [wallet, setWallet] = useState('')
  const [chain, setChain] = useState('0x1')
  const [nativeBalance, setNativeBalance] = useState(0)
  const [nativeValue, setNativeValue] = useState(0)
  const [tokens, setTokens] = useState([]);
  // async function backendCall() {
  //   const response = await axios.get('http://localhost:8080');
  //   console.log(response);
  // }
  console.log(wallet)
  console.log(chain)

  return (
    <div className='App'>
      {/* <button onClick={backendCall}>fetch hello</button> */}
      <WalletInputs
        wallet={wallet}
        chain={chain}
        setWallet={setWallet}
        setChain={setChain}
      />
      <NativeTokens
        wallet={wallet}
        chain={chain}
        nativeBalance={nativeBalance}
        nativeValue={nativeValue}
        setNativeBalance={setNativeBalance}
        setNativeValue={setNativeValue}
      />
      <Tokens
        wallet={wallet}
        chain={chain}
        tokens={tokens}
        setTokens={setTokens}
      />
    </div>
  )
}

export default App
