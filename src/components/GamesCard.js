import { Link } from "react-router-dom"
import "../style/gamescard.css"
const GamesCard=({game})=>{
    return(
        <Link to="/" className="game-card center">
            <img className="game-img" src={game.background_image} alt={game.name}></img>
            <div className="game-data">
                <h3 className="game-name">{game.name}</h3>
                <i className="bi bi-star-fill game-rating"><span>{game.rating}</span></i>
                <div className="released">released : {game.released}</div>
                {
                    game.genres.map(genre=>(
                        <div key={genre.id} className="genre center">{genre.name}</div>
                    ))
                }
            </div>
        </Link>
    )
}

export default GamesCard