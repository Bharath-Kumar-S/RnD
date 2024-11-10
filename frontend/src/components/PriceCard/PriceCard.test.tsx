// src/components/PriceCard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PriceCard } from "./PriceCard";

describe("PriceCard", () => {
  it("renders the currency and price correctly with decimals", () => {
    render(<PriceCard currency="USD" price={100} />);

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders the currency and price correctly without decimals", () => {
    render(<PriceCard currency="USD" price={10.7834} />);

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("10.783400")).toBeInTheDocument();
  });

  it("applies the correct font styles", () => {
    render(<PriceCard currency="EUR" price={200} />);

    const currencyElement = screen.getByText("EUR");
    const priceElement = screen.getByText("200");

    expect(currencyElement).toHaveClass("font-semibold");
    expect(priceElement).toHaveClass("font-bold");
  });

  it("should match snapshots", () => {
    const { container } = render(<PriceCard currency="GBP" price={300} />);
    expect(container).toMatchSnapshot();
  });
});
