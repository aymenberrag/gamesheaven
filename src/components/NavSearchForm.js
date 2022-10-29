import { useState } from "react"

const NavSearchForm=()=>{
    const [isEmpty,setIsEmpty]=useState(false)
    const [showResult,setShowResult]=useState(false)
    const [search,setSearch]=useState("")
    const [result,setResult]=useState([])
    const handleSearch=(e)=>{
        setShowResult(true)
        setSearch(e.target.value)
        fetch(`https://api.rawg.io/api/games?search=${e.target.value}&search_precise=true&key=fd7cfdf1daa045669aae0980fa558939`)
        .then(res=>res.json())
        .then(data=>{
        setResult(data.results.splice(0,5))
        setIsEmpty(!Boolean(data.results.length))
        })
        .catch(err=>console.log(err))
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
                {isEmpty?<div>no result..</div>:(
                    <div className="search-result-list">
                        {result.map(item=>{
                        return(
                        <a href="/" className="result-item" key={item.id}>
                            <img className="result-img" src={item.background_image} alt={item.name} />
                            <h3 className="result-name">{item.name}</h3>
                            <i className="bi bi-star-fill result-rating"><span>{item.rating || "0.00"}</span></i>
                            <span className="result-metacritic" metacritic={item.metacritic || "00"}>metacritic</span>
                        </a>
                        )})}
                    </div>
                )}
            </div>
            )}
            
        </form>
    )
}

export default NavSearchForm