import React from "react";
import Card from "react-bootstrap/Card";
import '../App.css';

function RecipeSmall(props) {
  return (
    <Card className="smallCard">
      <Card.Img className="smallCardImg" variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
      <Card.Body className="smallCardBody">
        <Card.Title className="smallCardTitle">{props.recipe.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default RecipeSmall;