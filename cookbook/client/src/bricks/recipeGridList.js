import React from "react";
import RecipeCard from "./recipeCard";
import { Col, Row } from 'react-bootstrap';


function RecipeGridList({ recipeList, onEditClick }) {
    return ( //responzivní rozvržení mřížky
      <Row>
        {recipeList.map((recipe) => ( //iterace přes seznam receptů pomocí id a jejich vykreslení jako karty a editace karty na onClick
          <Col xs={12} sm={6} md={4} lg={3} key={recipe.id}>
            <RecipeCard recipe={recipe} onEditClick={onEditClick}/>
          </Col>
        ))}
      </Row>
    );
  }

export default RecipeGridList;