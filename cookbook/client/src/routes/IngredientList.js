import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import ListGroup from 'react-bootstrap/ListGroup';

function IngredientList() {
  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
    data: null,
  });

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
      .catch((error) => {
        console.error("Error during fetch:", error);
        setIngredientLoadCall({ state: "error", error });
      });
  }, []);

  function getIngredients() {
    switch (ingredientLoadCall.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <ListGroup>
            {ingredientLoadCall.data.map((ingredient) => (
              <ListGroup.Item key={ingredient.id}>
                {ingredient.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        );
      case "error":
        return (
          <div className="error">
            <div>Nepodařilo se načíst data o ingrediencích.</div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="App">
      <header className="App-header">Seznam ingrediencí</header>
      {getIngredients()}
      <footer>Vytvořila &copy; Lenka Slámová 2024</footer>
    </div>
  );
}

export default IngredientList;
