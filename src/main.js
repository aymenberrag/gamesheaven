import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"

const Main=()=>{
    return(
        <main className="container">
            <NavBar></NavBar>
            <SideBar></SideBar>
            <div className="content center">
                content
            </div>
        </main>
    )
}

export default Main