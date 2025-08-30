import { Navigate, NavLink } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
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
  function handelSwitch(e) {
    // const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(e);
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
        <div key={i18n.language} className="language-switcher">
          <select id="lang" onChange={(e) => handelSwitch(e.target.value)}>
            {i18n.language === "en" ? (
              <>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </>
            ) : (
              <>
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </>
            )}
          </select>
          {/* {i18n.language === "en" ? (
            <ReactCountryFlag
              countryCode="US"
              svg
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
          ) : (
            <ReactCountryFlag
              countryCode="SY"
              svg
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
          )} */}
        </div>
        <div className="nav-links">
          <NavLink
            to="."
            className={({ isActive }) => (isActive ? "active-navLink" : null)}
          >
            <FaHome className="nav-icon" /> {t("home")}
          </NavLink>

          <NavLink
            to="completed-invoices"
            className={({ isActive }) => (isActive ? "active-navLink" : null)}
          >
            <FaFileInvoiceDollar className="nav-icon" />{" "}
            {t("completedInvoices")}
          </NavLink>

          <NavLink
            to="pending-invoices"
            className={({ isActive }) => (isActive ? "active-navLink" : null)}
          >
            <FaHourglassHalf className="nav-icon" /> {t("pendingInvoices")}
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
            <FaCashRegister className="nav-icon" /> {t("shiftStart")}
          </NavLink>

          <NavLink
            to="shift-close"
            className={({ isActive }) => (isActive ? "active-navLink" : null)}
          >
            <FaMoneyBill className="nav-icon" /> {t("shiftClose")}
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
