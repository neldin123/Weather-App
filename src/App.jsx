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

const theme = createTheme({
  typography: {
    fontFamily: "IBM Arabic",
  },
});

const App = () => {
  const [temp, setTemp] = useState({ currtemp: "", mintemp: "", maxtemp: "" });
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=233d5e38f09205ccdbade87fef8add71",
      )
      .then((res) => {
        const currtemp = Math.floor(res.data.main.temp - 272.15);
        const mintemp = Math.floor(res.data.main.temp_min - 272.15);
        const maxtemp = Math.floor(res.data.main.temp_max - 272.15);
        console.log(res.data);
        setTemp({ currtemp: currtemp, mintemp: mintemp, maxtemp: maxtemp });
      });
  }, []);
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
                    dir="rtl"
                    style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography variant="h2" sx={{ fontWeight: "600" }}>
                      القاهرة
                    </Typography>
                    <Typography variant="h4">23/6/2026</Typography>
                  </div>
                </div>
                <hr />

                <div
                  style={{
                    display: "flex",
                    direction: "rtl",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <div>
                      <Typography variant="h1" sx={{ textAlign: "right" }}>
                        {temp.currtemp}
                      </Typography>
                    </div>
                    <Typography variant="h6">broken clouds</Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4>الصغرى: {temp.mintemp}</h4>
                      <h4 style={{ margin: "0 7px" }}>|</h4>
                      <h4>الكبرى: {temp.maxtemp}</h4>
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
                direction: "rtl",
              }}
            >
              <Button variant="text" sx={{ color: "white", marginTop: "20px" }}>
                إنجليزي
              </Button>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
