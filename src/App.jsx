import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  typography: {
    fontFamily: "IBM Arabic",
  },
});

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Typography variant="h1">السلام عليكم</Typography>
      </ThemeProvider>
    </div>
  );
};

export default App;
