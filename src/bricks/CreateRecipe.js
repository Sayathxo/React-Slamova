import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { units } from "./units"; 

//Props: show - pro zobrazení modál.okna), handleClose - zavření, ingredientList - seznam možných ingrediencí
function CreateRecipe({ show, handleClose, ingredientList }) {
  // správa komponent
  const [recipeName, setRecipeName] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredientId: "", amount: "", unit: "" },
  ]);

  // validování vstupu od uživatele
  const [validated, setValidated] = useState(false);

  // aktualizuje pole určité ingredience v seznamu 
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value,
    };
    setIngredients(newIngredients);
  };
  
  // přidá novou prázdnou ingredienci do seznamu
  const addIngredient = () => {
    setIngredients([...ingredients, { ingredientId: "", amount: "", unit: "" }]);
  };
  
  // odebere prázdnou ingredienci ze seznamu
  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  // vytvoří objekt newRecipe se jménem, instrukcemi a filtrovaným seznamem ingrediencí
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

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
    setValidated(false);

    // Zavřít modální okno
    handleClose();
  };

  // rendrování vlastní komponenty s tlačítky na přidání ingrediencí, zavření a odeslání formuláře
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Přidat nový recept</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label><strong>Název receptu</strong></Form.Label>
            <Form.Control
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              required
              maxLength={50}
            />
            <Form.Control.Feedback type="invalid">
              Musíš přeci pojmenovat své veledílo, ale zase se moc nerozepisuj.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><strong>Postup receptu</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={recipeInstructions}
              onChange={(e) => setRecipeInstructions(e.target.value)}
              required
              maxLength={500}
            />
            <Form.Control.Feedback type="invalid">
              Vím, že to je pro tebe úplně jasná věc, ale nám by se nějaký postup hodil. Maximálně 500 znaků prosím.
            </Form.Control.Feedback>
          </Form.Group>
          <Row className="mb-3">
            <Col><strong>Ingredience</strong></Col>
            <Col><strong>Množství</strong></Col>
            <Col><strong>Jednotka</strong></Col>
            <Col></Col> {/* Prázdný sloupec pro tlačítko "Odebrat" */}
          </Row>
          {ingredients.map((ingredient, index) => (
            <Row key={index} className="mb-2 g-0">
              <Col>
                <Form.Select
                  value={ingredient.ingredientId}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredientId", e.target.value)
                  }
                  required
                >
                  <option value="">Vyberte ingredienci</option>
                  {ingredientList.map((ingredientOption) => (
                    <option key={ingredientOption.id} value={ingredientOption.id}>
                      {ingredientOption.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Chybí ti surovina.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Množství"
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                  required
                  min={1}
                  max={1000}
                />
                <Form.Control.Feedback type="invalid">
                  Kolik tam toho dáš? (1-1000).
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Select
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                  required
                >
                  <option value="">Vyberte jednotku</option>
                  {units.map((unit, unitIndex) => (
                    <option key={unitIndex} value={unit}>
                      {unit}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Lžičku nebo vagón?
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => removeIngredient(index)}>
                  Odebrat
                </Button>
              </Col>
            </Row>
          ))}
          <Button className="button-create-recipe" onClick={addIngredient}>
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
