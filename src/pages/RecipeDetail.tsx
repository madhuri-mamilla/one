import { Link, useParams } from "react-router-dom";
import recipes from "../data/recipes.json";
import type { Recipe } from "../types";
import { useFavorites } from "../context/FavoritesContext";
import "./RecipeDetail.css";

const allRecipes = recipes as Recipe[];

const CATEGORY_LABELS: Record<string, string> = {
  salad: "Salad",
  roll: "Roll",
  "one-pot-rice": "One-Pot Rice",
  marinade: "Marinade",
  "noodles-pasta": "Noodles / Pasta",
  snack: "Snack",
  dessert: "Dessert",
};

const METHOD_LABELS: Record<string, string> = {
  "air-fryer": "Air-Fryer",
  stovetop: "Stovetop",
  "one-pot": "One-Pot",
  "no-cook": "No-Cook",
  oven: "Oven",
};

const WHEN_LABELS: Record<string, string> = {
  "night-before": "Night before",
  weekend: "On the weekend",
};

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = allRecipes.find((r) => r.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!recipe) {
    return (
      <div className="page">
        <p className="empty-state">Recipe not found.</p>
        <Link to="/">← Back to recipes</Link>
      </div>
    );
  }

  const fav = isFavorite(recipe.id);

  return (
    <div className="page recipe-detail">
      <Link to="/" className="recipe-detail__back">
        ← Back to recipes
      </Link>

      <div className="recipe-detail__header">
        <div>
          <div className="recipe-detail__tags">
            <span>{CATEGORY_LABELS[recipe.category]}</span>
            <span>{METHOD_LABELS[recipe.cookingMethod]}</span>
            <span className="recipe-detail__diet">{recipe.dietType}</span>
          </div>
          <h1>{recipe.name}</h1>
          <p className="recipe-detail__tagline">{recipe.tagline}</p>
        </div>
        <button
          type="button"
          className={`recipe-detail__fav ${fav ? "is-fav" : ""}`}
          onClick={() => toggleFavorite(recipe.id)}
        >
          {fav ? "♥ Saved to Favorites" : "♡ Add to Favorites"}
        </button>
      </div>

      {recipe.healthySwap && (
        <div className="recipe-detail__swap">
          <strong>Healthy swap:</strong> {recipe.healthySwap}
        </div>
      )}

      <div className="recipe-detail__meta">
        <div>
          <span className="label">Servings</span>
          <span>{recipe.servings}</span>
        </div>
        <div>
          <span className="label">Prep time</span>
          <span>{recipe.prepTimeMins} min</span>
        </div>
        <div>
          <span className="label">Cook time</span>
          <span>{recipe.cookTimeMins} min</span>
        </div>
      </div>

      <div className="recipe-detail__macros">
        <div>
          <span className="label">Calories</span>
          <span>{recipe.macros.calories}</span>
        </div>
        <div>
          <span className="label">Protein</span>
          <span>{recipe.macros.protein_g}g</span>
        </div>
        <div>
          <span className="label">Carbs</span>
          <span>{recipe.macros.carbs_g}g</span>
        </div>
        <div>
          <span className="label">Fat</span>
          <span>{recipe.macros.fat_g}g</span>
        </div>
        <div>
          <span className="label">Fiber</span>
          <span>{recipe.macros.fiber_g}g</span>
        </div>
      </div>

      <div className="recipe-detail__body">
        <section>
          <h2>Ingredients</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                <span className="ingredient-qty">{ing.quantity}</span> {ing.name}
                {ing.optional && <em> (optional)</em>}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Steps</h2>
          <ol className="step-list">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      {recipe.prepAhead.length > 0 && (
        <section className="recipe-detail__prep-ahead">
          <h2>Prep-ahead</h2>
          <ul>
            {recipe.prepAhead.map((p, i) => (
              <li key={i}>
                <span className="prep-when">{WHEN_LABELS[p.when]}:</span> {p.task}
                {p.storesFor && <span className="prep-stores"> — stores {p.storesFor}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
