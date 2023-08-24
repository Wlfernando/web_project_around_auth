export default function Card(props) {
  const {_id: id, name, likes, link, owner} = props.data,
  hasDustbin = owner._id === props.userID,
  isLiked = likes.some(like=> like._id === props.userID);

  function handleClick() {
    props.onCardClick(props.data)
  }

  return(
    <li className="card" key={id}>
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