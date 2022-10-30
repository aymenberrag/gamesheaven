import { useState } from "react"
import { Link } from "react-router-dom"

const SideBar=(props)=>{
    const [activeId,setActiveId]=useState(0)
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
        <aside className="side-bar" active={props.isSideBar?"active":""}>
            <ul className="side-bar-list center">
                {pages.map(page=>(
                <li className="side-bar-item" key={page.id} onClick={()=>setActiveId(page.id)}>
                    <Link className="side-bar-link" to={page.link} active={page.id===activeId?"active":""}><i className={page.icon}></i>{page.name}</Link>
                </li>
                ))}
            </ul>
        </aside>
    )
}

export default SideBar