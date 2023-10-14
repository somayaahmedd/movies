import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  let { id } = useParams();
  let [movie, setMovie] = useState(null)
  console.log(id);

  useEffect(() => {

    getMovieDetails(id)
  }, [])

  async function getMovieDetails(movieId) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US`)
    console.log(data);
    setMovie(data)
  }
  return (
    <>

      {movie !== null ? <div className='row'>

        <div className='col-md-4'>
          <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} className='w-100 border p-2' alt="" />
        </div>
        <div className='col-md-8 py-5'>

          <h3>
            {movie.title}
          </h3>

          <p className='text-muted'>{movie.tagline}</p>
          {movie.genres.map((el) => <span className='btn btn-info btn-sm mx-3'>{el.name}</span>)}
          <p className=' my-3'>Vote: {movie.vote_average}</p>
          <p className=' my-3'>Vote Count :{movie.vote_count}</p>
          <p className=''>budget : {movie.budget}</p>
          <p className=''>release date :{movie.release_date}</p>
          <p className='text-muted my-3'> {movie.overview}</p>
        </div>
      </div> : ""}
    </>

  )
}
