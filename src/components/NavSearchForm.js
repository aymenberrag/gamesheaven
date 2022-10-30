import { useState } from "react"
import { Link } from "react-router-dom"

const NavSearchForm=(props)=>{
    const [isEmpty,setIsEmpty]=useState(false)
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
            setIsEmpty(!Boolean(data.results.length))
            setIsLoading(false)
        })
        .catch(err=>{
            setIsLoading(false)
            setErr(err.message)
        })
}
    return(
        <form className="nav-search center">
            <input 
            className="nav-search-input" 
            value={search}
            onChange={handleSearch}
            onBlur={()=>setShowResult(false)}
            type="text" 
            placeholder="search..." 
            autoComplete="off"/>
            <button className="search-btn"><i className="bi bi-search"></i></button>
            {showResult && (
            <div className="nav-search-result center">
                {isLoading?<div className="loading">loading...</div>
                :err?<div className="error center"><i className="bi bi-emoji-frown"></i>{err}</div>
                :isEmpty?<div className="no-result center"><i className="bi bi-search"></i>no result</div>:(
                    <div className="search-result-list">
                        {result.map(item=>{
                        return(
                        <Link to={`/games/${item.id}`} className="result-item" key={item.id}>
                            <img className="result-img" src={item.background_image} alt={item.name} />
                            <h3 className="result-name">{item.name}</h3>
                            <div className="platforms">
                            {item.parent_platforms.map(platform=>(
                                <i className={props.platformsIcons[platform.platform.name.toLowerCase()]} key={platform.platform.id}></i>
                            ))}
                            </div>
                            <div className="released center">{item.released}</div>
                        </Link>
                        )})}
                    </div>
                )}
            </div>
            )}
            
        </form>
    )
}

export default NavSearchForm