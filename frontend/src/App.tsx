import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuAppBar from './components/MenuAppBar';
import Login from './components/Login/';
import Register from './components/Register/';
// import Protected from './components/Protected';
import Content from './components/Content';
import './App.css';
import useLoginStore from './stores/loginstore';
import useLoadingStore from './stores/loadingstore';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E1E2F',
    },
    text: {
      primary: '#EAEAEA',
    },
  },
});

function App() {
  const { loading, setLoading } = useLoadingStore();
  const { setUser, checkRefreshToken } = useLoginStore();
  // First thing, check if a refreshtoken exist
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await checkRefreshToken(); // Wait for the promise to resolve
        setUser({ accessToken: result.accessToken });
      } catch (err) {
        toast.error('Error while refreshing token!');
      } finally {
        setLoading(false); // Set loading to false after the asynchronous operation completes
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading ...</div>

  return (

    <div className="app">
      <ThemeProvider theme={theme}>

        <ToastContainer />
        <BrowserRouter>
          <MenuAppBar />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="protected" element={<Protected />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>

  );
}

export default App;
