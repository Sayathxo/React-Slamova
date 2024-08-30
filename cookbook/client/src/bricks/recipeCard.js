import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaEdit } from 'react-icons/fa';
import { useUser } from "../UserProvider";

function RecipeCard({ recipe, onEditClick }) {
    const { isAuthorized } = useUser(); // Použití stavu autorizace z UserProvider
    // nastavuje zda je popis receptu rozbalený nebo ne, výchozí ne
    const [isExpanded, setIsExpanded] = useState(false);

    // přepíná stav isExpanded mezi true a false
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        // komponenta karet s podmíněným vykreslením, které zobrazuje celý "description"
        <Card className="recipe-card">
            <Card.Img className="cardImg" variant="top" src={recipe.imgUri} alt={recipe.name} />
            <Card.Body className="cardBody">
                <Card.Title className="cardTitle">{recipe.name}</Card.Title>
                <Card.Text className="cardText">
                    {isExpanded ? recipe.description : `${recipe.description.substring(0, 200)}...`}
                </Card.Text>
                {recipe.description.length > 200 && (
                    <Button variant="link" className="toggle-btn" onClick={handleToggleExpand}>
                        {isExpanded ? "\u00AB" : "\u00BB"}
                    </Button>
                )}
                {isAuthorized && (
                    <Button variant="primary" className="edit-btn" onClick={() => onEditClick(recipe)}>
                        <FaEdit />
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;