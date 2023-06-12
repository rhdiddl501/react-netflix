import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react'

export default function Row({title, id, fetchUrl, isLargeRow}) {
    
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(()=> {
        fetchMovieData();
    }, [])

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    }

    const hadleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    return (
        <section className='row'>
            <h2>{title}</h2>

            <Swiper
                key="swiper"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                pagination={{clickable: true}}
                loop={true}
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    }
                }}
                >

                <div id={id} className='row__posters'>
                    {movies.map((movie)=>(
                        <SwiperSlide key={movie.id}>
                            <img key={movie.id} className={`row__poster ${isLargeRow&&"row__posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${(isLargeRow || !movie.backdrop_path) ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.title}
                            onClick={()=>hadleClick(movie)}
                            />
                        </SwiperSlide>
                        ))}
                </div>

            </Swiper>

            {modalOpen && (
                <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
            )}
        </section>
    )
}
