import NavSearchForm from "../components/NavSearchForm";


const NavBar=({setIsSideBar,isSideBar})=>{
    return(
        <nav className="nav-bar space-between">
            <div className="logo center">
                <i className="bi bi-list side-bar-toggle" onClick={()=>setIsSideBar(!isSideBar)}></i>
                <h1>games heaven</h1>
            </div>
            <NavSearchForm />
        </nav>
    )
}

export default NavBar