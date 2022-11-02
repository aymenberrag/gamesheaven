import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Templet from "./pages/Templet"
import React, { useState } from "react"

export const dataContext=React.createContext()

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
        <dataContext.Provider value={{platformsIcons,isSideBar,setIsSideBar}}>
            <Router>
            <main className="container">
                <NavBar ></NavBar>
                <SideBar ></SideBar>
                <div className="content center">
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />}></Route>
                            <Route path=":page" element={<Templet />}></Route>    
                        </Route>
                    </Routes>
                </div>
            </main>
            </Router>
        </dataContext.Provider>
    )
}

export default Main