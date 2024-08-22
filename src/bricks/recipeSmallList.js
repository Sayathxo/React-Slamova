import React from "react";
import RecipeSmall from "./recipeSmall";
import { Col, Row } from 'react-bootstrap';


function RecipeSmallList(props) {
  return ( //responzivní rozvržení mřížky
    <Row>
      {props.recipeList.map((recipe) => ( //iterace přes seznam receptů pomocí id a jejich vykreslení jako malé karty
        <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
          <RecipeSmall recipe={recipe}  ingredientList={props.ingredientList} />
        </Col>
      ))}
    </Row>
  );
}

export default RecipeSmallList;