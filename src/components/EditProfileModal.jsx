import ModalWithForm from "./ModalWithForm.jsx";
import { useForm} from "../../src/hooks/useForm.js";

export default function EditProfileModal({isOpen, onClick,  handleOverlayClick, handleProfileDataChange}){
 
     const { values, handleChange, handleReset } = useForm({
    name:"",
    avatar:""
  });  

  const isFormValid = () => {
  return (
    values.name.trim() !== "" &&
    values.avatar.trim() !== "" 
  );
};

function handleSubmit(e){
    handleProfileDataChange(e,values);
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