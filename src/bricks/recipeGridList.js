import React from "react";
import RecipeCard from "./recipeCard";
import { Col, Row } from 'react-bootstrap';


function RecipeGridList(props) {
    return ( //responzivní rozvržení mřížky
      <Row>
        {props.recipeList.map((recipe) => ( //iterace přes seznam receptů pomocí id a jejich vykreslení jako karty
          <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    );
  }

export default RecipeGridList;