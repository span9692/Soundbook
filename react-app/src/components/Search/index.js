import React, { useState, useEffect } from "react"
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../store/search";
import './search.css'

function Search() {
    const [searchParams, setSearchParams] = useState('');
    const history = useHistory();
    const dispatch = useDispatch()

    let searchResults = useSelector(state => Object.values(state.search))

    if (searchResults.length > 6) {
        searchResults = searchResults.slice(0,6)
    }

    const shuffle = (arr) => {
        arr.sort(()=>Math.random()-0.5);
        return arr
    }

    searchResults = shuffle(searchResults)

    useEffect(() => {
        dispatch(searchUser(searchParams))
    }, [dispatch, searchParams])

    const clearSearch = () => {
        setSearchParams('')
    }

    const foundUser = (userId) => {
        setSearchParams('')
        history.push(`/users/${userId}`)
    }

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
                {searchParams.length > 0 ?
                <div onClick={()=>clearSearch()}>
                    <i class="fas fa-times"></i>
                </div>
                : null}
            </form>
            {searchParams.length > 0 ?
            <div className={searchResults.length === 0 ? 'no-results' : 'search-result-container'}>
                <span className='search-header'><span className='result-text'>Results</span> for '{searchParams}'</span>
                {searchResults.map(result => (
                <div key={result.id} className='search-result-row pointer' onClick={() => foundUser(result.id)}>
                    <img className='search-portrait' src={result.profile_pic}></img>
                    <div className='search-result-names'>
                        <div className='result-names'>
                            {result.first_name} {result.last_name}
                        </div>
                        {result.alias ? (<div className='result-alias'> {result.alias} </div>) : null}
                    </div>
                </div>
                ))}
            </div>
            : null}
        </div>
    )
}

export default Search
