import { Link } from "react-router-dom"
import { useContext } from "react"
import { dataContext } from "../main"

const NavSearchResult=({item})=>{
    const {platformsIcons}=useContext(dataContext)
return(
    <Link to={`/games/${item.id}`} className="result-item">
        <img className="result-img" src={item.background_image} alt={item.name} />
        <h3 className="result-name">{item.name}</h3>
        <div className="platforms">
        {item.parent_platforms.map(platform=>(
            <i className={platformsIcons[platform.platform.name.toLowerCase()]} key={platform.platform.id}></i>
        ))}
        </div>
        <div className="released center">{item.released}</div>
    </Link>
    )
}

export default NavSearchResult