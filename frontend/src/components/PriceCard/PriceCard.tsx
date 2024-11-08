type PriceCardProps = {
  currency: string;
  price: number;
};

export const PriceCard = ({ currency, price }: PriceCardProps) => {
  return (
    <h3 className="font-bold">
      {currency}: <span className="font-extrabold">{price}</span>
    </h3>
  );
};
