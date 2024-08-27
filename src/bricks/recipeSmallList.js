import React from "react";
import RecipeSmall from "./recipeSmall";
import { Col, Row } from 'react-bootstrap';


function RecipeSmallList({ recipeList, ingredientList, onEditClick }) {
  return ( //responzivní rozvržení mřížky
    <Row>
      {recipeList.map((recipe) => ( //iterace přes seznam receptů pomocí id a jejich vykreslení jako malé karty a editace karty na onClick
        <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <RecipeSmall recipe={recipe}  ingredientList={ingredientList} onEditClick={onEditClick}/>
        </Col>
      ))}
    </Row>
  );
}

export default RecipeSmallList;