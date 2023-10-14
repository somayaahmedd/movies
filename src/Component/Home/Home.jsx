
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import avater from "../../image/images.png"
import { MovieContext } from './../../MovieContext';
export default function Home() {


  let { moviesList, tvList, peopleList }= useContext(MovieContext)
  return (
    <>

      <div className='row g-3 align-items-center'>

        <div className='col-md-4 '>
          <div className='brder w-25'></div>
          <h2 className='my-3'>

            Tranding <br />Movies<br /> To Watch Now
          </h2>
          <div className='brder'></div>
        </div>
        {moviesList.map((movie, i) => <div key={i} className='col-md-2'>


          <Link to={'/moviedetails/' + movie.id}>
            <div className='item'>

              <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} className='w-100' alt="" />
              <h3 className='h6'>{movie.title}</h3>
            </div>
          </Link>
        </div>)}



      </div>
      <div className='row g-3 align-items-center'>

        <div className='col-md-4 '>
          <div className='brder w-25'></div>
          <h2 className='my-3'>

            Tranding <br />Tv<br /> To Watch Now
          </h2>
          <div className='brder'></div>
        </div>
        {tvList.map((tv, i) => <div key={i} className='col-md-2'>
          <div className='item'>

            <img src={'https://image.tmdb.org/t/p/w500' + tv.poster_path} className='w-100' alt="" />
            <h3 className='h6'>{tv.name}</h3>
          </div>
        </div>)}



      </div>

      <div className='row g-3 align-items-center'>

        <div className='col-md-4 '>
          <div className='brder w-25'></div>
          <h2 className='my-3'>

            Tranding <br />People<br /> To Watch Now
          </h2>
          <div className='brder'></div>
        </div>
        {peopleList.map((person, i) => <div key={i} className='col-md-2'>
          <div className='item'>


            {person.profile_path != null ? <img src={'https://image.tmdb.org/t/p/w500' + person.profile_path} className='w-100' alt="" /> : <img src={avater} className='w-100' alt="" />}


            <h3 className='h6'>{person.name}</h3>
          </div>
        </div>)}



      </div>
    </>


  )
}
