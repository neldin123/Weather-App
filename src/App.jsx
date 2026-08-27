/* eslint-disable react-hooks/set-state-in-effect */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

// React
import { useEffect, useState } from "react";

// Material Ui Imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Cloud from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// External Library
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  typography: {
    fontFamily: "IBM Arabic",
  },
});

const apiKey = import.meta.env.VITE_WEATHER_APP_KEY;

let cancelAxios = null;

const App = () => {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    currtemp: null,
    mintemp: null,
    maxtemp: null,
    description: null,
    icon: null,
  });
  const [direction, setDirection] = useState("");
  useEffect(() => {
    moment.locale("en");
    setDateAndTime(moment().format("Do MMMM  YYYY"));
    // i18n.changeLanguage("en");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&units=metric&appid=${apiKey}`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )
      .then((res) => {
        const currtemp = Math.floor(res.data.main.temp);
        const mintemp = Math.floor(res.data.main.temp_min);
        const maxtemp = Math.floor(res.data.main.temp_max);
        const description = res.data.weather[0].description;
        const icon = res.data.weather[0].icon;
        console.log(res.data);
        console.log(icon);
        setTemp({
          currtemp: currtemp,
          mintemp: mintemp,
          maxtemp: maxtemp,
          description: description,
          icon: icon,
        });
      })
      .catch((err) => console.log(err));

    return () => {
      console.log("canceling");
      cancelAxios();
    };
  }, []);

  function handleLanguageClick() {
    if (i18n.language === "en") {
      i18n.changeLanguage("ar");
      setDirection("rtl");
      moment.locale("ar");
    } else {
      i18n.changeLanguage("en");
      setDirection("ltr");
      moment.locale("en");
    }
    setDateAndTime(moment().format("Do MMMM  YYYY"));
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{}}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              height: "100dvh",
            }}
          >
            <div
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              <div className="content">
                <div>
                  <div
                    dir={direction}
                    style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography variant="h2" sx={{ fontWeight: "600" }}>
                      {t("القاهرة")}
                    </Typography>
                    <Typography variant="h5">{dateAndTime}</Typography>
                  </div>
                </div>
                <hr />

                <div
                  style={{
                    display: "flex",
                    direction: direction,
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" sx={{ textAlign: "right" }}>
                        {temp.currtemp}
                      </Typography>
                      <img
                        src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                        alt={temp.description}
                      />
                    </div>
                    <Typography variant="h6">
                      {temp.description
                        ? t(temp.description.toLowerCase())
                        : ""}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4>
                        {t("الصغرى")}: {temp.mintemp}
                      </h4>
                      <h4 style={{ margin: "0 5px" }}>|</h4>
                      <h4>
                        {t("الكبرى")}: {temp.maxtemp}
                      </h4>
                    </div>
                  </div>
                  <Cloud sx={{ fontSize: "200px", color: "white" }} />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                width: "100%",
                direction: direction,
              }}
            >
              <Button
                variant="text"
                sx={{ color: "white", marginTop: "20px" }}
                onClick={handleLanguageClick}
              >
                {t("English")}
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
