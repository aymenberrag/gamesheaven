import NavSearchForm from "../components/NavSearchForm";


const NavBar=({setIsSideBar,isSideBar,platformsIcons})=>{
    return(
        <nav className="nav-bar space-between">
            <div className="logo center">
                <h1>games heaven</h1>
            </div>
            <i className={isSideBar?"bi bi-x side-bar-toggle":"bi bi-list side-bar-toggle"} onClick={()=>setIsSideBar(!isSideBar)}></i>
            <NavSearchForm platformsIcons={platformsIcons}/>
        </nav>
    )
}

export default NavBar