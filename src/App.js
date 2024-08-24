import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeList from "./bricks/recipeList"
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Offcanvas, Button } from "react-bootstrap";
import CreateRecipe from "./bricks/CreateRecipe";

function App() {

  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); //stavy pro modální okno CreateRecipe
  // konstanty k uchovávání stavu načítání receptů/ingrediencí (výchozí stav je pending)
  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });
  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });

  //Načtení seznamu receptů při prvním vykreslení komponenty
  useEffect(() => {
    //volání API metodou GET
    fetch(`http://localhost:3000/recipe/list`, {
      method: "GET",
    })
      //Pokud je odpověď úspěšná, uloží data do recipeLoadCall success, jinak error a uloží chybu
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setRecipeLoadCall({ state: "error", error: responseJson });
        } else {
          setRecipeLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => { //když dojde k chybě při volání API
        console.error('Error during fetch:', error);
        setRecipeLoadCall({ state: "error", error });
      });
  }, []);

  //Načtení seznamu ingrediencí při prvním vykreslení komponenty -> vše jinak podobně jako u receptů výše
  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setIngredientLoadCall({ state: "error", error: responseJson });
        } else {
          setIngredientLoadCall({ state: "success", data: responseJson });
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        setIngredientLoadCall({ state: "error", error });
      });
  }, []);

  //funkce rozhoduje, co se zobrazí na základě stavu načítání receptů
  function getRecipe() {
    switch (recipeLoadCall.state) {
      case "pending":
        return (
          <div className="loading">
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <NavDropdown title="Vyber recept" id="navbarScrollingDropdown">
            {recipeLoadCall.data.map((recipe) => {
              return (
                <NavDropdown.Item
                  key={recipe.id}
                  onClick={() => navigate("/recipeDetail?id=" + recipe.id)}
                >
                  {recipe.name}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        );
      case "error":
        return (
          <div className="error">
            <div>Upsík dupsík, něco se pokazilo a nenačetla se data o receptech. Dnes bude asi k večeři "co dům dal".</div>
          </div>
        );
      default:
        return null;

    }
  }
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")} className="navbar-brand-custom">
            Báječná kuchařka
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`} className="offcanvas-title-custom">
                Báječná kuchařka
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {getRecipe()}
                <Nav.Link onClick={() => navigate("/recipeList")}>Recepty</Nav.Link>
                <Nav.Link onClick={() => navigate("/ingredientList")}>Ingredience</Nav.Link>
                <Button variant="primary" onClick={handleModalShow} className="button-create-recipe">
                  Přidej recept
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />

      <CreateRecipe
        show={showModal}
        handleClose={handleModalClose}
        ingredientList={ingredientLoadCall.data || []}
      />
    </div>
  );
}
export default App;