import React, { useEffect } from 'react'
import $ from 'jquery'
export default function About() {

  useEffect( ()=>{
    $(".test").hide(5000)
  },[] )
  return (
    <div className='test'>About</div>
  )
}
