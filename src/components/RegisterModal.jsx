import ModalWithForm from "./ModalWithForm.jsx";
import { useForm} from "../../src/hooks/useForm.js";

export default function RegisterModal({isOpen, onClick,  handleOverlayClick, handleRegistration, handleSideLogin}) {

   const { values, handleChange, handleReset } = useForm({
    email: "",
    password: "",
    name:"",
    avatar:""
  });  


 const isFormValid = () => {
  return (
    values.name.trim() !== "" &&
    values.avatar.trim() !== "" &&
    values.email.trim() !== "" &&
    values.password.trim() !== ""
  );
};

function handleSubmit(e){
    handleRegistration(e,values).then(() => {
     handleReset();
  }).catch(console.error)
}
  

  return (
    <ModalWithForm
     handleOverlayClick={handleOverlayClick}
      buttonText="Sign up"
      title="Sign up"
      alternate="or Log in"
      isOpen={isOpen}
      onClick={onClick}
      onSubmit={handleSubmit}
      isFormValid={isFormValid()}
      handleSideModal={handleSideLogin}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="username" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className="modal__input"
          id="username"
          placeholder="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          name="avatar"
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="avatar url"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
