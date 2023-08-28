import React from 'react'


const moviesResp = await fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=f39cfec1279850f323e6ac1c60aa5dc4&language=es-ES'
);

const Api = () => {
  return (
    <div>Api</div>
  )
}

export default Api