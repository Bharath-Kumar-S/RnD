type PriceCardProps = {
  pair: string;
  price: number;
};

export const PriceCard = ({ pair, price }: PriceCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20">
      <h2 className="text-xl font-semibold text-blue-200 mb-4">{pair}</h2>
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-bold text-white">
          {price ? (price % 1 === 0 ? price : price.toFixed(6)) : "..."}
        </span>
      </div>
    </div>
  );
};
