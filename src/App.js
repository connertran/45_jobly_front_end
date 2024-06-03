import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./HomePage";
import List from "./List";
import CompJobs from "./CompJobs";
import LoginForm from "./LoginForm";
import NotFound from "./NotFound";
import NavBar from "./NavBar";
import SignUpForm from "./SignUpForm";
import ProfileForm from "./ProfileForm";
import JoblyApi from "./api";

function App() {
  const initialState = {
    username: "",
    token: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [loggedIn, UpdateStatus] = useState(false);
  const [currentUser, updateCurrentUser] = useState(initialState);

  useEffect(() => {
    async function checkUser() {
      const userInfo = getTokenFromLocalStorage("userInfo");
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          JoblyApi.token = parsedUserInfo.token;
          const dbUser = await JoblyApi.getCurrentUser(parsedUserInfo.username);
          updateCurrentUser({ ...dbUser, token: parsedUserInfo.token });
          UpdateStatus(true);
        } catch (e) {
          console.log(e);
        }
      }
    }
    checkUser();
  }, []);

  async function register(username, password, firstName, lastName, email) {
    const resToken = await JoblyApi.signup({
      username,
      password,
      firstName,
      lastName,
      email,
    });
    JoblyApi.token = resToken;
    const newUpdate = {
      username: username,
      token: resToken,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    UpdateStatus(true);
    updateCurrentUser(newUpdate);
    saveTokenToLocalStorage({ username: username, token: resToken });
  }
  const saveTokenToLocalStorage = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };
  const getTokenFromLocalStorage = (LocalStorageObjKey) => {
    return localStorage.getItem(LocalStorageObjKey);
  };
  async function login(username, password) {
    const resToken = await JoblyApi.login({
      username,
      password,
    });
    JoblyApi.token = resToken;
    UpdateStatus(true);
    updateCurrentUser({
      username: username,
      token: resToken,
    });
    saveTokenToLocalStorage({ username: username, token: resToken });
  }
  function logout(navigate) {
    JoblyApi.token = "";
    UpdateStatus(false);
    updateCurrentUser(initialState);
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar userStatus={loggedIn} logout={logout} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage userStatus={loggedIn} name={currentUser.username} />
            }
          />
          <Route
            path="/companies"
            element={
              <List
                username={currentUser.username}
                userStatus={loggedIn}
                category={"Companies"}
                key="companies"
              />
            }
          />
          <Route
            path="/companies/:name"
            element={
              <CompJobs userStatus={loggedIn} username={currentUser.username} />
            }
          />
          <Route
            path="/jobs"
            element={
              <List
                username={currentUser.username}
                userStatus={loggedIn}
                category={"Jobs"}
                key="jobs"
              />
            }
          />
          <Route
            path="/login"
            element={<LoginForm userStatus={loggedIn} login={login} />}
          />
          <Route
            path="/signup"
            element={<SignUpForm userStatus={loggedIn} register={register} />}
          />
          <Route
            path="/profile"
            element={
              <ProfileForm currentUser={currentUser} userStatus={loggedIn} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
