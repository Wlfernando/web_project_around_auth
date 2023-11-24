import { memo } from 'react';
import PopupWithForm from './PopupWithForm.jsx';

const DeletePopup = memo(({
  isOpen,
  onUpdate,
  onClose,
}) => {
  function handleSubmit(setText) {
    onUpdate((delayTimer) => setTimeout(setText, delayTimer)).handleDelete();
  }

  return (
    <PopupWithForm
      title='¿Estás seguro/a?'
      name='delete'
      textBtn='Si'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  )
})

export default DeletePopup