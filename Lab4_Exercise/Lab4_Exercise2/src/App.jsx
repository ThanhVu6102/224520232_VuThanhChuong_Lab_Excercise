import { Routes, Route, NavLink } from "react-router";
import Page from "./components/Page.jsx";
import PeopleLayout from "./components/PeopleLayout.jsx";
export default function App() {
  return (
    <main id="main-content">
      <a className="skip-link" href="#route-heading">
        Skip to page content
      </a>
      <header>
        <p>UIT S3T · Lab 4 · Exercise 1.2</p>
        <h1>People directory and nested routes</h1>
        <p>Vu Thanh Chuong · 24520232</p>
      </header>
      <nav className="top-nav" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/people">People</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Routes>
        <Route
          index
          element={
            <Page title="Welcome">
              <p>
                Open People, then choose a person. Each detail has its own
                shareable URL.
              </p>
            </Page>
          }
        />
        <Route path="people" element={<PeopleLayout />}>
          <Route
            index
            element={
              <Page title="Select a person" className="detail-panel">
                <p>Choose a name from the directory.</p>
              </Page>
            }
          />
        </Route>
        <Route
          path="about"
          element={
            <Page title="About this exercise">
              <p>
                React Router v7, semantic HTML and master-detail navigation. The
                Lab 3 dataset is illustrative.
              </p>
            </Page>
          }
        />
        <Route
          path="*"
          element={<Page title="404: Page Not Found" role="alert" />}
        />
      </Routes>
    </main>
  );
}
