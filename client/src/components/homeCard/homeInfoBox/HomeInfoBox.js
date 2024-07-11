import React from "react";
import { homeInfoData } from "./HomeInfoData";
import "./infoBox.css";



export default function HomeInfoBox () {
    return (
        <div className="d-flex justify-content-center infoBoxes">
            {homeInfoData.map((item, index) => {
                const { icons, heading, text } = item;
                return (
                    <div className="infoBox" key={index}>
                        <div className="icon">{icons}</div>
                        <div className="text">
                            <h4>{heading}</h4>
                            <p className="h6" >{text}</p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}