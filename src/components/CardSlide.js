import GamesCard from "./GamesCard"

const CardSlide=({game})=>{
    return(
    <div className="card-slide" >
        <GamesCard game={game} />
    </div>
    )
}

export default CardSlide