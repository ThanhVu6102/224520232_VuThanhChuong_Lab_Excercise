import { Component } from "react";
import Page from "./Page.jsx";
export default class RouteErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <Page
        title="Unable to load this page"
        role="alert"
        className="detail-panel"
      >
        <p>Check your connection and reload.</p>
        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </Page>
    ) : (
      this.props.children
    );
  }
}
