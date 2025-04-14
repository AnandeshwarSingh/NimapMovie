import React , { useState } from "react";
import { BrowserRouter , Routes, Route, Link } from "react-router-dom";
import Popular from "./Popular";
import TopRated from './TopRated';
import Upcoming from "./Upcoming";
import MovieDetail from './MovieDetail';
import Search from "./Search";

function NavBar()
{
    const [selectMovie , setSelectMovie] = useState(null);
    const [search , setSearch] = useState("");

    function handleSearchChange(e)
    {
        setSearch(e.target.value);
    }
    return(
        <>
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg  bg-dark navbar-dark shadow">
                <div className="container-fluid mx-5 px-5">
                    <Link to="/" className="nav-link" aria-current="page" href="#"><a className="navbar-brand text-white " href="#">Watch<spam style={{color:"#f9ab00"}}>Movie</spam></a></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse justify-content-end navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mx-2 mb-lg-0">
                        <li className="nav-item">
                        <Link to="/" className="nav-link" aria-current="page" href="#">Popular</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/TopRated" className="nav-link disable" href="#">Top Rated</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/Upcoming"  className="nav-link" href="#">Upcoming</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Movie Name" aria-label="Search" onChange={handleSearchChange} value={search}/>
                        <Link to="/Search"  className="nav-link" href="#"><button className="btn  bg-secondary text-white" type="button">Search</button></Link> 
                    </form>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Popular setMovie={setSelectMovie}/>}></Route>
                <Route path="/TopRated" element={<TopRated setMovie={setSelectMovie}/>}></Route>
                <Route path="/Upcoming/*" element={<Upcoming setMovie={setSelectMovie}/>}></Route>
                <Route path="/MovieDetail" element={<MovieDetail getMovie={selectMovie}/>}></Route>
                <Route path="/Search" element={<Search search={search} setMovie={setSelectMovie}/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    );
}
export default NavBar