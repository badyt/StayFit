import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuAppBar from './components/MenuAppBar';
import Navigation from './components/Navigation';
import Login from './components/Login/Login';
import Register from './components/Register';
// import Protected from './components/Protected';
import Content from './components/Content';
import './App.css';
import useLoginStore from './stores/loginstore';
import useLoadingStore from './stores/loadingstore';
function App() {
  const { loading, setLoading } = useLoadingStore();
  const { setUser, checkRefreshToken } = useLoginStore();
  // First thing, check if a refreshtoken exist
  useEffect(() => {
    try {
      checkRefreshToken().then(result => {
        setUser({ accessToken: result.accessToken});
      })
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Error while refreshing token!');
    }
  }, []);

  if (loading) return <div>Loading ...</div>

  return (

    <div className="app">
      <ToastContainer />
      <BrowserRouter>
        {/* <Navigation /> */}
        <MenuAppBar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="protected" element={<Protected />} /> */}
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
