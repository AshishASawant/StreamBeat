import React from 'react'
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";


const Rating = ({value,textSize}) => {
  return (
    <CircularProgressbar
            value={value}
            maxValue={10}
            text={`${Math.round(value* 10) / 10}`}
            styles={buildStyles({
              strokeLinecap: "butt",
              textColor: "red",
              pathColor:value < 5 ? "red" : value < 7 ? "orange" : "green",
              trailColor:'transparent',
              textSize: textSize,
            })}
          />
  )
}

export default Rating