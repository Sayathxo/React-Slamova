import { useEffect, useState } from "react";
import RecipeList from "../bricks/recipeList";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeListAll() {
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });
  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setRecipeLoadCall({ state: "error", error: responseJson });
        } else {
          setRecipeLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        setRecipeLoadCall({ state: "error", error });
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setIngredientLoadCall({ state: "error", error: responseJson });
        } else {
          setIngredientLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        setIngredientLoadCall({ state: "error", error });
      });
  }, []);

  function getRecipe() {
    switch (recipeLoadCall.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <>
            <header className="App-header">
              Recepty
            </header> 
            <RecipeList recipeList={recipeLoadCall.data}
                        ingredientList={ingredientLoadCall.data} />
            <footer>
              Vytvořila &copy; Lenka Slámová 2024
            </footer>
          </>
        );
      case "error":
        return (
          <>
            <header className="App-header">
              Recepty
            </header>
            <div className="error">
              <div>Nepodařilo se načíst data o receptech.</div>
            </div>
            <footer>
              Vytvořila &copy; Lenka Slámová 2024
            </footer>
          </>
        );
      default:
        return null;
    }
  }

  return <div className="App">{getRecipe()}</div>;
}

export default RecipeListAll;
