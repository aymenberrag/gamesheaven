import { useRef } from "react"
import"../style/slider.css"

const ImageSlider=({games})=>{
    console.log(games)
    const slider=useRef()
    return(
        <div className="slider-container center">
        <i className="bi bi-chevron-left" onClick={()=>slider.current.scrollBy({left:-slider.current.offsetWidth,behavior:"smooth"})}></i>
        <i className="bi bi-chevron-right" onClick={()=>slider.current.scrollBy({left:slider.current.offsetWidth,behavior:"smooth"})}></i>
        <div className="slider" ref={slider}>
            <div className="slides">
                {games.map((game)=><img className="slider-img" src={game.background_image} alt={game.name} key={game.id} />)}
            </div>
        </div>
        </div>
    )
}

export default ImageSlider