import React from "react";
import Card from "react-bootstrap/Card";


function RecipeSmall(props) {
  //map - iterace přes seznam ingrediencí
  const ingredients = props.recipe.ingredients.map(ingredient => {
    //najde podrobnosti o ingredienci v seznamu všech dle id
    const ingredientDetails = props.ingredientList.find(item => item.id === ingredient.id);
    //vrací množství, jednotku a název ingredience
    return `${ingredient.amount} ${ingredient.unit} ${ingredientDetails ? ingredientDetails.name : ''}`;
  });

  return ( //komponenta malých karet
    <Card className="smallCard">
      <Card.Img className="smallCardImg" variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
      <Card.Body className="smallCardBody">
        <Card.Title className="smallCardTitle">{props.recipe.name}</Card.Title>
        <Card.Text className="smallCardText">
          <ul>
            {ingredients.map((ingredient, index) => ( //mapování ingrediencí a vytvoření seznamu
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecipeSmall;