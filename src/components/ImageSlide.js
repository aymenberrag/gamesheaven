import { Link } from "react-router-dom"

const ImageSlide=({game})=>{
    return(
    <div className="slide center" >
        <div className="game-info">
            <h1 className="game-name">{game.name}</h1>
            <div className="game-released">{game.released}</div>
            <Link className="game-link" to={`games/${game.id}`}>see more</Link>
        </div>
        <img className="slider-img" src={game.background_image} alt={game.name} />
    </div>
    )
}

export default ImageSlide