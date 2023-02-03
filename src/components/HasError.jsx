import React from 'react'

const HasError = () => {
    return (
        <div className='container__error'>
            <h2 className='card__error'>❌ Hey! you must provide an id from 1 to 126 🥺</h2>
            <img className='card__img-error' src='/src/assets/crying.gif' alt='RickyandMortyCrying' />
        </div>
    )
}

export default HasError