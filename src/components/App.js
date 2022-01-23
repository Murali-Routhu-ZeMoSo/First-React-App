import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import "../css/app.css";
import { v4 as uuidv4 } from "uuid";
import RecipeEdit from "./recipeEdit";

export const RecipeContext = React.createContext();

const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  console.log(selectedRecipe);

  useEffect(() => {
    const recipeJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJson != null) setRecipes(JSON.parse(recipeJson));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChnage,
  };

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "instr",
      ingredients: [
        {
          id: uuidv4(),
          name: "name",
          amount: "1 tbs",
        },
      ],
    };

    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChnage(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    cookTime: "1:45",
    servings: 3,
    instructions:
      "1.Put salt on chicken\n2.Put salt on chicken\n3.Put salt on chicken",
    ingredients: [
      {
        id: 1,
        name: "Chickern",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Pork Chicken",
    cookTime: "3:45",
    servings: 4,
    instructions: "1.Put salt on pork\n2.Put it in oven\n3.Put it in a jar",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 pounds",
      },
      {
        id: 2,
        name: "paprika",
        amount: "2Tbs",
      },
    ],
  },
];

export default App;
