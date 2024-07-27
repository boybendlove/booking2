import Home from "./pages/home/Home";
import Transactions from "./pages/transactions/Transactions";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import UpdateHotel from "./pages/newHotel/UpdateHotel";
import UpdateRoom from "./pages/newRoom/UpdateRoom";
import { useState } from "react";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  console.log(ProtectedRoute)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={<ProtectedRoute> <Home />
                </ProtectedRoute>
              }
            />
            <Route path="getCustomers">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List endpoint="/getCustomers" columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List endpoint="/Hotels" columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="hotels/:productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="newhotels"
                element={
                  <ProtectedRoute>
                    <NewHotel  />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:Id"
                element={
                  <ProtectedRoute>
                    <UpdateHotel  />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="Room">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List endpoint="/Room" columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:Id"
                element={
                  <ProtectedRoute>
                    {/* <Single /> */}
                    <UpdateRoom></UpdateRoom>
                  </ProtectedRoute>
                }
              />
              <Route
                path="newRoom"
                element={
                  <ProtectedRoute>
                    <NewRoom  />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="Transaction"
              element={<ProtectedRoute> < Transactions/>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
