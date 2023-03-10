import './App.css'
import './styles/LocationInfo.css'
import './styles/ResidentInfo.css'
import './styles/HasError.css'
import './styles/SearchDimension.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'
import HasError from './components/HasError'
import SearchDimension from './components/SearchDimension'
import SearchCharacter from './components/SearchCharacter'
import ButtonUp from './components/ButtonUp'

function App() {
  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  // const [currentPage, setCurrentPage] = useState()
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [dimensionId, setDimensionId] = useState(null);
  const [searchType, setSearchType] = useState('location')

  const [hasError, setHasError] = useState(false)

  // useEffect(() => {
  //   if (location) {
  //     let pages = Math.ceil((location.residents.length) / 10)
  //     let arr = []
  //     for (let i = 1; i <= pages; i++) {
  //       arr.push(i)
  //     }
  //     setCurrentPage(arr)
  //   }
  // }, [location])


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


  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const clearSelectedUrl = () => {
    setSelectedUrl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearSelectedUrl();
    if (searchType === 'location') {
      if (e.target.inputLocation.value.trim().length === 0) {
        setHasError('err');
      } else if (e.target.inputLocation.value.trim() === '0') {
        setHasError('err');
      } else {
        setHasError(null);
        setNumberLocation(e.target.inputLocation.value.trim());
      }
    } else if (searchType === 'Name-Location') {
      if (dimensionId) {
        setNumberLocation(dimensionId);
      }
    } else if (searchType === 'character') {
      // Aqu?? agregar?? la l??gica para la b??squeda por personaje
      setNumberLocation(0)
    }
  };

  return (
    <div className="App">
      <div className='card__head-front'>
        <h1 className='card__title'>Rick and Morty</h1>
        <form className='card__form' onSubmit={(e) => handleSubmit(e, dimensionId)}>

          <select className='card__select' value={searchType} onChange={handleSearchTypeChange}>
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
              // selectedLocation={selectedLocation}

              />
            ) : (
              <input className='card__input' id='inputLocation' type="text" placeholder='Enter a location' />
            )
          )}

          <button ><i className='bx bx-search-alt'></i></button>
        </form>

      </div>
      <div>
        <div>
          {hasError ?
            <HasError />
            :
            <div className='container__location'>
              <LocationInfo
                location={location}
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
        <ButtonUp show={!hasError} />
      </div>
    </div>
  )
}

export default App


{/* <div className='container__button-pages'>
        {currentPage ? currentPage.map(page => {
          return <div key={page}>
            <button className='button__pages'>{page}</button>
          </div>
        }) : null}
      </div> */}