import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { UserRecipeState } from "../types";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "recipe-app:user-recipe-state";

function loadAll(): UserRecipeState[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as UserRecipeState[];
  } catch {
    return [];
  }
}

interface FavoritesContextValue {
  favoriteIds: Set<string>;
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipeId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [all, setAll] = useState<UserRecipeState[]>(loadAll);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }, [all]);

  const favoriteIds = new Set(
    all
      .filter((s) => s.userId === user?.id && s.status === "fav")
      .map((s) => s.recipeId)
  );

  const isFavorite = (recipeId: string) => favoriteIds.has(recipeId);

  const toggleFavorite = (recipeId: string) => {
    if (!user) return;
    setAll((prev) => {
      const exists = prev.some(
        (s) => s.userId === user.id && s.recipeId === recipeId && s.status === "fav"
      );
      if (exists) {
        return prev.filter(
          (s) => !(s.userId === user.id && s.recipeId === recipeId && s.status === "fav")
        );
      }
      return [...prev, { userId: user.id, recipeId, status: "fav" }];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
