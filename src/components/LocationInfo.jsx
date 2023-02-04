import React from 'react'

const LocationInfo = ({ location, selectedLocation }) => {
    return (
        <article className='card__location'>
            <p className='info__location'>Name:<b> {location?.name}</b></p>
            <p className='info__location'>Location: <b>{location?.id}</b></p>
            <span className='info__location'>Type:<b> {location?.type} </b></span>
            <span className='info__location'>Dimension:<b> {location?.dimension}</b></span>
            <span className='info__location'>Population:<b> {location?.residents.length} Hab</b></span>
        </article>)
}

export default LocationInfo