import { useContext } from "react";
import NavSearchForm from "../components/NavSearchForm";
import { dataContext } from "../main";


const NavBar=()=>{
    const {setIsSideBar,isSideBar}=useContext(dataContext)
    return(
        <nav className="nav-bar space-between">
            <div className="logo center">
                <h1>games heaven</h1>
            </div>
            <i className={isSideBar?"bi bi-x side-bar-toggle":"bi bi-list side-bar-toggle"} onClick={()=>setIsSideBar(!isSideBar)}></i>
            <NavSearchForm />
        </nav>
    )
}

export default NavBar