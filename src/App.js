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
  // konstanty k uchovávání stavu načítání receptů/ingrediencí (výchozí stav je pending)
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });
  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });

  //Načtení seznamu receptů při prvním vykreslení komponenty
  useEffect(() => {
    //volání API metodou GET
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    })
        //Pokud je odpověď úspěšná, uloží data do recipeLoadCall success, jinak error a uloží chybu
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setRecipeLoadCall({ state: "error", error: responseJson });
        } else {
          setRecipeLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => { //když dojde k chybě při volání API
        console.error('Error during fetch:', error);
        setRecipeLoadCall({ state: "error", error });
      });
  }, []);

  //Načtení seznamu ingrediencí při prvním vykreslení komponenty -> vše jinak podobně jako u receptů výše
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

  //funkce rozhoduje, co se zobrazí na základě stavu načítání receptů
  function getRecipe() {
    switch (recipeLoadCall.state) {
      case "pending":
        return ( // zobrazí ikonku načítání
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
            <div>Upsík dupsík, něco se pokazilo a nenačetla se data o receptech. Dnes bude asi k večeři "co dům dal".</div>
          </div>
        );
      default:
      return null;
    }
  }

  return <div className="App">{getRecipe()}</div>;
}

export default App;
