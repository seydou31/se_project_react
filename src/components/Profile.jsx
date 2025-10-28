import avatar from "../assets/avatar.png";
import ItemCard from './ItemCard.jsx';
import '../blocks/profile.css';
import Sidebar from "./SideBar.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Profile({clothes, handleCardClick, onClick, handleEditProfileModal, handleLogout}) {
  return (
    <div className="profile">
      <Sidebar onClick={handleLogout} handleEditProfileModal={handleEditProfileModal} />
      <ClothesSection clothes={clothes} handleCardClick={handleCardClick} onClick={onClick} />
    </div>
  );
}
