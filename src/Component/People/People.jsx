import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';

import $ from 'jquery'
import { ShareDataContext } from './../../ShareData';
export default function People() {


  let { categoryType } = useContext(ShareDataContext)
  let [moviesList, setMoviesList] = useState([]);
  let [currentPage, setPage] = useState(1);
  let pageNumbers = new Array(10).fill("x").map((el, i) => i + 1)
  console.log(pageNumbers);
  useEffect(() => {
    getData();
    $(".test").hide(5000)


  }, [])

  useEffect(() => {
    getData(1, categoryType)
  }, [categoryType])
  async function getData(pageNum = 1, type = "popular") {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=${pageNum}`)
    setMoviesList(data.results)
  }

  function changePageNumber(page) {
    console.log(page);
    setPage(page)
    getData(page, categoryType)
  }


  async function search(e) {
    let value = e.target.value;
    if (value != '') {
      let { data } = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${value}&page=1&include_adult=false`)
      setMoviesList(data.results)
    } else {
      getData()
    }

  }
  return (
    <>

      {/* 
<div className='test bg-info'>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A inventore deleniti, ratione ut dolorem accusantium quaerat porro, molestiae sed et quis sapiente atque corporis! Praesentium reiciendis ea eveniet a qui?</p>
</div> */}


     
      <input type="text" onChange={search} className='form-control bg-transparent text-white w-75 mx-auto my-4 ' placeholder='Search.....' />
      <div className='row g-3'>



        <div className='col-md-12'>
          <div className='row'>

            {moviesList.map((movie, i) => <div key={i} className='col-md-2'>


              <Link to={'/moviedetails/' + movie.id}>
                <div className='item'>
                
                  <img src={'https://api.themoviedb.org/3/person/'+movie.id+'/images'} className='w-100' alt="" />
                  <h3 className='h6'>{movie.name}</h3>
                </div>
              </Link>
            </div>)}
          </div>
        </div>




      </div>

      <nav aria-label="..." className='d-flex  justify-content-center '>
        <ul className="pagination pagination-sm">


          {pageNumbers.map((el) => <li key={el} className="page-item" onClick={() => changePageNumber(el)}><a className="page-link" >{el}</a></li>)}


        </ul>
      </nav>
    </>

  )
}