import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import './styles/ResidentInfo.css'
import './styles/LocationInfo.css'
import './styles/HasError.css'
import './styles/SearchDimension.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'
import HasError from './components/HasError'
import SearchDimension from './components/SearchDimension'
import SearchCharacter from './components/SearchCharacter'

function App() {
  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError, setHasError] = useState(false)

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [dimensionId, setDimensionId] = useState(null);
  const [searchType, setSearchType] = useState('location');
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const clearSelectedUrl = () => {
    setSelectedUrl(null);
  };

  // // Para obtener la localizacion del Residente
  // let link = selectedLocation
  // const number = link?.match(/\d+/) * 1;
  // console.log(selectedLocation)
  console.log(location)

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
    e.preventDefault();
    clearSelectedUrl();
    if (searchType === 'location') {
      if (e.target.inputLocation.value.trim().length === 0) {
        setNumberLocation();
      } else {
        setNumberLocation(e.target.inputLocation.value.trim());
      }
    } else if (searchType === 'Name-Location') {
      if (dimensionId) {
        setNumberLocation(dimensionId);
      }
    } else if (searchType === 'character') {
      // Aquí agregaré la lógica para la búsqueda por personaje
    }
  };


  return (
    <div className="App">
      <div className='card__head-front'>
        <h1 className='card__title'>Rick and Morty</h1>
        <form className='card__form' onSubmit={(e) => handleSubmit(e, dimensionId)}>

          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="location">Location</option>
            <option value="Name-Location">Name Location</option>
            <option value="character">Character</option>
            <option value="episode">Episode</option>
          </select>


          {searchType === 'Name-Location' ? (
            <SearchDimension
              dimensionId={dimensionId}
              setDimensionId={setDimensionId}
            />
          ) : (
            searchType === 'character' ? (
              <SearchCharacter
                setSelectedUrl={setSelectedUrl}
                setSelectedLocation={setSelectedLocation}
              />
            ) : (
              <input className='card__input' id='inputLocation' type="text" placeholder='Enter a location' />
            )
          )}


          <button ><i className='bx bx-search-alt'></i></button>
        </form>


      </div>
      <div >
        {hasError ?
          <HasError />
          :
          <div className='container__location'>
            <LocationInfo
              location={location}
              selectedLocation={selectedLocation}
            />
            <div className="card__residents">
              {selectedUrl ? (
                <ResidentInfo key={selectedUrl} url={selectedUrl} />
              ) : (
                location?.residents?.map(url => (
                  <ResidentInfo key={url} url={url} />
                ))
              )}
            </div>
          </div>
        }
      </div>

      <a href="#"><i className='bx bxs-chevron-up-circle buttton__up'></i></a>

    </div>

  )
}

export default App
