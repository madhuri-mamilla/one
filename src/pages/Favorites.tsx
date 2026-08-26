import recipes from "../data/recipes.json";
import type { Recipe } from "../types";
import { RecipeCard } from "../components/RecipeCard";
import { useFavorites } from "../context/FavoritesContext";

const allRecipes = recipes as Recipe[];

export function Favorites() {
  const { favoriteIds } = useFavorites();
  const favorites = allRecipes.filter((r) => favoriteIds.has(r.id));

  return (
    <div className="page">
      <div className="page-header">
        <h1>Favorites</h1>
        <p>Recipes you've saved for later.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          No favorites yet — tap the heart on a recipe card to save it here.
        </div>
      ) : (
        <div className="recipe-grid">
          {favorites.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
