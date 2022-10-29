import NavSearchForm from "../components/NavSearchForm";



const NavBar=()=>{
    return(
        <nav className="nav-bar space-between">
            <h1 className="logo">games heaven</h1>
            <NavSearchForm />
        </nav>
    )
}

export default NavBar