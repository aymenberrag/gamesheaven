import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import ImageSlider from "./ImageSlider"
import Loading from "./loading"

const CardsSection=({name,page,params,children})=>{
    const {isLoading,err,data}=useFetch(page,params)
    return(
        <section className="cards-section">
            <Link className="name" to={`games`}>{name}</Link>
            {
            isLoading?<Loading />
            :err?<div className="error center"><i className="bi bi-emoji-frown"></i>{err}</div>
            :!data.results.length?<div className="no-result center"><i className="bi bi-search"></i>no result</div>:
            <ImageSlider games={data.results} children={children}/>
            }
        </section>
    )
}


export default CardsSection