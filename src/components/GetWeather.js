import { Autocomplete, Divider } from "@mui/material";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Time } from "./Time";
import NearMeIcon from "@mui/icons-material/NearMe";
import CurrentWeather from "./CurrentWeather";
import Card from "./Card";
export default function GetWeather() {
  const cities = [
    { label: "Ташкент" },
    { label: "Лондон" },
    { label: "Москва" },
    { label: "Берлин" },
    { label: "Амстердам" },
    { label: "Париж" },
    { label: "Нью-Йорк" },
    { label: "Прага" },
    { label: "Астана" },
    { label: "Будапешт" },
    { label: "Самарканд" },
    { label: "Рейкявик" },
    { label: "Санкт-Петербург" },
    { label: "Дубаи" },
    { label: "Бангкок" },
  ];
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [data, setData] = React.useState([]);
  const [currentLocation, setCurrentLocation] = React.useState("");

  React.useEffect(() => {
    // let url;
    if (currentLocation) {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${currentLocation}&units=metric&lang=ru&appid=8138cc48a353891976c025801dc6009f`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data));
    } else {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&units=metric&lang=ru&appid=8138cc48a353891976c025801dc6009f`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [inputValue, currentLocation]);

  const settings = {
    dots: false,
    infinite: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrow: true,
    speed: 500,
    slidesToShow: 11,
    slidesToScroll: 3,
    initialSlide: 0,
    width: 200,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(255, 255, 255, 0.42)",
          marginRight: "25px",
        }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "rgba(255, 255, 255, 0.42)",
          marginLeft: "25px",
        }}
        onClick={onClick}
      />
    );
  }

  async function handleLocation() {
    const url = "https://ipinfo.io/json?token=7cab483962e34e&lang=ru";
    const response = await fetch(url);
    const data = await response.json();
    setCurrentLocation(data.city);
    setValue("");
  }

  const handleChangeCity = () => {
    setValue("");
    setCurrentLocation("");
    setInputValue("");
  };

  return (
    <div class="weather">
      <div className="heading">
        <div className="select__time">
          {currentLocation.length >= 5 || inputValue.length >= 5 ? (
            <div className="header">
              {currentLocation === "Tashkent"
                ? "Ташкент"
                : inputValue || currentLocation}
            </div>
          ) : (
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              disablePortal
              options={cities}
              sx={{
                display: "inline-block",
                "& input": {
                  width: 200,
                  height: 55,
                  border: 0,
                  bgcolor: "#FFFFFF",
                  color: "#000",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                },
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    {...params.inputProps}
                    placeholder="Выбрать город"
                    className="change__city"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  />
                </div>
              )}
            />
          )}
          <Time />
        </div>
        <div className="current__location">
          <div className="location__button">
            <button onClick={handleChangeCity} style={{ paddingRight: "40px" }}>
              Сменить город
            </button>
            <NearMeIcon fontSize="small" />
            <button onClick={handleLocation}>Мое местоположение</button>
          </div>
        </div>
      </div>

      {data.cod === "200" ? (
        <>
          <CurrentWeather data={data} />
          <Divider sx={{ color: "#fff", height: 5 }} />
          <div className="carousel">
            <Slider {...settings} style={{ padding: "40px" }}>
              {data.list.map((period) => (
                <Card period={period} />
              ))}
            </Slider>
          </div>
        </>
      ) : null}
    </div>
  );
}
