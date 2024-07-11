// import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
// import axios from "axios";



const BannerSlider = [
    {
        id: 1,
        url: "https://i.ibb.co/DRJL7QW/gameplay.webp",
        name: "game play",
    },
    {
        id: 2,
        url: "https://i.ibb.co/jGqH99z/samsung-Galazy.jpg",
        name: "samsung galazy",
    },
    {
        id: 3,
        url: "https://i.ibb.co/grjMRjh/sales-Goes-Live.webp",
        name: "sales live",
    }
]



export default function Banner() {

    // state
    // const[slides, setSlides] = useState([]);

    // useEffect(() => {
    //     loadSlides()
    // }, []);

    // const loadSlides = async () => {
    //     try {
    //         const { data } = await axios.get('/slides')
    //         setSlides(data)
    //     } catch (err) {
    //       console.log(err);  
    //     }
    // }
    
    return (
        <div>
            <Carousel
                className="carousel"
                autoPlay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysInvisible={true}
                cycleNavigation={true}
                navButtonsProps={{
                    style: {
                        background: "#fff",
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "104px"
                    }
                }}
                
            >
                {BannerSlider?.map((s) => {
                    return (
                        <div key={s._id}>
                            <img 
                                
                                src={s.url}
                                alt={s.name}
                                className="bannerImg"
                            />
                        </div>
                    )
                })}
            </Carousel>
        </div>
    )
}