import avatar from "../assets/avatar.png";

export default function Sidebar(){
    return (
        <section className="profile__sidebar">
                <img className="profile__avatar" alt="avatar" src={avatar} />
                 <p className="profile__user">Seydou Badiaka</p>
              </section>
    )
}