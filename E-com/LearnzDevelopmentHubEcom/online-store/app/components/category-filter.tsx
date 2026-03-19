"use client";

export default function CategoryFilter({
  categories,
  activeSlug,
  onSelect,
}: any) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        className={`btn btn-sm ${!activeSlug ? "btn-primary" : "btn-ghost"}`}
        onClick={() => onSelect(undefined)}
      >
        All
      </button>

      {categories.map((cat: any) => (
        <button
          key={cat.id}
          className={`btn btn-sm ${activeSlug === cat.slug ? "btn-primary" : "btn-ghost"}`}
          onClick={() => onSelect(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
