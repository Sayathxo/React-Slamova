import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from "./bricks/recipeList"
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const cookbook = {
  name: "Báječná kuchařka"
};

function App() {
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
              {cookbook.name}
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
          <div className="error">
            <div>Nepodařilo se načíst data o receptech nebo ingrediencích.</div>
            <br />
            <pre>{JSON.stringify(recipeLoadCall.error || ingredientLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div className="App">{getRecipe()}</div>;
}

export default App;
