import { useState } from "react"
import { Link } from "react-router-dom"
import Loading from "./loading"
import NavSearchResult from "./NavSearchResult"

const NavSearchForm=()=>{
    const [isLoading,setIsLoading]=useState(false)
    const [err,setErr]=useState(null)
    const [showResult,setShowResult]=useState(false)
    const [search,setSearch]=useState("")
    const [result,setResult]=useState([])
    const handleSearch=(e)=>{
        setIsLoading(true)
        setShowResult(true)
        setSearch(e.target.value)
        fetch(`https://api.rawg.io/api/games?search=${e.target.value}&search_precise=true&parent_platforms=1,2,3,4,8,7&key=fd7cfdf1daa045669aae0980fa558939`)
        .then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw Error
            }
        })
        .then(data=>{
            setResult(data.results.splice(0,5))
            setIsLoading(false)
        })
        .catch(err=>{
            setIsLoading(false)
            setErr(err.message)
        })
}
    return(
        <div className="nav-search center">
            <input 
            className="nav-search-input" 
            value={search}
            onChange={handleSearch}
            onBlur={()=>setShowResult(false)}
            type="text" 
            placeholder="search..." 
            autoComplete="off"/>
            <Link to={`/search`} className="search-btn center"><i className="bi bi-search"></i></Link>
            {showResult && (
            <div className="nav-search-result center">
                {isLoading?<Loading />
                :err?<div className="error center"><i className="bi bi-emoji-frown"></i>{err}</div>
                :!result.length?<div className="no-result center"><i className="bi bi-search"></i>no result</div>:(
                    <div className="search-result-list">
                        {result.map(item=><NavSearchResult key={item.id} item={item}/>)}
                    </div>
                )}
            </div>
            )}
            
        </div>
    )
}

export default NavSearchForm