import '../blocks/profile.css';
import Sidebar from "./SideBar.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Profile({clothes, handleCardClick, onClick, handleEditProfileModal, handleLogout, isLoggedIn, handleCardLike}) {
  return (
    <div className="profile">
      <Sidebar onClick={handleLogout} handleEditProfileModal={handleEditProfileModal} />
      <ClothesSection handleCardLike={handleCardLike} clothes={clothes} handleCardClick={handleCardClick} onClick={onClick} isLoggedIn={isLoggedIn}/>
    </div>
  );
}
