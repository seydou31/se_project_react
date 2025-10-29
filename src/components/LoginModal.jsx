import ModalWithForm from "./ModalWithForm.jsx";
import { useForm } from "../../src/hooks/useForm.js";

export default function LoginModal({ isOpen, onClick, handleOverlayClick, handleLogin }) {
  const { values, handleChange, handleReset } = useForm({
    email: "",
    password: "",
  });

   const isFormValid = () => {
  return (
  
    values.email.trim() !== "" &&
    values.password.trim() !== ""
  );
};

const handleSubmit = (e) => {
  handleLogin(e, values).then(() => {
     handleReset();
  })
}

  return (
    <ModalWithForm
      handleOverlayClick={handleOverlayClick}
      buttonText="Sign in"
      title="Sign in"
      isOpen={isOpen}
      onClick={onClick}
      onSubmit={handleSubmit}
      isFormValid={isFormValid()}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
