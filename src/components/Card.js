import { useContext, memo } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = memo(({
  data,
  onCardClick,
  onCardLike,
  onDelete
})=> {
  const
    {_id: userId} = useContext(CurrentUserContext),

    {name, likes, link, owner, _id: cardId} = data,

    hasDustbin = owner._id === userId,
    isLiked = likes.some(({ _id }) => _id === userId),
    likeStyle = isLiked
      ? 'button card__like-button card__like-button_active'
      : 'button card__like-button';

  function handleClick() {
    onCardClick({name, link})
  }

  function handleLikeClick() {
    onCardLike(isLiked, cardId)
  }

  function handleDelete() {
    onDelete(cardId)
  }

  return(
    <li className="card">
      <img
        onClick={handleClick}
        className="card__image"
        src={link}
        alt={name}
      />
      {
        hasDustbin &&
        <button
          onClick={handleDelete}
          className="button card__trash-button"
        />
      }
      <h2 className="card__place-name">{name}</h2>
      <div className="card__likes">
        <button
          onClick={handleLikeClick}
          className={likeStyle}
        />
        <p className="card__likes-count">{likes.length || undefined}</p>
      </div>
    </li>
  )
})

export default Card