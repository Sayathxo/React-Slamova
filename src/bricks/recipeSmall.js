import React from "react";
import Card from "react-bootstrap/Card";
import '../App.css';

function RecipeSmall(props) {
  const ingredients = props.recipe.ingredients.map(ingredient => {
    const ingredientDetails = props.ingredientList.find(item => item.id === ingredient.id);
    return `${ingredient.amount} ${ingredient.unit} ${ingredientDetails ? ingredientDetails.name : ''}`;
  });

  return (
    <Card className="smallCard">
      <Card.Img className="smallCardImg" variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
      <Card.Body className="smallCardBody">
        <Card.Title className="smallCardTitle">{props.recipe.name}</Card.Title>
        <Card.Text className="smallCardText">
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RecipeSmall;