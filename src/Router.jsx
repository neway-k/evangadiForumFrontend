import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import PostQuestion from "./pages/PostQuestion/PostQuestion";
import Answers from "./pages/Answers/Answers";
import { createContext, useEffect, useState } from "react";
import axios from "./utils/axiosInstance.js";
import { MoonLoader } from "react-spinners";
import AskAI from "./pages/AskAi/AskAi.jsx";
import AiAnswers from "./pages/AiAnswers/AiAnswers.jsx";

export const AppContext = createContext();

const Router = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  

useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token"); // get token

        if (!token) { // no token, redirect
          navigate("/login"); // go to login
          return; // stop execution
        }
        setLoading(true); // start loading

        const { data } = await axios.get("/user/check", { // fetch user
          headers: {
            Authorization: `Bearer ${token}`, // auth header
          },
        });
        setUser(data); // set user state
        setLoading(false); // stop loading
      } catch (error) { // handle error
        const message = error?.response?.data?.error; // get error msg

        // Handle expired or invalid token
        if (
          message === "Token expired" ||
          message === "Invalid authentication"
        ) {
          localStorage.removeItem("token"); // remove token
          navigate("/login"); // redirect login
        } else {
          console.error("Unexpected error:", message); // log error
        }
      } finally {
        setLoading(false); // ensure loading stops
      }
    };

    checkUser(); // run check
  }, []);
  // console.log(user) // debug


  return (
    <AppContext value={{ user }}>
      {loading ? (
        <MoonLoader />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-question" element={<PostQuestion />} />
          <Route path="/answers/:questionid" element={<Answers />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/ai-history" element={<AiAnswers />} />
        </Routes>
      )}
    </AppContext>
  );
};

export default Router;
