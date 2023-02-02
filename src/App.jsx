import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import './styles/ResidentInfo.css'
import './styles/LocationInfo.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'

function App() {
  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
  }, [numberLocation])

  const handleSubmit = (e) => {
    e.preventDefault()
    setNumberLocation(e.target.inputLocation.value.trim())
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }

  return (
    <div className="App">
      <div className='card__head-front'>
        <h1 className='card__title'>Rick and Morty</h1>
        <form className='card__form' onSubmit={handleSubmit}>
          <input className='card__input' id='inputLocation' type="text" placeholder="Enter a location" />
          <button ><i className='bx bx-search-alt'></i></button>
        </form>
      </div>
      <div >
        {hasError ?
          <h2 className='card__error'>❌ Hey! you must provide an id from 1 to 126 🥺</h2>
          :
          <div >
            <LocationInfo location={location} />
            <div className='card__residents'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </div>
        }
      </div>
      <a href="#"><i class='bx bxs-chevron-up-circle buttton__up'></i></a>
    </div>
  )
}

export default App
