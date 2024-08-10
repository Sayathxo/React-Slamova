import React from "react";
import Card from "react-bootstrap/Card";
import '../App.css';

function RecipeCard(props) {
    return (
        <Card className="card">
            <Card.Img className="cardImg" variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
            <Card.Body className="cardBody">
                <Card.Title className="cardTitle">{props.recipe.name}</Card.Title>
                <Card.Text className="cardText">{props.recipe.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;