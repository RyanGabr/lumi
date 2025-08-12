interface CategoryCardProps {
  image_quantity: number;
  category_name: string;
}

export function CategoryCard({ category_name, image_quantity }: CategoryCardProps) {
  return (
    <div className="w-[1fr] h-52 rounded-3xl border border-border bg-foreground/5 flex flex-col justify-between p-3 transition-all hover:bg-foreground/7">
      <div className="bg-foreground/7 rounded-full px-3 py-1.5 w-fit text-xs font-semibold text-foreground/60">
        {image_quantity} imagens
      </div>
      <div className="p-2">
        <span className="font-medium text-foreground/60">
          {category_name}
        </span>
      </div>
    </div>
  );
}
