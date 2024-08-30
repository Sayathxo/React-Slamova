import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { units } from "./units";
import { useUser } from "../UserProvider";

//Props: show - pro zobrazení modál.okna), handleClose - zavření, ingredientList - seznam možných ingrediencí
function CreateRecipe({ show, handleClose, ingredientList, recipe }) {
  // kontrola přihlášení uživatele- použi tí UserContextu
  const { isAuthorized } = useUser();
  // defaultní nastavení formuláře
  const defaultForm = {
    recipeName: "",
    recipeInstructions: "",
    recipeImgUri: "",
    ingredients: [{ ingredientId: "", amount: "", unit: "" }],
  };

  // správa komponent
  const [recipeName, setRecipeName] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [recipeImgUri, setRecipeImgUri] = useState(defaultForm.recipeImgUri);
  const [ingredients, setIngredients] = useState([
    { ingredientId: "", amount: "", unit: "" },
  ]);

  // validování vstupu od uživatele
  const [validated, setValidated] = useState(false);

  // uchovává informace o aktuální verzi získávání dat z formuláře
  const [recipeAddCall, setRecipeAddCall] = useState({ state: 'inactive' });

  // vyskakovací potvrzení o odeslání formuláře s novým receptem
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // pro naplnění daty z formuláře při editu
  useEffect(() => {
    if (recipe) {
      setRecipeName(recipe.name);
      setRecipeInstructions(recipe.description);
      setRecipeImgUri(recipe.imgUri);
      setIngredients(recipe.ingredients.map(ingredient => ({
        ingredientId: ingredient.id,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })));
    }
  }, [recipe]);

  // aktualizuje pole určité ingredience v seznamu 
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    if (field === "amount") {
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: Number(value),
      };
    } else {
      newIngredients[index] = {
        ...newIngredients[index],
        [field]: value,
      };
    }
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
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    //kontrola validity
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // kontrola oprávnění
    if (!isAuthorized) {
      alert("Bohužel nemůžeš přidávat nebo upravovat recepty.");
      return;
    }

    // vytvoření nového receptu 
    const newRecipe = {
      id: recipe ? recipe.id : undefined, // přidáme ID pouze pokud existuje
      name: recipeName,
      description: recipeInstructions,
      imgUri: recipeImgUri,
      ingredients: ingredients.filter(
        (ingredient) =>
          ingredient.ingredientId && ingredient.amount && ingredient.unit
      ).map(ingredient => ({
        id: ingredient.ingredientId,
        amount: Number(ingredient.amount),
        unit: ingredient.unit
      })),
    };

    console.log("Sending new recipe to server:", newRecipe);

    //napojení na server + změna URL endpointu při odesílání formuláře podle toho, jestli je to create nebo edit
    setRecipeAddCall({ state: 'pending' });
    try {
      const res = await fetch(`http://localhost:3000/recipe/${recipe ? 'update' : 'create'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe)
      });

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();  // Přečtení odpovědi jako JSON
      } else {
        const text = await res.text();  // Přečtení odpovědi jako text
        console.error("Non-JSON response from server:", text);
        throw new Error("Server returned non-JSON response");
      }

      console.log("Server response:", data);

      if (res.status >= 400) {
        setRecipeAddCall({ state: "error", error: data });
      } else {
        setRecipeAddCall({ state: "success", data });
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          handleClose();
          resetForm();
        }, 2000);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setRecipeAddCall({ state: "error", error: { message: error.message } });
    }
  };

  // Přidání funkce pro smazání receptu
  const handleDelete = async () => {
    if (!isAuthorized) {
      alert("Ty mazat nemůžeš.");
      return;
    }

    if (!recipe) return;

    try {
      const res = await fetch(`http://localhost:3000/recipe/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: recipe.id })
      });

      if (res.status >= 400) {
        const data = await res.json();
        console.error("Error deleting recipe:", data);
        setRecipeAddCall({ state: "error", error: data });
      } else {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          handleClose();
          resetForm();
        }, 2000);
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
      setRecipeAddCall({ state: "error", error: { message: error.message } });
    }
  };

  // Reset formuláře
  const resetForm = () => {
    setRecipeName(defaultForm.recipeName);
    setRecipeInstructions(defaultForm.recipeInstructions);
    setRecipeImgUri(defaultForm.recipeImgUri);
    setIngredients(defaultForm.ingredients);
    setValidated(false);
    setRecipeAddCall({ state: 'inactive' });
  };

  // Zavřít modální okno
  const handleModalClose = () => {
    handleClose();
    resetForm();
  };

  // rendrování vlastní komponenty s tlačítky na přidání ingrediencí, zavření a odeslání formuláře
  return (
    <React.Fragment>
      <Modal show={show} onHide={handleModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{recipe ? "Upravit recept" : "Přidat nový recept"}</Modal.Title>
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
            <Form.Group className="mb-3">
              <Form.Label><strong>URL obrázku</strong></Form.Label>
              <Form.Control
                type="text"
                value={recipeImgUri}
                onChange={(e) => setRecipeImgUri(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Nezapomeň přidat obrázek!
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
                    {ingredientList && ingredientList.map((ingredientOption) => (
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
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <div>
                {recipeAddCall.state === 'error' &&
                  <div className="text-danger">Error: {recipeAddCall.error.message}</div>
                }
              </div>
              <div className="d-flex flex-row gap-2">
                {recipe && (
                  <Button variant="danger" onClick={handleDelete}>
                    Smazat recept
                  </Button>
                )}
                <Button variant="secondary" onClick={handleModalClose}>
                  Zavřít
                </Button>
                <Button variant="primary" type="submit" disabled={recipeAddCall.state === 'pending'}>
                  {recipeAddCall.state === 'pending' ? (
                    <span>Načítání...</span>
                  ) : (
                    recipe ? "Upravit recept" : "Přidat recept"
                  )}
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
      {showSuccessMessage && (
        <div className="alert alert-success" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999
        }}>
          Recept byl úspěšně {recipe ? "upraven" : "přidán"}!
        </div>
      )}
    </React.Fragment>
  );
}

export default CreateRecipe;