import React from "react";
import RecipeSmall from "./recipeSmall";
import { Col, Row } from 'react-bootstrap';

function RecipeSmallList(props) {
  return (
    <Row>
      {props.recipeList.map((recipe) => (
        <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <RecipeSmall recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}

export default RecipeSmallList;