import { useMemo, useState } from "react";
import recipes from "../data/recipes.json";
import type { Category, CookingMethod, Recipe } from "../types";
import { RecipeCard } from "../components/RecipeCard";
import { Filters, type DietFilter } from "../components/Filters";

const allRecipes = recipes as Recipe[];

export function Feed() {
  const [diet, setDiet] = useState<DietFilter>("veg");
  const [includeEgg, setIncludeEgg] = useState(false);
  const [category, setCategory] = useState<Category | "all">("all");
  const [method, setMethod] = useState<CookingMethod | "all">("all");

  const filtered = useMemo(() => {
    return allRecipes.filter((r) => {
      const dietMatch =
        diet === "veg"
          ? r.dietType === "veg" || (includeEgg && r.dietType === "egg")
          : r.dietType === "non-veg" || r.dietType === "egg";
      const categoryMatch = category === "all" || r.category === category;
      const methodMatch = method === "all" || r.cookingMethod === method;
      return dietMatch && categoryMatch && methodMatch;
    });
  }, [diet, includeEgg, category, method]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Recipes</h1>
        <p>Browse by diet, dish type, and cooking method.</p>
      </div>

      <Filters
        diet={diet}
        onDietChange={(d) => {
          setDiet(d);
          if (d === "non-veg") setIncludeEgg(false);
        }}
        includeEgg={includeEgg}
        onIncludeEggChange={setIncludeEgg}
        category={category}
        onCategoryChange={setCategory}
        method={method}
        onMethodChange={setMethod}
      />

      {filtered.length === 0 ? (
        <div className="empty-state">No recipes match these filters yet.</div>
      ) : (
        <div className="recipe-grid">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
