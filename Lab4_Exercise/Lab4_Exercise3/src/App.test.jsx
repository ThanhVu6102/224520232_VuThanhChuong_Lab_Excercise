import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";
import { validateForm, initialValues } from "./validation.js";
describe("form contract", () => {
  it("rejects empty and mismatched fields", () => {
    expect(Object.keys(validateForm(initialValues))).toHaveLength(4);
    expect(
      validateForm({
        fullName: "Chuong",
        email: "a@b.com",
        password: "password1",
        confirmPassword: "different",
      }),
    ).toEqual({ confirmPassword: "Passwords must match." });
  });
  it("blocks invalid submit and focuses first field", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(
      screen.queryByRole("heading", { name: "Submitted data" }),
    ).toBeNull();
    expect(document.activeElement).toBe(screen.getByLabelText("Full name"));
    expect(
      screen.getByLabelText("Full name").getAttribute("aria-invalid"),
    ).toBe("true");
  });
  it("submits valid data without exposing passwords, then resets", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText("Full name"), "Vu Thanh Chuong");
    await user.type(screen.getByLabelText("Email"), "chuong@example.com");
    await user.type(
      screen.getByLabelText("Password", { exact: true }),
      "password1",
    );
    await user.type(screen.getByLabelText("Confirm password"), "password1");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(
      screen.getByRole("heading", { name: "Submitted data" }),
    ).toBeTruthy();
    expect(document.querySelector(".inspector").textContent).not.toContain(
      "password1",
    );
    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByLabelText("Full name").value).toBe("");
    expect(
      screen.queryByRole("heading", { name: "Submitted data" }),
    ).toBeNull();
  });
  it("revalidates confirm password when password changes", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText("Password", { exact: true }),
      "password1",
    );
    await user.type(screen.getByLabelText("Confirm password"), "password1");
    await user.tab();
    await user.type(screen.getByLabelText("Password", { exact: true }), "x");
    expect(screen.getByText("Passwords must match.")).toBeTruthy();
  });
});
