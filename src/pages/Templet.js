import { useEffect, useState } from "react"
import GamesCard from "../components/GamesCard"
import "../style/templet.css"

const Templet=()=>{
    const [isEmpty,setIsEmpty]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [err,setErr]=useState(null)
    const [data,setData]=useState(null)
    useEffect((e)=>{
        fetch(`https://api.rawg.io/api/games?parent_platforms=1,2,3,4,8,7&key=fd7cfdf1daa045669aae0980fa558939`)
        .then(res=>{
            if(res.ok){
                return res.json()
            }else{
                throw Error
            }
        })
        .then(data=>{
            setData(data)
            setIsEmpty(!Boolean(data.results.length))
            setIsLoading(false)
            setErr(null)
        })
        .catch(err=>{
            setIsLoading(false)
            setErr(err.message)
        })},[])
    return(
        <div className="templet center">
            {
            isLoading?<div className="loading">loading...</div>
            :err?<div className="error center"><i className="bi bi-emoji-frown"></i>{err}</div>
            :isEmpty?<div className="no-result center"><i className="bi bi-search"></i>no result</div>:(
            <>
                <div className="cardes-grid">
                    {data.results.map(card=>(
                        <GamesCard key={card.id} game={card}></GamesCard>
                    ))}
                </div>
                <div className="next-page">next</div>
            </>
            )
            }
        </div>
    )
}

export default Templet