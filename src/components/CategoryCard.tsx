import Image from "next/image";

export type Category = {
  name: string;
  desc: string;
  ring: string;
  image: string;
  imageAlt: string;
};

type Props = {
  category: Category;
};

export function CategoryCard({ category }: Props) {
  return (
    <article className="tc-card tc-card-hover overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink bg-telecareer-surface">
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <span
          className={`absolute top-3 left-3 tag-pill text-xs shadow-sm ${category.ring}`}
        >
          {category.name}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-telecareer-ink">{category.name}</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{category.desc}</p>
      </div>
    </article>
  );
}
