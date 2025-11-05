import { useEffect } from "react";
import ModalWithForm from "./ModalWithForm.jsx";
import { useForm} from "../../src/hooks/useForm.js";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfileModal({isOpen, onClick,  handleOverlayClick, handleProfileDataChange}){
 
     const { values, setValues,  handleChange, handleReset } = useForm({
    name:"",
    avatar:""
  });  

const {currentUser} = useContext(CurrentUserContext);

 useEffect(() => {
  if (isOpen && currentUser) {
    
    setValues({
      name: currentUser.name || '' ,
      avatar: currentUser.avatar || '',
    });
  }
}, [isOpen, currentUser]);

  const isFormValid = () => {
  return (
    values.name.trim() !== "" &&
    values.avatar.trim() !== "" 
  );
};

function handleSubmit(e){
    handleProfileDataChange(e,values).then(() => {
      handleReset();
    }).catch(console.error)
    
}

    return (
        <ModalWithForm
             handleOverlayClick={handleOverlayClick}
              buttonText="Save changes"
              title="Change Profile data"
              isOpen={isOpen}
              onClick={onClick}
              isFormValid={isFormValid()}
              onSubmit={handleSubmit}
            >
              <label htmlFor="editname" className="modal__label">
                Name
                <input
                  name="name"
                  type="text"
                  className="modal__input"
                  id="editname"
                  placeholder="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="editavatar" className="modal__label">
                Avatar
                <input
                  name="avatar"
                  type="url"
                  className="modal__input"
                  id="editavatar"
                  placeholder="avatar url"
                  value={values.avatar}
                  onChange={handleChange}
                />
              </label>
            </ModalWithForm>
    )
}