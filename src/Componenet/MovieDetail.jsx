import React, { useState , useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDetail(props) 
{
    const { id } = useParams();
    const [movie , setMovie] = useState(null);
    const [load , setLoad] = useState(true);
    const [error , setError] = useState(null);
    const [cast , setCast] = useState(null);

    const Api_key = "c45a857c193f6302f2b5061c3b85e743";
      
    useEffect(() => {
        const fetchMovie = async () => {
            setLoad(true);
            const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_key}&language=en-US`;
            const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Api_key}&language=en-US`;

            try {
                const [movieRes, castRes] = await Promise.all([
                    fetch(movieUrl),
                    fetch(castUrl),
                ]);

                if (!movieRes.ok || !castRes.ok) {
                    throw new Error("Failed to fetch data.");
                }

                const movieData = await movieRes.json();
                const castData = await castRes.json();

                setMovie(movieData);
                setCast(castData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoad(false);
            }
        };

        fetchMovie();
    }, [id]);
    

    if (load) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error}</h1>;
    if (!movie) return <h1>No movie data available. Please select a movie.</h1>;
    return (
        <>
            <div className="container  mt-5 p-0">
                {props.getMovie ? (
                    <>
                        <div className="banner row m-0 p-2">
                            <div className="left m-0 p-0 row col-md-6 d-flex flex-wrap">
                                {/* ===================================================== */}
                                <div className="l-box col-3  p-0">
                                    <div className="img-b w-100" ><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}className="img-fluid rounded shadow"/></div>
                                </div>
                                {/* ===================================================== */}
                                <div className="r-box p-2 col-8 ">
                                    <h1 className="my-2 p-0 h3 b-col" >{movie.title}</h1>
                                    <h1 className="h5 text-primary" style={{color:"#f9ab00"}} >Rating : {movie.vote_average}</h1>
                                    <div className="box d-flex mt-3">
                                        <p className="time rounded-2 p-1 my-auto">{movie.runtime} min</p> 
                                        <div className="box mx-2 pt-1 text-info-emphasis">{movie.genres.map((element , index)=><span key={index} >{element.name + "  "}</span >)}</div>
                                    </div>
                                    <p className="mt-3 l-col"><strong>Release Date:</strong> {movie.release_date}</p>
                                </div>
                                {/* ===================================================== */}
                                <div className="overview  col-11 m-0">
                                    <h3 className="h4 m-0 b-col mt-1">Overview:</h3>
                                    <p className="m-0 py-2 lh-2 l-col">{movie.overview}</p>
                                </div>
                            </div>
                            <div className="right col-md-6 boder p-0">
                                <img className="img-banner shadow w-100" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />
                            </div>
                        </div>
                    </>
                ) : 
                (
                    <h1>No movie data available. Please select a movie....</h1>
                )}
            </div>
            <div className="container-fluid cast my-4" >
                    <h2 className="b-col d-cast text-center h5 p-1 rounded-5 o">Cast</h2>
                    <div className="row text-center">
                        {cast.cast.map((element , index)=>
                        <div className="col-2 m-auto w-auto my-2" key={element.id}>
                        <div className="card card-d">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${element.profile_path}`}
                                alt={element.name}
                                className="card-img-top"
                            />
                            <div className="card-body">
                                <h5 className="card-title m-0">{element.name}</h5>
                                <p className="card-text">Character : {element.character}</p>
                            </div>
                        </div>
                        </div>
                        )}
                    </div>
                </div>
        </>
    );
}

export default MovieDetail;
