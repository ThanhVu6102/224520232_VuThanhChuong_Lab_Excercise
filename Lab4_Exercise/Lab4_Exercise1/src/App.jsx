import { lazy, Suspense } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router";
import Page from "./components/Page.jsx";
import PeopleLayout from "./components/PeopleLayout.jsx";
import DetailSkeleton from "./components/DetailSkeleton.jsx";
import RouteErrorBoundary from "./components/RouteErrorBoundary.jsx";
const PersonDetail = lazy(() => import("./components/PersonDetail.jsx"));
export default function App() {
  const { pathname } = useLocation();
  return (
    <main id="main-content">
      <a className="skip-link" href="#route-heading">
        Skip to page content
      </a>
      <header>
        <p>UIT S3T · Lab 4 · Exercise 1.1</p>
        <h1>Lazy-loaded people directory</h1>
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
          <Route
            path=":id"
            element={
              <RouteErrorBoundary key={pathname}>
                <Suspense fallback={<DetailSkeleton />}>
                  <PersonDetail />
                </Suspense>
              </RouteErrorBoundary>
            }
          />
        </Route>
        <Route
          path="about"
          element={
            <Page title="About this exercise">
              <p>
                React Router v7, semantic HTML and route-level code splitting.
                The Lab 3 dataset is illustrative.
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
