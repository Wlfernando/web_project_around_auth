import Header from './components/Header.js';

function App() {
  return (
      <div className="page">
        <Header />
        <main className="content">
          <section className="profile">
            <div className="profile__avatar">
              <div className="profile__avatar-edit"></div>
            </div>
            <div className="profile__info">
              <p className="profile__user-name"></p>
              <button className="button profile__edit-button"></button>
              <p className="profile__about-me"></p>
            </div>
            <div className="popup">
              <form
                className="popup__container profile-form"
                name="profileForm"
                novalidate
              >
                <fieldset className="popup__content">
                  <h3 className="popup__title">Editar Perfil</h3>
                  <input
                    className="popup__item"
                    type="text"
                    id="profile-name"
                    name="name"
                    value=""
                    placeholder="Nombre"
                    required
                    minlength="2"
                    maxlength="40"
                  />
                  <span className="popup__item-error profile-name-error"></span>
                  <input
                    className="popup__item"
                    type="text"
                    id="about-me"
                    name="about"
                    value=""
                    placeholder="Acerca de mí"
                    required
                    minlength="2"
                    maxlength="200"
                  />
                  <span className="popup__item-error about-me-error"></span>
                  <button
                    type="submit"
                    className="button button__submit"
                    name="saveBtn"
                  >
                    Guardar
                    <div className="button__submit_processing">Guardando...</div>
                  </button>
                </fieldset>
                <button
                  type="button"
                  className="button button__close button__close_place_form"
                ></button>
              </form>
            </div>
            <button className="button profile__add-button"></button>
            <div className="popup">
              <form
                className="popup__container image-form"
                name="cardForm"
                novalidate
              >
                <fieldset className="popup__content">
                  <h3 className="popup__title">Nuevo Lugar</h3>
                  <input
                    className="popup__item"
                    type="text"
                    id="image-name"
                    name="name"
                    value=""
                    placeholder="Título"
                    minlength="2"
                    maxlength="30"
                  />
                  <span className="popup__item-error image-name-error"></span>
                  <input
                    className="popup__item"
                    type="url"
                    id="image-src"
                    name="link"
                    required
                    value=""
                    placeholder="Enlace de la imagen"
                  />
                  <span className="popup__item-error image-src-error"></span>
                  <button type="submit" className="button button__submit">
                    Crear
                    <div className="button__submit_processing">Guardando...</div>
                  </button>
                </fieldset>
                <button
                  type="button"
                  className="button button__close button__close_place_form"
                ></button>
              </form>
            </div>
            <div className="popup">
              <figure className="popup__image-container">
                <img className="popup__image" src=" " alt=" " />
                <figcaption className="popup__title-image"></figcaption>
                <button
                  type="button"
                  className="button button__close button__close_place_image"
                ></button>
              </figure>
            </div>
          </section>
          <ul className="cards"></ul>
          <div className="popup">
            <form className="popup__container popup__delete-form" name="deleteForm">
              <fieldset className="popup__content">
                <h3 className="popup__title">¿Estás seguro/a?</h3>
                <button type="submit" className="button button__submit">
                  Si
                  <div className="button__submit_processing">Guardando...</div>
                </button>
              </fieldset>
              <button
                type="button"
                className="button button__close button__close_place_form"
              ></button>
            </form>
          </div>
          <div className="popup">
            <form className="popup__container popup__avatar-form" name="avatarForm" novalidate>
              <fieldset className="popup__content">
                <h3 className="popup__title">Cambiar foto de perfil</h3>
                <input
                  className="popup__item"
                  type="url"
                  id="avatar"
                  name="avatar"
                  value=""
                  required
                  placeholder="Enlace del avatar"
                />
                <span className="popup__item-error avatar-error"></span>
                <button
                  type="submit"
                  className="button button__submit"
                  name="saveBtn"
                >
                  Guardar
                  <div className="button__submit_processing">Guardando...</div>
                </button>
              </fieldset>
              <button
                type="button"
                className="button button__close button__close_place_form"
              ></button>
            </form>
          </div>
          <div className="popup">
            <div className="popup__container popup__error">
              <p className="popup__text-error"></p>
              <button
                  type="button"
                  className="button button__close button__close_place_form"
                ></button>
            </div>
          </div>
        </main>
        <footer className="footer">
          <p className="footer__copyright">&copy; 2023. Fernando A. Malfavón</p>
        </footer>
      </div>
  );
}

export default App;
