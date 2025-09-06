import ModalWithForm from "./ModalWithForm.jsx";
import { useForm } from "../../src/hooks/useForm.js";
import { addItem } from "../utils/api.js";
import { useState } from "react";

export default function AddItemModal({ isOpen, onClick, dom , onAddItem}) {
  const { values, handleChange, handleReset } = useForm({
    name: "",
    imageUrl: "",
    weather: ""
  });
  
 const [errors, setErrors] =  useState({});
 



 function validate(){
    let newErrors = {};
    if(!values.name) {newErrors.name = 'Name is required';}
     if(!values.imageUrl) {newErrors.imageUrl = 'URL is required';}
     if(!values.weather) {newErrors.weather = 'Please select a weather type';}  
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
  }

  

  function handleSubmit(e){
     e.preventDefault();
    if (validate()){
        addItem(values).then((data) => {
        onAddItem(data)
        handleReset();
    }).catch(console.error) 
}
  }

  const isFormValid = () => {
  return (
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    values.weather !== ""
  );
};

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClick={onClick}
      dom={dom}
      onSubmit={handleSubmit}
      isFormValid={isFormValid()}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
          
        />
      </label>
      {errors.name && <p className="modal__validation">{errors.name}</p>}
      <label htmlFor="image" className="modal__label">
        Image
        <input
          name="imageUrl"
          type="url"
          className="modal__input"
          id="image"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      {errors.imageUrl && <p className="modal__validation">{errors.imageUrl}</p>}
      <fieldset className="modal__radio-btns">
        <legend className="modal__radio-lgd">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="hot"
            value="hot"
            onChange={handleChange}
            checked={values.weather === 'hot'}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="warm"
            value="warm"
            onChange={handleChange}
             checked={values.weather === 'warm'}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            name="weather"
            id="cold"
            value="cold"
            onChange={handleChange}
             checked={values.weather === 'cold'}
          />
          Cold
        </label>
        {errors.weather && <p className="modal__validation">{errors.weather}</p>}
      </fieldset>
    </ModalWithForm>
  );
}
