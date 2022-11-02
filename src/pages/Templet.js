import { useSearchParams,useParams} from "react-router-dom"
import Card from "../components/Card"
import GamesCard from "../components/GamesCard"
import Loading from "../components/loading"
import useFetch from "../hooks/useFetch"
import "../style/templet.css"

const Templet=()=>{
    const [searchParams,setSearchParams]=useSearchParams()
    const {page}=useParams()
    const {isLoading,err,data}=useFetch(page,searchParams)

    return(
        <div className="templet center">
            {
            isLoading?<Loading />
            :err?<div className="error center"><i className="bi bi-emoji-frown"></i>{err}</div>
            :!data.results.length?<div className="no-result center"><i className="bi bi-search"></i>no result</div>:(
            <>
                <div className="cardes-grid">
                    {
                    data.results.map(card=>(
                        page==="games"?
                        <GamesCard key={card.id} game={card}></GamesCard>:
                        <Card key={card.id} data={card} page={page}></Card>
                    ))}
                </div>
                <div className="next-page">
                    {data.previous && <i className="bi bi-caret-left-fill" onClick={()=>setSearchParams(prev=>{
                        prev.set("page",prev.get("page")-1)
                        return prev
                    })}></i>}
                    <div>{`page ${searchParams.get("page") || 1} / ${Math.ceil(data.count / data.results.length)}`}</div>
                    {data.next && <i className="bi bi-caret-right-fill" onClick={()=>setSearchParams(prev=>{
                        prev.set("page",parseInt(prev.get("page"))+1 || 2)
                        return prev
                    })}></i>}
                </div>
            </>
            )
            }
        </div>
    )
}

export default Templet