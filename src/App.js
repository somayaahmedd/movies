import logo from './logo.svg';
import './App.css';


import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import MasterLayout from './Component/MasterLayout/MasterLayout';
import NotFound from './Component/NotFound/NotFound';
import Home from './Component/Home/Home';
import About from './Component/About/About';
import Movies from './Component/Movies/Movies';
import People from './Component/People/People';
import TV from './Component/TV/TV';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import MovieDetails from './Component/MovieDetails/MovieDetails';
import { MovieContextProvider } from './MovieContext';
import { ShareDataContextProvider } from './ShareData';
function App() {

  let [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      saveUserData()
    }
  }, [])



  function saveUserData() {
    // token
    let token = localStorage.getItem("token")
    // decode
    console.log(token);
    let data = jwt_decode(token)
    console.log(data);
    // setuser
    setUser(data)
  }


  function ProtecteRouter(props) {
    console.log(props);
    if (localStorage.getItem("token") == null) {
      // login
      return <Navigate to='/login' />
    }
    else {
      return props.children
    }
  }


  function logOut() {

    localStorage.removeItem("token")
    setUser(null)
    return <Navigate to='/login' />
  }
  let Routes = createBrowserRouter([
    {
      path: '/', element: <MasterLayout user={user} logOut={logOut} />,
      children: [

        { path: "/", element: <ProtecteRouter> <Home /></ProtecteRouter> },
        { path: "home", element: <ProtecteRouter><Home /></ProtecteRouter> },
        { path: "about", element: <ProtecteRouter><About /></ProtecteRouter> },
        { path: "movies", element: <ProtecteRouter><Movies /></ProtecteRouter> },
        { path: "moviedetails/:id", element: <ProtecteRouter><MovieDetails /></ProtecteRouter> },
        { path: "people", element: <ProtecteRouter>  <People /></ProtecteRouter> },
        { path: "tv", element: <ProtecteRouter> <TV /></ProtecteRouter> },
        { path: "login", element: <Login saveUser={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  return (
    <ShareDataContextProvider>
      <MovieContextProvider>
        <RouterProvider router={Routes} />
      </MovieContextProvider>
    </ShareDataContextProvider>



  );
}

export default App;
