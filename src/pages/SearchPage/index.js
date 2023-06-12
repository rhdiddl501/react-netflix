import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import './SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);

    const useQuery  = () => {
        return new URLSearchParams(useLocation().search);
    }

    const navigate = useNavigate();

    let query = useQuery();
    const searchTerm = query.get("p");
    const debounceSearchTerm = useDebounce(searchTerm, 500);
    console.log("debounceSearchTerm", debounceSearchTerm);
    
    useEffect(()=> {
        if(debounceSearchTerm) {
            fetchSearchMovie(debounceSearchTerm);
        }
    },[debounceSearchTerm])

    const fetchSearchMovie = async debounceSearchTerm => {
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${debounceSearchTerm}`);
            console.log(request.data.results);
            setSearchResults(request.data.results);
        }catch(err) {
            console.log(err);
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ?
                <section className='search-container'>
                    {searchResults.map((movie)=>{
                        if(movie.backdrop_path !== null && movie.media_type !== 'person') {
                            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                            return (
                                <div className='movie' key={movie.id}>
                                    <div className='movie__column-poster'
                                    onClick={()=>{navigate(`/${movie.id}`)}}>
                                        <img src={movieImageUrl} alt='movie image' className='movie__poster' />
                                    </div>
                                </div>
                            );
                        }
                    })}
                </section>
            :
                <section className='no-results'>
                    <div className='no-results__text'>
                        <p>찾고자하는 검색어 "{debounceSearchTerm}"에 맞는 영화가 없습니다.</p>
                    </div>
                </section>
            
        
    };

    return renderSearchResults()
    
}
