// React imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//Utils/Api imports
import { getWeather, filteredWeatherData } from "../utils/weatherApi.js";
import { coordinates, APIkey } from "../utils/constants.js";
import {
  getItems,
  deleteItem,
  updateUserData,
  addCardLike,
  removeCardLike,
} from "../utils/api.js";
import { signIn, signUp, getUser } from "../utils/auth.js";
// contexts imports
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
//Components imports
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import Profile from "./Profile.jsx";
import AddItemModal from "./AddItemModal.jsx";
import DeleteModal from "./DeleteModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import LoginModal from "./LoginModal.jsx";
import ProtectedRoute from "./ProtectedRoute";
import EditProfileModal from "./EditProfileModal.jsx";
//css imports
import "../blocks/app.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {
      F: 999,
      C: 999,
    },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothes, setClothes] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    function handleCloseModalEscape(e) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleCloseModalEscape);
    return () => {
      document.removeEventListener("keydown", handleCloseModalEscape);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filteredWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothes(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      return;
    }
    getUser(token)
      .then((res) => {
        setCurrentUser(res);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  }, [isLoggedIn]);

  function handleCurrentTemperatureUnit() {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  }

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleOpenModalWithForm() {
    setActiveModal("form");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function onAddItem(data) {
    setClothes([data, ...clothes]);
    handleCloseModal();
  }

  function handleDeleteModal() {
    setActiveModal("delete");
  }

  function handleDeleteCard(card) {
    const token = localStorage.getItem("jwt");

    deleteItem(card, token)
      .then(() => {
        setClothes(clothes.filter((item) => item._id !== card._id));
        handleCloseModal();
      })
      .catch(console.error);
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      handleCloseModal();
    }
  };

  function handleRegistrationModal() {
    setActiveModal("registermodal");
  }

  function handleLoginModal() {
    setActiveModal("loginmodal");
  }

  function handleEditProfileModal() {
    setActiveModal("editprofilemodal");
  }

  function handleRegistration(e, formdata) {
    e.preventDefault();
    console.log("starting...");
    signUp(formdata)
      .then(() => {
        return signIn({ email: formdata.email, password: formdata.password });
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          handleCloseModal();
        }
      })
      .catch((err) => {
        console.error("Sign in error:", err);
      });
  }

  function handleProfileDataChange(e, formdata) {
    const token = localStorage.getItem("jwt");
    e.preventDefault();
    updateUserData(formdata, token).then((res) => {
      setCurrentUser(res);
      handleCloseModal();
    });
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothes((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothes((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogout = () => {
  // Remove token from localStorage
  localStorage.removeItem("jwt");
  
  // Reset user-related state
  setCurrentUser({});
  setIsLoggedIn(false);
};

 const handleLogin = (e, values) => {
     e.preventDefault();
     signIn(values).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      handleCloseModal();
     })
 }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="app">
        <div className="app__content">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleCurrentTemperatureUnit }}
          >
            <Header
              onClick={handleOpenModalWithForm}
              weatherData={weatherData}
              handleRegistrationModal={handleRegistrationModal}
              handleLoginModal={handleLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                  isLoggedIn={isLoggedIn}
                  onCardLike={handleCardLike}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothes={clothes}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothes={clothes}
                      handleCardClick={handleCardClick}
                      onClick={handleOpenModalWithForm}
                      handleEditProfileModal={handleEditProfileModal}
                      handleLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </CurrentTemperatureUnitContext.Provider>
        </div>
        <AddItemModal
          onAddItem={onAddItem}
          isOpen={activeModal === "form"}
          onClick={handleCloseModal}
          handleOverlayClick={handleOverlayClick}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClick={handleCloseModal}
          isOpen={activeModal === "preview"}
          handleDeleteModal={handleDeleteModal}
        />
        <DeleteModal
          activeModal={activeModal}
          isOpen={activeModal === "delete"}
          handleCloseModal={handleCloseModal}
          handleDeleteCard={handleDeleteCard}
          card={selectedCard}
          clothes={clothes}
        />
        <RegisterModal
          isOpen={activeModal === "registermodal"}
          onClick={handleCloseModal}
          handleOverlayClick={handleOverlayClick}
          handleRegistration={handleRegistration}
        />
        <LoginModal
          isOpen={activeModal === "loginmodal"}
          onClick={handleCloseModal}
          handleOverlayClick={handleOverlayClick}
          handleLogin={handleLogin}
        />
        <EditProfileModal
          isOpen={activeModal === "editprofilemodal"}
          onClick={handleCloseModal}
          handleOverlayClick={handleOverlayClick}
          handleProfileDataChange={handleProfileDataChange}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
