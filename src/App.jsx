import { Navigate, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaHourglassHalf,
  //   FaUserClock,
  FaCashRegister,
  FaMoneyBill,
} from "react-icons/fa";

export default function App() {
  const { t, i18n } = useTranslation();
  const token = JSON.parse(localStorage.getItem("loginInfo"))?.token;
  if (!token) {
    return <Navigate to="/login" />;
  }
  function handelSwitch() {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  }
  return (
    <div
      className="app-container"
      style={{
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        textAlign: i18n.language === "ar" ? "right" : "left",
      }}
    >
      <nav className="app-navbar">
        {/* change this button an acouple of houers  */}
        <button
          onClick={() => {
            handelSwitch();
          }}
        >
          Switch Langues
        </button>
        <NavLink
          to="."
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaHome className="nav-icon" /> {t('home')}
        </NavLink>

        <NavLink
          to="completed-invoices"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaFileInvoiceDollar className="nav-icon" /> {t('completedInvoices')}
        </NavLink>

        <NavLink
          to="pending-invoices"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaHourglassHalf className="nav-icon" /> {t('pendingInvoices')}
        </NavLink>

        {/* <NavLink
          to="custmers-debts"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaUserClock className="nav-icon" /> Custmers Debts
        </NavLink> */}

        <NavLink
          to="shift-start"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaCashRegister className="nav-icon" /> {t('shiftStart')}
        </NavLink>

        <NavLink
          to="shift-close"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaMoneyBill className="nav-icon" /> {t('shiftClose')}
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
