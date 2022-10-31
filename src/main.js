import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Templet from "./pages/Templet"
import { useState } from "react"

const Main=()=>{
    const [isSideBar,setIsSideBar]=useState(false)
    const platformsIcons=
        {"pc":"fa-solid fa-desktop",
        "playstation":"fa-brands fa-playstation",
        "xbox":"fa-brands fa-xbox",
        "ios":"fa-brands fa-app-store-ios",
        "android":"fa-brands fa-android",
        "nintendo":"fa-solid fa-gamepad"}
    return(
        <Router>
        <main className="container">
            <NavBar setIsSideBar={setIsSideBar} isSideBar={isSideBar} platformsIcons={platformsIcons}></NavBar>
            <SideBar isSideBar={isSideBar}></SideBar>
            <div className="content center">
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/games" exact element={<Templet />}></Route>
                    <Route path="/platforms" exact ></Route>
                    <Route path="/genres" exact ></Route>
                    <Route path="/publishers" exact ></Route>
                    <Route path="/developers" exact ></Route>
                    <Route path="/stores" exact ></Route>
                </Routes>
            </div>
        </main>
        </Router>
    )
}

export default Main