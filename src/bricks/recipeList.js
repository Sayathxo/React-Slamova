import React from "react";
import { Row, Col } from "react-bootstrap";
import RecipeCard from "./recipeCard";
import '../App.css';



function RecipeList(props) {
    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return (
                <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                </Col>
            );
        });
    }
    return (
        <Row noGutters>
            {getRecipeList(props.recipeList)}
        </Row>
    );
}

export default RecipeList;