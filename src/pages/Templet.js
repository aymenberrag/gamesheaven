import { useState } from "react"
import { useParams } from "react-router-dom"
import GamesCard from "../components/GamesCard"
import useFetch from "../hooks/useFetch"
import "../style/templet.css"

const Templet=()=>{
    const {page}=useParams()
    const [pageIndex,setPageIndex]=useState(1)
    const {isEmpty,isLoading,err,data}=useFetch(page,pageIndex)
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
                <div className="next-page">
                    {data.previous && <i className="bi bi-caret-left-fill" onClick={()=>setPageIndex(pageIndex-1)}></i>}
                    <div>{`page ${pageIndex} / ${Math.ceil(data.count / 20)}`}</div>
                    {data.next && <i className="bi bi-caret-right-fill" onClick={()=>setPageIndex(pageIndex+1)}></i>}
                </div>
            </>
            )
            }
        </div>
    )
}

export default Templet