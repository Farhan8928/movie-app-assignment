import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const IMAGE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!movieResponse.ok) {
          throw new Error("Failed to fetch movie details.");
        }
        const movieData = await movieResponse.json();
        setDetails(movieData);

        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        if (!creditsResponse.ok) {
          throw new Error("Failed to fetch movie credits.");
        }
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const {
    original_title,
    vote_average,
    genre_ids = [],
    release_date,
    overview,
    poster_path,
    backdrop_path
  } = details;

  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="details-cast-section">
      <Header />
      <div className="details-section">
        <div className="details">
          <div className="bg">
            <img
              src={`${IMAGE_URL}w300${poster_path}`}
              alt="movie"
              className="movie-item"
            />
            <div className="bg-items">
              <h3 className="details-title">{original_title}</h3>
              <p className="details-rating">Rating: {vote_average}</p>
              <h3 className="genres">Genres: {genre_ids.join(", ")}</h3>
              <p className="details-realise-date">
                Release Date: {formattedDate}
              </p>
            </div>
          </div>
          <div className="movie-details">
            <h2 className="overview">Overview:</h2>
            <p className="paragraph">{overview}</p>
          </div>
        </div>
        <div className="background-image">
          <img
            src={`${IMAGE_URL}w500${backdrop_path}`}
            alt="bg-"
            className="item-images"
          />
        </div>
      </div>
      <div className="cast">
        <h2 className="cast-heading">Cast</h2>
        <ul className="cast-list">
          {cast.map((actor) => (
            <li key={actor.id} className="cast-item">
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_URL}w200${actor.profile_path}`
                    : "/default-profile.jpg"
                }
                alt={actor.name}
                className="actor-image"
              />
              <div className="actor-details">
                <p className="actor-name">{actor.name}</p>
                <p className="character-name">as {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
