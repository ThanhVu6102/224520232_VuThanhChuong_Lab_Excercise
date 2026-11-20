import { NavLink, Outlet } from "react-router";
import { people } from "../data/people.js";
export default function PeopleLayout() {
  return (
    <section className="people-frame">
      <nav className="sidebar" aria-label="People">
        <ul>
          {people.map((p) => (
            <li key={p.id}>
              <NavLink
                to={"/people/" + p.id}
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                {p.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <section className="detail-slot" aria-label="Person details">
        <Outlet />
      </section>
    </section>
  );
}
