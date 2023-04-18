import { useEffect, useState } from 'react'
import Alert from './components/Alert'
import Artworks from './components/Artworks'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Loading from './components/Loading'
import { getEtheriumContract, isWallectConnected, loadNfts } from './Diasosi'
import { useGlobalState } from './store'

const App = () => {
  const [nfts] = useGlobalState('nfts')
  const [loaded, setLoaded] = useState(false)
  useEffect(async () => {
    await loadNfts()

    const loadData = async () => {
      console.log('Blockchain loaded')
      setLoaded(true);
      const result = await isWallectConnected()
      await getEtheriumContract()
      await loadNfts()
      console.log("nfts", nfts)
    };
    loadData();

  }, [])
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks artworks={nfts} />
      <Footer />
      <Alert />
      <Loading />
    </div>
  )
}

export default App
