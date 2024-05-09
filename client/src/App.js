import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./pages/navbar";
import Profile from "./pages/Profile";
import { useAuthContext } from "./context/useAuthContext";

function App() {
  const {user} = useAuthContext();
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/register" element={!user ? <Register/> : <Navigate to="/profile"/> } />
         <Route path="/login" element={!user ? <Login/> : <Navigate to="/profile"/> } />
         <Route path="/profile" element={user ? <Profile/> : <Navigate to="/login"/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
