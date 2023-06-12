import React from 'react'
import requests from '../../api/requests';
import Banner from '../../components/Banner';
import Row from '../../components/Row'

export default function MainPage() {
  return (
    <div>
        <Banner />

        <Row title="RETFLIX ORIGINALS" id="RO" fetchUrl={requests.featchNetflixOriginals}
        isLargeRow/>

        <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" id="AM" fetchUrl={requests.featchActionMovies} />
        <Row title="Comedy Movies" id="CM" fetchUrl={requests.featchComedyMovies} />
    </div>
  )
}
