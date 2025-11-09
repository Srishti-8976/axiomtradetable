import { test, expect } from "@playwright/test";

test("homepage displays token table correctly", async ({ page }) => {
  // Load the app and wait for requests to settle
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Table should render
  const table = page.locator("table");
  await expect(table).toBeVisible({ timeout: 15000 });

  // Check there is at least one data row (2 rows = header + 1 data)
  const rows = page.locator("tr");
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThanOrEqual(2);

  // (More robust) also assert first data row is visible
  // If you render <tbody>, this targets body rows only
  const firstDataRow = page.locator("tbody tr").first();
  await expect(firstDataRow).toBeVisible();

  // Verify headers (role-based selectors are cross-browser reliable)
  await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Symbol" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Price" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "% Change" })).toBeVisible();

  // Optional: visual regression (creates/compares baseline)
  await expect(page).toHaveScreenshot("homepage-table.png", { maxDiffPixels: 5 });
});
