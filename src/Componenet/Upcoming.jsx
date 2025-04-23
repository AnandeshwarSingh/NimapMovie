import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function Upcoming(props) {
    const [movies, setMovies] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(1);
    const [totalPages, setTotalPages] = useState("");


    const Api_key = "c45a857c193f6302f2b5061c3b85e743";
    const Api_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=${count}`;

    useEffect(() => {
        fetch(Api_url)
            .then((Response) => {
                if (!(Response.ok)) {
                    throw new Error("Failed to fetch movies");
                }
                return Response.json();
            })
            .then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
                setLoad(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoad(false);
            });
    }, [count])
    const handleClick = (movie) => {
        props.setMovie(movie);
    };
    function handlePrev() {
        if (count > 1) {
            setCount(count - 1);
        }
    }
    function handleNext() {
        if (count < movies.length - 1)
            setCount(count + 1);
    }
    return (
        <>
            <div className="container text-center my-5">
                <div className="row text-center ">
                    {movies.map((movie) => (
                        <div className="col-4 w-auto m-auto g-5 my-2" key={movie.id}>
                            <Link className="nav-link" to={`/MovieDetail/${movie.id}`} onClick={() => handleClick({ id: movie.id })}>
                                <div className="card">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title m-0">{movie.title}</h5>
                                        <p className="card-text" style={{ color: "#f9ab00" }}>Rating: {movie.vote_average}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {!load && (
                    <Pagination
                        count={count}
                        totalPages={totalPages}
                        onPrev={() => count > 1 && setCount(count - 1)}
                        onNext={() => count < totalPages && setCount(count + 1)}
                        onPageSelect={(page) => setCount(page)}
                    />
                )}
            </div>
        </>
    );
}
export default Upcoming;