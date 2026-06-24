import Button from "../ui/Button";

type TrendingPaginationProps = {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
};

export default function TrendingPagination({
  count,
  activeIndex,
  onDotClick,
}: TrendingPaginationProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <Button
          key={index}
          onClick={() => onDotClick(index)}
          className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? "w-6 bg-red-500 hover:bg-red-text" : "w-2 bg-primary-text/40 hover:bg-primary-text"}`}
        />
      ))}
    </div>
  );
}
