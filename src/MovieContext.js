import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let MovieContext = createContext();


export function MovieContextProvider(props) {

    let [moviesList, setMoviesList] = useState([]);
    let [tvList, setTvList] = useState([]);
    let [peopleList, setPeopleList] = useState([]);
    useEffect(() => {
        getData('movie', setMoviesList)
        getData('tv', setTvList)
        getData('person', setPeopleList)
    }, [])

    async function getData(type, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=8613e4e1776af4e8633cc311d67b3e09`)
        callback(data.results.slice(0, 10))
    }
    return <MovieContext.Provider value={{ moviesList, tvList, peopleList }}>

        {props.children}
    </MovieContext.Provider>
}