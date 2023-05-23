import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
import Home from "./pages/home/Home"
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import Signup from "./pages/Auth/SignUp";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Auth";

const App = () => {
const user = useSelector((state) => state.authReducer.authData);
  return (
    <div
      className="App"
    >
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <SignUp />}
        />
        <Route
          path="/home"
          element={user ? <Home /> :  <SignUp />}
        />
        {/* <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> :  <SignUp />}
        /> */}


        <Route
          path="/signup"
          element={user ? <Navigate to="../home" /> :  <SignUp />}
        />

          <Route
          path="/login"
          element={ <Login />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> :  <SignUp />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Theres nothing here!</p>
            </main>
          }
        />


      </Routes>
    </div>
  );
}

export default App