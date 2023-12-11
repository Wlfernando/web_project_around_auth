import { memo, useContext } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { PopupOpenContext } from '../contexts/PopupOpenContext.js';

const DeletePopup = memo(({
  onUpdate,
}) => {
  const { remove } = useContext(PopupOpenContext);

  function handleSubmit(setBtn) {
    onUpdate((delayTimer) => setTimeout(setBtn, delayTimer)).handleDelete();
  }

  return (
    <PopupWithForm
      title='¿Estás seguro/a?'
      name='delete'
      btnText='Si'
      isOpen={remove}
      onSubmit={handleSubmit}
    />
  )
})

export default DeletePopup