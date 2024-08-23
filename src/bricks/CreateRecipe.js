import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { units } from "./units"; 

function CreateRecipe({ show, handleClose, ingredientList }) {
  const [recipeName, setRecipeName] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredientId: "", amount: "", unit: "" },
  ]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value,
    };
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredientId: "", amount: "", unit: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newRecipe = {
      name: recipeName,
      instructions: recipeInstructions,
      ingredients: ingredients.filter(
        (ingredient) =>
          ingredient.ingredientId && ingredient.amount && ingredient.unit
      ),
    };

    console.log(newRecipe);

    // Reset formuláře
    setRecipeName("");
    setRecipeInstructions("");
    setIngredients([{ ingredientId: "", amount: "", unit: "" }]);

    // Zavřít modální okno
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Přidat nový recept</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label><strong>Název receptu</strong></Form.Label>
            <Form.Control
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><strong>Postup receptu</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={recipeInstructions}
              onChange={(e) => setRecipeInstructions(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Label>Ingredience</Form.Label>
          <Row className="mb-3">
            <Col><strong>Ingredience</strong></Col>
            <Col><strong>Množství</strong></Col>
            <Col><strong>Jednotka</strong></Col>
          </Row>
          {ingredients.map((ingredient, index) => (
            <Row key={index} className="mb-2 g-0">
              <Col>
                <Form.Select
                  value={ingredient.ingredientId}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredientId", e.target.value)
                  }
                >
                  <option value="">Vyberte ingredienci</option>
                  {ingredientList.map((ingredientOption) => (
                    <option key={ingredientOption.id} value={ingredientOption.id}>
                      {ingredientOption.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Množství"
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                />
              </Col>
              <Col>
                <Form.Select
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                >
                  <option value="">Vyberte jednotku</option>
                  {units.map((unit, unitIndex) => (
                    <option key={unitIndex} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          ))}
          <Button
            className="button-create-recipe"
            onClick={addIngredient}
          >
            Přidat ingredienci
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zavřít
          </Button>
          <Button type="submit" className="button-create-recipe">
            Přidat recept
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateRecipe;
