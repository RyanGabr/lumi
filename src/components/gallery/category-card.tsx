interface CategoryCardProps {
  name: string;
  color: string;
}

export function CategoryCard({ name, color }: CategoryCardProps) {
  return (
    <div className="w-[1fr] h-44 rounded-3xl bg-foreground/5 flex flex-col justify-between transition-all hover:bg-foreground/7 select-none">
      <div className="p-4 bg-foreground/7 rounded-t-3xl">
        <div data-color={color} className="size-3 rounded-full" />
      </div>
      <div className="p-5">
        <span className="font-medium text-foreground/60 text-sm">{name}</span>
      </div>
    </div>
  );
}
