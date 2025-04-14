import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";

function TopRated(props)
{
    const [movies , setMovies] = useState([]);
    const [load , setLoad] = useState(true);
    const [error , setError] = useState(null);
    const [count , setCount] = useState(1);
    const [totalPages , setTotalPages] = useState("");

    const Api_key = "c45a857c193f6302f2b5061c3b85e743";
    const Api_url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${count}`;

    useEffect(()=>{
        fetch(Api_url)
        .then((Response)=>{
            if(!(Response.ok))
            {
                throw new Error("Failed to fetch movies");
            }
            return Response.json();
        })
        .then((data)=>
        {
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setLoad(false);
        })
        .catch((error) => 
        {
            setError(error.message);
            setLoad(false);
        });
    },[count])
    const handleClick = (movie) => {
        props.setMovie(movie);
    };
    function handlePrev()
    {
        if(count>1)
        {
            setCount(count-1);
        }
    }
    function handleNext()
    {
        if(count < movies.length-1)
        setCount(count+1);
    }
    return(
        <>
            <div className="container text-center my-5">
                <div className="row text-center ">
                        {movies.map((movie) => (
                            <div className="col-4 w-auto m-auto g-5 my-2" key={movie.id}>
                                <Link className="nav-link" to="/MovieDetail" onClick={()=>handleClick({ id: movie.id})}>
                                <div className="card">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title m-0">{movie.title}</h5>
                                        <p className="card-text" style={{color:"#f9ab00"}}>Rating: {movie.vote_average}</p>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        ))}
                </div>
                <div className="container my-4">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center m-auto text-center">
                            <li className="page-item" onClick={handlePrev}><a className="page-link bg-dark" href="#" >Previous</a></li>
                            <li className="page-item" onClick={()=>setCount(1)}><a className="page-bg-dark" href="#" >1</a></li>
                            <li className="page-item" onClick={()=>setCount(2)}><a className="page-bg-dark" href="#" >2</a></li>
                            <li className="page-item" onClick={()=>setCount(3)}><a className="page-link bg-dark" href="#" >3</a></li>
                            <li className="page-item" onClick={handleNext}><a className="page-link bg-dark" href="#" >Page: {count}  / {totalPages}</a></li>
                            <li className="page-item" onClick={handleNext}><a className="page-link bg-dark" href="#" >Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
export default TopRated;