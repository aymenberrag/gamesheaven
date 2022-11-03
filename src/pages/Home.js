import ImageSlide from "../components/ImageSlide"
import SliderSection from "../components/SliderSection"
import CardsSection from "../components/CardsSection"
import "../style/home.css"
import CardSlide from "../components/CardSlide"
const Home=()=>{
    return(
        <div className="home">
            <SliderSection children={ImageSlide} page={"games"} params={{page_size:5}}/>
            <CardsSection name={"poupeler games"} children={CardSlide}  page="games" params={{page_size:10}}/>
        </div>
    )
}

export default Home