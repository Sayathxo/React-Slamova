import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


function RecipeCard(props) {
    // nastavuje zda je popis receptu rozbalený nebo ne, výchozí ne
    const [isExpanded, setIsExpanded] = useState(false); 

    // přepíná stav isExpanded mezi true a false
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        // komponenta karet s podmíněným vykreslením, které zobrazuje celý "description"
        <Card className="recipe-card">
            <Card.Img className="cardImg" variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
            <Card.Body className="cardBody">
                <Card.Title className="cardTitle">{props.recipe.name}</Card.Title>
                <Card.Text className="cardText"> 
                    {isExpanded ? props.recipe.description : `${props.recipe.description.substring(0, 200)}...`}
                </Card.Text>
                {props.recipe.description.length > 200 && (
                    <Button variant="link" className="toggle-btn" onClick={handleToggleExpand}>
                        {isExpanded ? "\u00AB" : "\u00BB"}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;