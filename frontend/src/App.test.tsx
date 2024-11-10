import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { useGetPrice } from "./hooks/api/useGetPrice";
import { vi } from "vitest";

vi.mock("./hooks/api/useGetPrice", () => ({
  useGetPrice: vi.fn(),
}));

describe("App Component", () => {
  it("displays loading message when data is being fetched", async () => {
    (useGetPrice as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error message when there is an error fetching data", async () => {
    (useGetPrice as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<App />);

    expect(screen.getByText("Error fetching data.")).toBeInTheDocument();
  });

  it("displays price cards when data is successfully fetched", async () => {
    const mockData = {
      TONUSDT: 1.23,
      USDTTON: 0.81,
    };
    (useGetPrice as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<App />);

    expect(screen.getAllByText("TON/USDT")[1]).toBeInTheDocument();
    expect(screen.getByText("1.230000")).toBeInTheDocument();
    expect(screen.getByText("USDT/TON")).toBeInTheDocument();
    expect(screen.getByText("0.810000")).toBeInTheDocument();
  });

  it("changes the currency when the dropdown is updated", async () => {
    const mockData = {
      ETHBTC: 1,
      BTCETH: 0.81,
    };
    (useGetPrice as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<App />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "ETH/BTC" },
    });

    expect(screen.getByText("ETH/BTC Price")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("BTC/ETH")).toBeInTheDocument();
    expect(screen.getByText("0.810000")).toBeInTheDocument();
    expect(screen.getAllByText("ETH/BTC")[0]).toBeInTheDocument();
  });
});
