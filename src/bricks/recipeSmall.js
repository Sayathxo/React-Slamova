import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';

function RecipeSmall({ recipe, ingredientList, onEditClick }) {
  // Ověření, že props.recipe a props.recipe.ingredients existují
  if (!recipe || !recipe.ingredients || !Array.isArray(recipe.ingredients)) {
    return <div>Loading...</div>;
  }
   // Ověření, že props.ingredientList existuje a je to pole
   if (!ingredientList || !Array.isArray(ingredientList)) {
    return <div>Loading...</div>;
  }
  //map - iterace přes seznam ingrediencí
  const ingredients = recipe.ingredients.map(ingredient => {
    //najde podrobnosti o ingredienci v seznamu všech dle id
    const ingredientDetails = ingredientList.find(item => item.id === ingredient.id);
    //vrací množství, jednotku a název ingredience
    return `${ingredient.amount} ${ingredient.unit} ${ingredientDetails ? ingredientDetails.name : ''}`;
  });

  return ( //komponenta malých karet
    <Card className="smallCard">
      <Card.Img className="smallCardImg" variant="top" src={recipe.imgUri} alt={recipe.name} />
      <Card.Body className="smallCardBody">
        <Card.Title className="smallCardTitle">{recipe.name}</Card.Title>
        <Card.Text className="smallCardText">
          <ul>
            {ingredients.map((ingredient, index) => ( //mapování ingrediencí a vytvoření seznamu
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </Card.Text>
        <Button variant="primary" className="edit-btn" onClick={() => onEditClick(recipe)}>
          <FaEdit />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeSmall;