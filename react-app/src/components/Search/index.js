import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../store/search";
import './search.css'

function Search() {
    const [searchParams, setSearchParams] = useState('');
    const dispatch = useDispatch()

    const searchResults = useSelector(state => Object.values(state.search))
    console.log('searchResults', searchResults)

    useEffect(() => {
        dispatch(searchUser(searchParams))
    }, [dispatch, searchParams])



    return (
        <div className='search-container'>
            <form className='search-field'>
                <i class="fas fa-search"></i>
                <input
                    placeholder='Search Soundbook'
                    className='search-form-field'
                    type='text'
                    value={searchParams}
                    onChange={(e) => setSearchParams(e.target.value)}
                />
            </form>
            {searchParams.length > 0 ?
            <div className='search-result-container'>
                <span className='search-header'><span className='result-text'>Results</span> for '{searchParams}'</span>
                {searchResults.map(result => (
                <div key={result.id} className='search-result-row'>
                    <img className='search-portrait' src={result.profile_pic}></img>
                    <div>{result.first_name} {result.last_name}</div>
                </div>
                ))}
            </div>
            : null}
        </div>
    )
}

export default Search
