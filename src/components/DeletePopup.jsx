import { memo } from 'react';
import PopupWithForm from './PopupWithForm.js';

const DeletePopup = memo(({
  isOpen,
  onDelete,
  onClose,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete();
  }

  return (
    <PopupWithForm
      title='¿Estás seguro/a?'
      name='delete'
      btn='Si'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
})

export default DeletePopup