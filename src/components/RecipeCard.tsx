import { Link } from "react-router-dom";
import type { Recipe } from "../types";
import { useFavorites } from "../context/FavoritesContext";
import "./RecipeCard.css";

const CATEGORY_LABELS: Record<string, string> = {
  salad: "Salad",
  roll: "Roll",
  "one-pot-rice": "One-Pot Rice",
  marinade: "Marinade",
  "noodles-pasta": "Noodles / Pasta",
  snack: "Snack",
  dessert: "Dessert",
};

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(recipe.id);

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <button
        type="button"
        className={`recipe-card__fav ${fav ? "is-fav" : ""}`}
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(recipe.id);
        }}
      >
        {fav ? "♥" : "♡"}
      </button>
      <div className="recipe-card__category">{CATEGORY_LABELS[recipe.category]}</div>
      <h3 className="recipe-card__name">{recipe.name}</h3>
      <p className="recipe-card__tagline">{recipe.tagline}</p>
      <div className="recipe-card__macros">
        <span>{recipe.macros.calories} cal</span>
        <span>{recipe.macros.protein_g}g protein</span>
        <span>{recipe.macros.carbs_g}g carbs</span>
        <span>{recipe.macros.fat_g}g fat</span>
      </div>
    </Link>
  );
}
