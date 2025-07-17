import { Navigate, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaHourglassHalf,
  //   FaUserClock,
  FaCashRegister,
  FaHourglassEnd,
} from "react-icons/fa";

export default function App() {
  const token = JSON.parse(localStorage.getItem("loginInfo"))?.token;
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="app-container">
      <nav className="app-navbar">
        <NavLink
          to="."
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaHome className="nav-icon" /> Home
        </NavLink>

        <NavLink
          to="completed-invoices"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaFileInvoiceDollar className="nav-icon" /> Completed Invoices
        </NavLink>

        <NavLink
          to="pending-invoices"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaHourglassHalf className="nav-icon" /> Pending Invoices
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
          <FaCashRegister className="nav-icon" /> Shift Start
        </NavLink>

        <NavLink
          to="shift-close"
          className={({ isActive }) => (isActive ? "active-navLink" : null)}
        >
          <FaHourglassEnd className="nav-icon"/> Shift Close
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
