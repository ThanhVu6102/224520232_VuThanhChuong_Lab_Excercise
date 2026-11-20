import { it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "./App.jsx";
vi.mock("./components/PersonDetail.jsx", async () => {
  const { useParams } = await import("react-router");
  return {
    default: function MockDetail() {
      const { id } = useParams();
      if (id === "sp-1") throw new Error("Simulated detail render failure");
      return <h2>Recovered detail</h2>;
    },
  };
});
it("recovers when a different person is selected after a render failure", async () => {
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(
      <MemoryRouter initialEntries={["/people/sp-1"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { name: "Unable to load this page" }),
    ).toBeTruthy();
    await userEvent.click(
      screen.getByRole("link", { name: "Albert Einstein" }),
    );
    expect(
      await screen.findByRole("heading", { name: "Recovered detail" }),
    ).toBeTruthy();
  } finally {
    log.mockRestore();
  }
});
