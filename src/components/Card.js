import {useContext} from 'react';
import { CurrentUserContext } from './context/CurrentUserContext';

export default function Card({
  data: {name, likes, link, owner},
  onCardClick
}) {

  const {_id: ID} = useContext(CurrentUserContext),

  hasDustbin = owner._id === ID,
  isLiked = likes.some(like=> like._id === ID)

  function handleClick() {
    onCardClick({name, link})
  }

  return(
    <li className="card">
      <img onClick={handleClick} className="card__image" src={link} alt={name} />
      {hasDustbin && <button className="button card__trash-button" />}
      <h2 className="card__place-name">{name}</h2>
      <div className="card__likes">
        <button className={'button card__like-button ' + (isLiked && 'card__like-button_active')} />
        <p className="card__likes-count">{likes.length || undefined}</p>
      </div>
    </li>
  )
}