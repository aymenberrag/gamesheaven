import { useContext} from "react"
import { Link, useParams } from "react-router-dom"
import { dataContext } from "../main"

const SideBar=()=>{
    const {isSideBar}=useContext(dataContext)
    const {page :pageName}=useParams()
    const pages=[
        {id:0,name:"home",link:"/",icon:"fa-solid fa-house"},
        {id:1,name:"games",link:"/games",icon:"fa-solid fa-gamepad",},
        {id:2,name:"platforms",link:"/platforms",icon:"fa-solid fa-desktop",},
        {id:3,name:"genres",link:"/genres",icon:"fa-solid fa-bolt",},
        {id:4,name:"publishers",link:"/publishers",icon:"fa-solid fa-upload",},
        {id:5,name:"developers",link:"/developers",icon:"fa-solid fa-code",},
        {id:6,name:"stores",link:"/stores",icon:"fa-solid fa-store",}
    ]
    return(
        <aside className="side-bar" active={isSideBar?"active":""}>
            <ul className="side-bar-list center">
                {pages.map(page=>(
                <li className="side-bar-item" key={page.id}>
                    <Link className="side-bar-link" to={page.link} active={page.name===pageName?"active":""}><i className={page.icon}></i>{page.name}</Link>
                </li>
                ))}
            </ul>
        </aside>
    )
}

export default SideBar