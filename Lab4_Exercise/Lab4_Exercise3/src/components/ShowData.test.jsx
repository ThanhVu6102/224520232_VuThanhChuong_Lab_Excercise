import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ShowData from "./ShowData.jsx";
it("keeps accessible names unique across multiple inspectors", () => {
  render(
    <>
      <ShowData data={{ fullName: "A" }} />
      <ShowData data={{ fullName: "B" }} />
    </>,
  );
  const regions = screen.getAllByRole("region");
  expect(
    new Set(regions.map((region) => region.getAttribute("aria-labelledby")))
      .size,
  ).toBe(2);
});
