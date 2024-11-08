// src/components/PriceCard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PriceCard } from "./PriceCard";

describe("PriceCard", () => {
  it("renders the currency and price correctly", () => {
    render(<PriceCard currency="USD" price={100} />);

    expect(screen.getByText("USD:")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("applies the correct font styles", () => {
    render(<PriceCard currency="EUR" price={200} />);

    const currencyElement = screen.getByText("EUR:");
    const priceElement = screen.getByText("200");

    expect(currencyElement).toHaveClass("font-bold");
    expect(priceElement).toHaveClass("font-extrabold");
  });

  it("should match snapshots", () => {
    const { container } = render(<PriceCard currency="GBP" price={300} />);
    expect(container).toMatchSnapshot();
  });
});
