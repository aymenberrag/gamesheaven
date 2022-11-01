import { useContext } from "react"
import { Link } from "react-router-dom"
import { dataContext } from "../main"
import "../style/gamescard.css"
const GamesCard=({game})=>{
    const {platformsIcons}=useContext(dataContext)
    return(
        <Link to={`${game.id}`} className="game-card center" metacritic={game.metacritic || "--"}>
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
                <div className="platforms">
                {game.parent_platforms.map(platform=>(
                    platformsIcons[platform.platform.name.toLowerCase()] && <i className={platformsIcons[platform.platform.name.toLowerCase()]} key={platform.platform.id}></i>
                ))}
                </div>
            </div>
        </Link>
    )
}
export default GamesCard