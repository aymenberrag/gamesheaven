import { Link } from "react-router-dom"
import "../style/card.css"
const Card=({data,page})=>{
    return(
        <div className="card center">
            <img className="card-img" src={data.image_background} alt={data.name}></img>
            <div className="card-data">
                <h3 className="card-name">{data.name}</h3>
                <div className="games-count">{`games : ${data.games_count}`}</div>
                <Link to={`/games?${page}=${data.id}`} className="see-games center">see all games</Link>
            </div>
        </div>
    )
}
export default Card