import { useState, useEffect, useRef } from "react";
import { getWeather, filteredWeatherData } from "../utils/weatherApi.js";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../utils/constants.js";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import ItemModal from "./ItemModal.jsx";
import "../blocks/app.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {
      F: 999,
    },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothes, setClothes] = useState(defaultClothingItems);

  const modal = useRef(null);

  useEffect(() => {
    if (!modal.current || activeModal === "") return;

    function handleModalOverlayClose(e) {
      if (e.target === e.currentTarget) {
        handleCloseModalWithForm();
      }
    }

    function handleCloseModalEscape(e) {
      if (e.key === "Escape") {
        handleCloseModalWithForm();
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
    getWeather(coordinates, APIkey).then((data) => {
      const filteredData = filteredWeatherData(data);
      setWeatherData(filteredData);
     }).catch((err) => {
      console.log(err);
     })
  }, []);

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleOpenModalWithForm() {
    setActiveModal("form");
  }

  function handleCloseModalWithForm() {
    setActiveModal("");
  }

  return (
    <div className="app">
      <div className="app__content">
        <Header onClick={handleOpenModalWithForm} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          clothes={clothes}
        />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        title="New garment"
        isOpen={activeModal === "form"}
        onClick={handleCloseModalWithForm}
        dom={modal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="name"
          />
        </label>
        <label htmlFor="image" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="image"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__radio-lgd">Select the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              name="temp"
              id="hot"
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              name="temp"
              id="warm"
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              name="temp"
              id="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClick={handleCloseModalWithForm}
        isOpen={activeModal === "preview"}
      />
    </div>
  );
}

export default App;
