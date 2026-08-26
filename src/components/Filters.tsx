import type { Category, CookingMethod } from "../types";
import "./Filters.css";

export type DietFilter = "veg" | "non-veg";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "salad", label: "Salad" },
  { value: "roll", label: "Roll" },
  { value: "one-pot-rice", label: "One-Pot Rice" },
  { value: "marinade", label: "Marinade" },
  { value: "noodles-pasta", label: "Noodles / Pasta" },
  { value: "snack", label: "Snack" },
  { value: "dessert", label: "Dessert" },
];

const METHODS: { value: CookingMethod; label: string }[] = [
  { value: "air-fryer", label: "Air-Fryer" },
  { value: "stovetop", label: "Stovetop" },
  { value: "one-pot", label: "One-Pot" },
  { value: "no-cook", label: "No-Cook" },
  { value: "oven", label: "Oven" },
];

interface FiltersProps {
  diet: DietFilter;
  onDietChange: (diet: DietFilter) => void;
  includeEgg: boolean;
  onIncludeEggChange: (value: boolean) => void;
  category: Category | "all";
  onCategoryChange: (value: Category | "all") => void;
  method: CookingMethod | "all";
  onMethodChange: (value: CookingMethod | "all") => void;
}

export function Filters({
  diet,
  onDietChange,
  includeEgg,
  onIncludeEggChange,
  category,
  onCategoryChange,
  method,
  onMethodChange,
}: FiltersProps) {
  return (
    <div className="filters">
      <div className="filters__row">
        <div className="diet-toggle" role="group" aria-label="Diet filter">
          <button
            type="button"
            className={diet === "veg" ? "is-active" : ""}
            onClick={() => onDietChange("veg")}
          >
            Veg
          </button>
          <button
            type="button"
            className={diet === "non-veg" ? "is-active" : ""}
            onClick={() => onDietChange("non-veg")}
          >
            Non-veg
          </button>
        </div>

        {diet === "veg" && (
          <label className="include-egg">
            <input
              type="checkbox"
              checked={includeEgg}
              onChange={(e) => onIncludeEggChange(e.target.checked)}
            />
            Include egg recipes
          </label>
        )}
      </div>

      <div className="filters__row">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "all")}
          aria-label="Category filter"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={method}
          onChange={(e) => onMethodChange(e.target.value as CookingMethod | "all")}
          aria-label="Cooking method filter"
        >
          <option value="all">All methods</option>
          {METHODS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
