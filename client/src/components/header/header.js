import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFinancials } from "../../redux";
import style from "./header.module.css";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../icon/icon";

export const Header = ({ setUserData, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { balance, totalExpenses, totalIncomes } =
    useSelector(selectFinancials);
  const navRef = useRef(null);
  const navigate = useNavigate();
  let timer;

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timer);
    };
  }, [isOpen, timer]);

  const handleLogout = () => {
    fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUserData(null);
      navigate("/auth");
    });
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  const handleMouseEnter = () => {
    clearTimeout(timer);
  };

  return (
    <header className={style.header}>
      <svg
        className={style.logo}
        width="250"
        height="250"
        viewBox="100 20 150 100"
      >
        <defs id="SvgjsDefs1693">
          <linearGradient id="SvgjsLinearGradient1702">
            <stop id="SvgjsStop1703" stop-color="#945f50" offset="0"></stop>
            <stop id="SvgjsStop1704" stop-color="#fcc5b3" offset="0.5"></stop>
            <stop id="SvgjsStop1705" stop-color="#945f50" offset="1"></stop>
          </linearGradient>
          <linearGradient id="SvgjsLinearGradient1706">
            <stop id="SvgjsStop1707" stop-color="#945f50" offset="0"></stop>
            <stop id="SvgjsStop1708" stop-color="#fcc5b3" offset="0.5"></stop>
            <stop id="SvgjsStop1709" stop-color="#945f50" offset="1"></stop>
          </linearGradient>
          <linearGradient id="SvgjsLinearGradient1710">
            <stop id="SvgjsStop1711" stop-color="#945f50" offset="0"></stop>
            <stop id="SvgjsStop1712" stop-color="#fcc5b3" offset="0.5"></stop>
            <stop id="SvgjsStop1713" stop-color="#945f50" offset="1"></stop>
          </linearGradient>
        </defs>
        <g
          id="SvgjsG1694"
          featurekey="symbolContainer"
          transform="matrix(1.2608643796100547,0,0,1.2608643796100547,108.9526972783837,0.036149272872266956)"
          fill="url(#SvgjsLinearGradient1702)"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M104.6 41.3a52.2 52.2 0 0 0-3.5-11.2A51.1 51.1 0 0 0 44.3 1a49.6 49.6 0 0 0-5.7 1.5 49.1 49.1 0 0 0-7.9 2.7A51.6 51.6 0 0 0 6.3 77a53.7 53.7 0 0 0 4.1 6.4 57 57 0 0 0 5 5.7 51.7 51.7 0 0 0 55.3 11.5l3.3-1.4 3-1.5a50.9 50.9 0 0 0 5.8-3.8l2.7-2.1 1.2-1.1 1.1-.9 2-1.8.7-.6.6-.7 1.8-2a48.5 48.5 0 0 0 5.9-8.3 50.4 50.4 0 0 0 5.6-14.7 51.6 51.6 0 0 0 .2-20.4zM87.1 88.6l-1.2 1.1-1.2 1.1-2.6 2.1a49.5 49.5 0 0 1-5.7 3.6l-3 1.5-3.2 1.3-4.9 1.6h-.5a50.9 50.9 0 0 1-20.3.1 51.8 51.8 0 0 1-11.1-3.6A50.5 50.5 0 0 1 22.9 91a52 52 0 0 1-9.1-9.4 50.3 50.3 0 0 1-3.7-5.7c-.6-1-1.1-2-1.6-3.1s-1-2.1-1.3-3.2a50.6 50.6 0 0 1 8.6-50.8l.8-.8.5-.6.6-.6 1.2-1.1 2.4-2.1A50.5 50.5 0 0 1 62.4 3.2a48.5 48.5 0 0 1 14.7 5.2 47 47 0 0 1 8.3 5.8l2 1.8.7.6.6.7 1.8 2a49.7 49.7 0 0 1 11.3 22.9 50.8 50.8 0 0 1-.1 20.2 51.6 51.6 0 0 1-3.6 11 50.2 50.2 0 0 1-6.6 10.5l-2.1 2.4zm-44.9 13a50.1 50.1 0 0 1-13.7-5 51.8 51.8 0 0 1-6.2-4 55.2 55.2 0 0 1-5.5-4.8 49.9 49.9 0 0 1-11-53.2c.4-1.1.9-2.1 1.3-3.1l.6-1.3a50.2 50.2 0 0 0-3.4 11 51.3 51.3 0 0 0 2.4 28.5c.4 1.1.9 2.2 1.4 3.2s1 2.1 1.6 3.1a50.6 50.6 0 0 0 3.7 5.8 51.5 51.5 0 0 0 9.2 9.5 50.9 50.9 0 0 0 10.7 6.5 51 51 0 0 0 28.7 3.9 50.3 50.3 0 0 1-19.8-.1zm61.9-39.9a50.2 50.2 0 0 1-5.5 14.7 48.4 48.4 0 0 1-5.8 8.3l-1.8 2-.6.7-.7.6-1.9 1.7h.2l2.3-2.4 2.1-2.5A51.3 51.3 0 0 0 98.9 74a51.4 51.4 0 0 0 3.2-31.6 49.6 49.6 0 0 0-2.5-8.2 49.4 49.4 0 0 0-3.1-6.5 48.7 48.7 0 0 0-5.9-8.3l-1.8-2-.6-.7-.7-.6-2-1.8A49.9 49.9 0 0 0 77.3 8a49.3 49.3 0 0 0-6.5-3.2 49.8 49.8 0 0 0-8.2-2.6A52.2 52.2 0 0 0 49.9 1a50.8 50.8 0 0 1 22.7 3.2l3.2 1.3 3.1 1.6a50.1 50.1 0 0 1 5.7 3.7l2.6 2.1 1.2 1.1 1.2 1.1 2.3 2.3 2.1 2.4a50.4 50.4 0 0 1 6.5 10.5 51.6 51.6 0 0 1 3.6 11 51.1 51.1 0 0 1 0 20.3z"
          ></path>
        </g>
        <g
          id="SvgjsG1695"
          featurekey="monogramFeature-0"
          transform="matrix(2.4689596945768892,0,0,2.4689596945768892,106.38624216890773,-71.04896389919017)"
          fill="url(#SvgjsLinearGradient1706)"
        >
          <path d="M38.88 33.54 c2.64 0.18 1.14 2.4 -0.24 3.96 c-1.44 1.56 -8.82 7.92 -20.22 17.46 c-5.34 4.5 -14.76 12.66 -17.22 14.64 c3.96 -0.84 11.82 -1.74 21.84 -1.2 c14.94 0.78 27.36 3.36 32.34 7.56 c1.44 1.26 0.6 1.8 -0.54 0.84 c-3.84 -3.3 -18.78 -6.48 -31.86 -7.02 c-9.36 -0.42 -15.72 0.18 -21.96 1.38 c-1.62 0.3 -2.28 -1.38 -0.6 -2.64 c2.22 -1.62 4.14 -4.14 17.34 -14.7 c8.88 -7.08 17.94 -14.88 19.74 -16.86 c1.8 -1.92 1.68 -2.34 0.96 -2.46 c-3.3 -0.3 -12 -0.42 -20.04 0.48 c-16.8 1.86 -17.88 6.24 -15.24 9.12 c0.84 0.9 -0.24 1.56 -1.26 0.84 c-2.16 -1.56 -4.2 -9.06 16.26 -11.16 c8.52 -0.84 16.92 -0.54 20.7 -0.24 z"></path>
        </g>
      </svg>
      {userData && (
        <div className={style.header__contentContainer}>
          <div ref={navRef} className={style.navigationContainer}>
            <button
              className={`${style.burgerMenu} ${isOpen && style.isOpen}`}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav
              onMouseLeave={handleMouseLeave}
              onMouseEnter={handleMouseEnter}
              className={`${style.navigation} ${isOpen && style.isOpen}`}
            >
              <Link to="/">Главная</Link>
              <Link to="/statistics">Статистика</Link>
              <Link to="/user">Профиль</Link>
              <button className={style.logoutBtn} onClick={handleLogout}>
                Выйти
              </button>
            </nav>
          </div>
          <div className={style.financials}>
            <span>Баланс: {balance} ₽</span>
            <span>Доходы: {totalIncomes} ₽</span>
            <span>Расходы: {totalExpenses} ₽</span>
          </div>
          <button
            className={style.userIcon}
            onClick={() => {
              navigate("/user");
              setIsOpen(false);
            }}
          >
            <Icon id="fa-solid fa-user" />
          </button>
        </div>
      )}
    </header>
  );
};
