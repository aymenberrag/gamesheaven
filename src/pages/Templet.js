import { useSearchParams } from "react-router-dom"
import Card from "../components/Card"
import GamesCard from "../components/GamesCard"
import Loading from "../components/loading"
import useFetch from "../hooks/useFetch"
import "../style/templet.css"

const Templet=()=>{
    const [searchParams,setSearchParams]=useSearchParams()
    const {isEmpty,isLoading,err,data,page}=useFetch(searchParams)
    
    return(
        <div className="templet center">
            {
            isLoading?<Loading />
            :err?<div className="error center"><i className="bi bi-emoji-frown"></i>{err}</div>
            :isEmpty?<div className="no-result center"><i className="bi bi-search"></i>no result</div>:(
            <>
                <div className="cardes-grid">
                    {data.results.map(card=>(
                        page==="games"?
                        <GamesCard key={card.id} game={card}></GamesCard>:
                        <Card key={card.id} data={card} page={page}></Card>
                    ))}
                </div>
                <div className="next-page">
                    {data.previous && <i className="bi bi-caret-left-fill" onClick={()=>setSearchParams({page:searchParams.get("page")-1})}></i>}
                    <div>{`page ${searchParams.get("page") || 1} / ${Math.ceil(data.count / 20)}`}</div>
                    {data.next && <i className="bi bi-caret-right-fill" onClick={()=>setSearchParams({page:parseInt(searchParams.get("page"))+1 || 2})}></i>}
                </div>
            </>
            )
            }
        </div>
    )
}

export default Templet