import { useRef } from "react"
import"../style/slider.css"

const ImageSlider=({games,children:Card})=>{
    const slider=useRef()
    return(
        <div className="slider-container center">
        <i className="bi bi-chevron-left" onClick={()=>slider.current.scrollBy({left:-slider.current.offsetWidth,behavior:"smooth"})}></i>
        <i className="bi bi-chevron-right" onClick={()=>slider.current.scrollBy({left:slider.current.offsetWidth,behavior:"smooth"})}></i>
        <div className="slider" ref={slider}>
            <div className="slides">
                {games.map((game)=>(
                    <Card key={game.id} game={game}/>
                ))}
            </div>
        </div>
        </div>
    )
}

export default ImageSlider