import React from "react";
import {
  AvatarNav,
  Avatarka,
  ChangeLanguage,
  ChangeThem,
  HamburgerMenu,
  Settingss,
  SubModal,
  ToggleNav,
} from "../../components";
import "./style.css";
import { Bell, Globe, Settings, X } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [screenSize, setScreenSize] = React.useState(true);
  const { isOpen, open, toggle, close } = useModal();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
  const [isOpenToggleSide, setIsToggleSide] = React.useState(false);
  const [t] = useTranslation();

  React.useEffect(() => {
    if (window.screen.width <= 420 || window.screen.width <= 1000) {
      setScreenSize(false);
    }
  }, []);

  const handleModal = (e) => {
    if (
      e.target.classList[0] == "navbar_lable" ||
      e.target.classList[0] == "navbar_settings" ||
      e.target.classList == "svg-icon"
    ) {
      toggle();
    }
  };

  return (
    <nav className="navbar_header">
      <div></div>

      {screenSize ? (
        <>
          <div className="navbar_left">
            <button
              className="navbar_language"
              onClick={() => setIsLanguageOpen(true)}>
              <Globe /> {t("navbar.language")}
            </button>
            <SubModal
              isModalOpen={isLanguageOpen}
              setIsModalOpen={setIsLanguageOpen}
              title={t("navbar.language")}>
              <ChangeLanguage />
            </SubModal>
            <button className="navbar_notefication">
              <Bell /> {t("navbar.note")}
            </button>
            <div className="navbar_settings" onClick={(e) => handleModal(e)}>
              <Settings className="svg-icon" />
              <span className="navbar_lable">{t("navbar.settings")}</span>
              {isOpen && <Settingss setIsModalOpen={setIsModalOpen} />}
            </div>
            <AvatarNav />
          </div>
        </>
      ) : (
        <>
          <span onClick={() => setIsToggleSide(true)}>
            <HamburgerMenu />
          </span>

          {
            <ToggleNav isOpenToggleSide={isOpenToggleSide}>
              <X
                className="closeToggleSide"
                onClick={() => setIsToggleSide(false)}
              />
              <div className="navbar_left">
                <button
                  className="navbar_language"
                  onClick={() => setIsLanguageOpen(true)}>
                  <Globe /> {t("navbar.language")}
                </button>
                <SubModal
                  isModalOpen={isLanguageOpen}
                  setIsModalOpen={setIsLanguageOpen}
                  title={t("navbar.language")}>
                  <ChangeLanguage />
                </SubModal>
                <button className="navbar_notefication">
                  <Bell /> {t("navbar.note")}
                </button>
                <div
                  className="navbar_settings"
                  onClick={(e) => handleModal(e)}>
                  <Settings className="svg-icon" />
                  <span className="navbar_lable">{t("navbar.settings")}</span>
                  {isOpen && <Settingss setIsModalOpen={setIsModalOpen} />}
                </div>

                <div className="profile_avatar">
                  <Avatarka />
                </div>
              </div>
            </ToggleNav>
          }
        </>
      )}
      <SubModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={t("navbar.setModalthem")}>
        <ChangeThem />
      </SubModal>
    </nav>
  );
};

export default Navbar;
