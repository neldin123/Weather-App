import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "IBM",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">App</div>;
    </ThemeProvider>
  );
};

export default App;
