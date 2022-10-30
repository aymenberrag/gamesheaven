import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import { useState } from "react"

const Main=()=>{
    const [isSideBar,setIsSideBar]=useState(false)
    return(
        <Router>
        <main className="container">
            <NavBar setIsSideBar={setIsSideBar} isSideBar={isSideBar}></NavBar>
            <SideBar isSideBar={isSideBar}></SideBar>
            <div className="content center">
                <Routes>
                    <Route path="/" exact element={<Home />}></Route>
                    <Route path="/games" exact ></Route>
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