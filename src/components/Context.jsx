import { memo } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupOpenContext } from '../contexts/PopupOpenContext';
import { CloseContext } from '../contexts/CloseContext';
import { MssgContext } from '../contexts/MssgContext';
import { RouteContext, routeDev } from '../contexts/RouteContext';

const Context = memo(({
  children,
  currentUser,
  isOpen,
  onClose,
  onMssg,
}) => {
  return(
    <RouteContext.Provider value={routeDev}>
      <CurrentUserContext.Provider value={currentUser}>
        <PopupOpenContext.Provider value={isOpen}>
          <CloseContext.Provider value={onClose}>
            <MssgContext.Provider value={onMssg}>
              {children}
            </MssgContext.Provider>
          </CloseContext.Provider>
        </PopupOpenContext.Provider>
      </CurrentUserContext.Provider>
    </RouteContext.Provider>
  )
})

export default Context