type PriceCardProps = {
  currency: string;
  price: number;
};

export const PriceCard = ({ currency, price }: PriceCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20">
      <h2 className="text-xl font-semibold text-blue-200 mb-4">{currency}</h2>
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-bold text-white">
          {price ? price.toFixed(4) : "..."}
        </span>
      </div>
    </div>
  );
};
