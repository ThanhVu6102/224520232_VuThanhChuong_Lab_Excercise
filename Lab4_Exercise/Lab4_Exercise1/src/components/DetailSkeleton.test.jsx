import { it, expect, vi } from "vitest";
import { lazy, Suspense } from "react";
import { render, screen, act } from "@testing-library/react";
import DetailSkeleton from "./DetailSkeleton.jsx";
import RouteErrorBoundary from "./RouteErrorBoundary.jsx";
it("announces loading until the deferred chunk resolves", async () => {
  let resolve;
  const chunk = new Promise((done) => {
    resolve = done;
  });
  const Detail = lazy(() => chunk);
  render(
    <Suspense fallback={<DetailSkeleton />}>
      <Detail />
    </Suspense>,
  );
  expect(screen.getByRole("status").textContent).toContain("Loading person");
  expect(document.querySelector('[aria-busy="true"]')).toBeTruthy();
  await act(async () => resolve({ default: () => <h2>Loaded detail</h2> }));
  expect(screen.getByRole("heading", { name: "Loaded detail" })).toBeTruthy();
  expect(screen.queryByRole("status")).toBeNull();
});
it("shows a recoverable error when the chunk rejects", async () => {
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    const Detail = lazy(() => Promise.reject(new Error("Chunk load failed")));
    render(
      <RouteErrorBoundary>
        <Suspense fallback={<DetailSkeleton />}>
          <Detail />
        </Suspense>
      </RouteErrorBoundary>,
    );
    expect(
      await screen.findByRole("heading", { name: "Unable to load this page" }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Reload" })).toBeTruthy();
  } finally {
    log.mockRestore();
  }
});
