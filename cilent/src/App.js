import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { HotelSearchProvider } from "./components/searchItem/searchContext.jsx"
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./components/navbar/login.jsx";
import Register from "./components/navbar/Register.jsx";
import Booking from "./pages/booking/booking.jsx";
import History from "./pages/History/history.jsx";

function App() {
  const token = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Xử lý khi đăng nhập thành công
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div>
      {isLoggedIn === true ? (
        <div>
    <HotelSearchProvider> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </BrowserRouter>
    </HotelSearchProvider>
    </div>): (
          // Nếu chưa đăng nhập, hiển thị trang đăng nhập
          <div className="App">
            <HotelSearchProvider>
            <BrowserRouter>
            <Routes>
            <Route path="/" element= {<Login onLogin={handleLogin} />}>
              {/* <Login onLogin={handleLogin} /> */}
            </Route>
          </Routes>
          </BrowserRouter>
          </HotelSearchProvider>
          </div>
        )};
    </div>
  );
}

export default App;
