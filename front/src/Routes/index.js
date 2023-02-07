import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import { BrowserRouter, Routes } from "react-router-dom";
import Login from "../Pages/Login/index.js";
import About from "../Pages/About/index.js";
import Layout from "../Layouts/index.js";

import Lectures from "../Pages/Lectures/index.js";
import Lecture from "../Pages/Lecture/index.js";
import Code from "../Pages/Code/index.js";
import Score from "../Pages/Score/index.js";
import { BASE_URL } from "../config.js";
import CreateUser from "../Pages/CreateUser/index.js";
import Materials from "../Pages/Materials/index.js";
import Material from "../Pages/Material/index.js";
import DashScore from "../Pages/DashScore/index.js";
import DashScores from "../Pages/DashScores/index.js";
import Enrollemnt from "../Pages/Enrollment/index.js";
const Router = () => {
  const [isLogined, setIsLogined] = React.useState(false);
  const [userType, setUserType] = React.useState("");
  const [name, setName] = React.useState("");
  const [userId, setUserId] = React.useState("");

  useEffect(() => {
    fetch(BASE_URL + "/token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setName(data.data.name);
          setUserType(data.data.user_type);
          setIsLogined(true);
          setUserId(data.data._id);
        } else {
          setIsLogined(false);
          console.log(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLogined(false);
      });
  }, []);

  if (isLogined) {
    //userType 별로 다른 페이지 보여주기 : 조건부 렌더링
    return (
      <Layout
        userType={userType}
        name={name}
        isLogined={isLogined}
        setIsLogined={setIsLogined}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Lectures userType={userType} userId={userId} />}
            />
            <Route
              path="/dashscores"
              element={<DashScores userType={userType} userId={userId} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/materials"
              element={<Materials userType={userType} userId={userId} />}
            />
            <Route
              path="/material/:lectureId/:lectureTitle"
              element={<Material userId={userId} userType={userType} />}
            />
            <Route
              path="/lecture/:lectureId/:lectureTitle"
              element={<Lecture userId={userId} userType={userType} />}
            />
            <Route
              path="/dashscore/:lectureId/:lectureTitle"
              element={<DashScore userId={userId} userType={userType} />}
            />
            <Route path="/code/:submissionId" element={<Code />} />
            <Route path="/score/:submissionId" element={<Score />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route
              path="/enrollment/:lectureId/:lectureTitle"
              element={<Enrollemnt />}
            />
          </Routes>
        </BrowserRouter>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    );
  }
};

export default Router;
