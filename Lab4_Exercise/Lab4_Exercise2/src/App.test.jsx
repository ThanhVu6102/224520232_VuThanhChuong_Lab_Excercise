import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "./App.jsx";
describe("directory behaviour", () => {
  it("opens a deep link", async () => {
    render(
      <MemoryRouter initialEntries={["/people/sp-2"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { name: "Albert Einstein" }),
    ).toBeTruthy();
  });
  it("handles an invalid person", async () => {
    render(
      <MemoryRouter initialEntries={["/people/missing"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole("heading", { name: "404: Person Not Found" }),
    ).toBeTruthy();
  });
  it("navigates through the shared layout", async () => {
    render(
      <MemoryRouter initialEntries={["/people"]}>
        <App />
      </MemoryRouter>,
    );
    await userEvent.click(screen.getByRole("link", { name: "Isaac Newton" }));
    expect(
      await screen.findByRole("heading", { name: "Isaac Newton" }),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: "Isaac Newton" })
        .getAttribute("aria-current"),
    ).toBe("page");
  });
  it("handles an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: "404: Page Not Found" }),
    ).toBeTruthy();
  });
});

it("moves focus to the loaded person heading and updates the document title", async () => {
  render(
    <MemoryRouter initialEntries={["/people/sp-2"]}>
      <App />
    </MemoryRouter>,
  );
  const heading = await screen.findByRole("heading", {
    name: "Albert Einstein",
  });
  expect(document.activeElement).toBe(heading);
  expect(document.title).toBe("Albert Einstein | Lab 4");
});
