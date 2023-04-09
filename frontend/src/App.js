import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import Home from './component/Home/Home';
import {BrowserRouter} from 'react-router-dom'
import './App.css'

const theme = createTheme({
  status: {
    danger: orange[500],
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      
        <Header/>
        <Home/>
        <Footer/>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
