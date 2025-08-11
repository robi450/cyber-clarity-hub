import { FaBriefcase, FaHome, FaUser } from "react-icons/fa"; // icons
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  const links = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Personal", path: "/personal", icon: <FaUser /> },
    { label: "Consulting", path: "/consulting", icon: <FaBriefcase /> },
  ];

  return (
    <nav
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 20px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--muted)",
      }}
    >
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: location.pathname === link.path ? "cyan" : "white",
            fontWeight: location.pathname === link.path ? "bold" : "normal",
            textDecoration: "none",
          }}
        >
          {link.icon}
          {link.label}
        </Link>
      ))}
    </nav>
  );
}



