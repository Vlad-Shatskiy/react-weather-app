import React from "react";
import { capitalizeFirstLetter } from "../utils/capitalize";
function Card({ period }) {
  return (
    <div key={period} className="weather__card">
      <div className="weather__timezone">
        {capitalizeFirstLetter(
          new Date(period.dt_txt).toLocaleString("ru", {
            weekday: "short",
            timezone: "UTC",
            hour: "numeric",
            minute: "numeric",
          })
        )}
      </div>

      <div className="weather__img">
        <img
          src={`http://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
      </div>
      <div className="weather__timezone_temp">
        {Math.round(period.main.temp)}
      </div>
    </div>
  );
}

export default Card;
