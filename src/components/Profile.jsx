import { memo, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Profile = memo(({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
}) => {
  const {name, about, avatar} = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <div
        className="profile__avatar"
        style={{backgroundImage: `url(${avatar})`}}
      >
        <div
          onClick={onEditAvatarClick}
          className="profile__avatar-edit"
        />
      </div>
      <div className="profile__info">
        <p className="profile__user-name">{name}</p>
        <button
          onClick={onEditProfileClick}
          className="button profile__edit-button"
        />
        <p className="profile__about-me">{about}</p>
      </div>
      <button
        onClick={onAddPlaceClick}
        className="button profile__add-button"
      />
    </section>
  )
})

export default Profile