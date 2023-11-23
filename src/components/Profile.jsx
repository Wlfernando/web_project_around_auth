import { memo, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Profile = memo(({
  onOpen,
}) => {
  const {name, about, avatar} = useContext(CurrentUserContext);

  function handleClick(e) {
    const aPopup = e.target.className.match(/profile__(\w+)/)[1];

    onOpen(aPopup)
  }

  return (
    <section className="profile">
      <div
        className="profile__avatar"
        style={{backgroundImage: `url(${avatar})`}}
      >
        <div
          onClick={handleClick}
          className="profile__avatar-edit"
        />
      </div>
      <div className="profile__info">
        <p className="profile__user-name">{name}</p>
        <button
          onClick={handleClick}
          className="button profile__edit-button"
        />
        <p className="profile__about-me">{about}</p>
      </div>
      <button
        onClick={handleClick}
        className="button profile__add-button"
      />
    </section>
  )
})

export default Profile