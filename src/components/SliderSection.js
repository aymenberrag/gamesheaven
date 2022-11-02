import useFetch from "../hooks/useFetch"
import ImageSlider from "./ImageSlider"
import Loading from "./loading"

const SliderSection=()=>{
    const {isLoading,err,data}=useFetch("games")
    return(
        <section className="slider-section">
            {
            isLoading?<Loading />
            :err?<div className="error center"><i className="bi bi-emoji-frown"></i>{err}</div>
            :!data.results.length?<div className="no-result center"><i className="bi bi-search"></i>no result</div>:
            <ImageSlider games={data.results.splice(0,5)}/>
            }
        </section>
    )
}



export default SliderSection