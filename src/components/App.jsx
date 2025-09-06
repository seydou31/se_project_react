import { useState, useEffect, useRef } from "react";
import { getWeather, filteredWeatherData } from "../utils/weatherApi.js";
import {
  coordinates,
  APIkey,
} from "../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext.js";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import Profile from "./Profile.jsx";
import "../blocks/app.css";
import AddItemModal from "./AddItemModal.jsx";
import DeleteModal from "./DeleteModal.jsx";
import { getItems } from "../utils/api.js";

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


  const modal = useRef(null);

  useEffect(() => {
    if (!modal.current || activeModal === "") return;

    function handleModalOverlayClose(e) {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    }

    function handleCloseModalEscape(e) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleCloseModalEscape);
    modal.current.addEventListener("click", handleModalOverlayClose);
    return () => {
      document.removeEventListener("keydown", handleCloseModalEscape);
      modal.current.removeEventListener("click", handleModalOverlayClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filteredWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getItems().then((data) => {
      setClothes(data);
    }).catch(console.error)
  }, [])

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

  function onAddItem(data){
     setClothes([data, ...clothes]);
     handleCloseModal();
  }

    function handleDeleteModal() {
    setActiveModal("delete");
  }

  function handleDeleteCard(card, clothes){
    setClothes(clothes.filter((item) => item._id !== card._id))
    handleCloseModal();
  }



  return (
    <div className="app">
      <div className="app__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleCurrentTemperatureUnit }}
        >
          <Header
            onClick={handleOpenModalWithForm}
            weatherData={weatherData}
            currentTemperatureUnit={currentTemperatureUnit}
            handleCurrentTemperatureUnit={handleCurrentTemperatureUnit}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothes={clothes}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile clothes={clothes} handleCardClick={handleCardClick} onClick={handleOpenModalWithForm} />
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
        dom={modal}
      />
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClick={handleCloseModal}
        isOpen={activeModal === "preview"}
        handleDeleteModal={handleDeleteModal}
      />
     <DeleteModal  activeModal={activeModal}
        isOpen={activeModal === "delete"} 
        handleCloseModal={handleCloseModal}
        handleDeleteCard={handleDeleteCard}
        card={selectedCard}
        clothes={clothes}
        />
        
    </div>
  );
}

export default App;
