import React, { useState, useMemo } from "react";
import RecipeGridList from "./recipeGridList";
import RecipeTableList from "./recipeTableList";
import RecipeSmallList from "./recipeSmallList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiViewList, mdiMagnify } from "@mdi/js";

function RecipeList(props) {
  //uchovává aktuální typ zobrazení(grid,small,table)-pro změnu typu, se volá setViewType -> komponenta se přerenderuje
  const [viewType, setViewType] = useState("grid"); 
  const [searchBy, setSearchBy] = useState(""); // při prvním vykreslení - prázdný filtr

  //filtrování receptů dle zadaných hodnot
  const filteredRecipeList = useMemo(() => {
    return props.recipeList ? props.recipeList.filter((item) => {
      const nameMatch = item.name && item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase());
      const descriptionMatch = item.description && item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase());
      const ingredientsMatch = item.ingredients && item.ingredients.some(ingredient =>
        ingredient.name && ingredient.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
      );
      const idMatch = item.id && item.id.toString().includes(searchBy);
  
      if (viewType === "small") { //Filtruje podle názvu a ingrediencí.
        return nameMatch || ingredientsMatch;
      } else if (viewType === "grid") { //Filtruje podle názvu a popisu.
        return nameMatch || descriptionMatch;
      } else if (viewType === "table") { //Filtruje podle názvu, popisu, ingrediencí a ID.
        return nameMatch || descriptionMatch || ingredientsMatch || idMatch;
      }
      return false;
    }) : [];
  }, [searchBy, props.recipeList, viewType]);

  //po kliknutí na tlačítko "Search" - nastaví searchBy dle zadané hodnoty
  function handleSearch(event) { 
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }
  
  //pokud je prázdné pole, vrátí recepty do stavu bez filtu
  function handleSearchDelete(event) { 
    if (!event.target.value) setSearchBy(""); 
  }

  //Navigační lišta - lupa a tlačítka na změny view
  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand className="navBrand">Seznam receptů</Navbar.Brand>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                className="btn-search"
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                className={`btn-style ${viewType === "grid" ? "btn-active" : ""}`}
                onClick={() => setViewType("grid")}
                variant="none"
              >
                <Icon size={1} path={mdiViewGridOutline} /> Velký
              </Button>
              <Button
                className={`btn-style ${viewType === "small" ? "btn-active" : ""}`}
                onClick={() => setViewType("small")}
                variant="none"
              >
                <Icon size={1} path={mdiViewList} /> Malý
              </Button>
              <Button
                className={`btn-style ${viewType === "table" ? "btn-active" : ""}`}
                onClick={() => setViewType("table")}
                variant="none"
              >
                <Icon size={1} path={mdiTable} /> Tabulka
              </Button>
            </Form>
          </div>
        </div>
      </Navbar>
      {viewType === "grid" && <RecipeGridList recipeList={filteredRecipeList} />}
      {viewType === "small" && <RecipeSmallList recipeList={filteredRecipeList} ingredientList={props.ingredientList}/>}
      {viewType === "table" && <RecipeTableList recipeList={filteredRecipeList} />}
    </div>
  );
}

export default RecipeList;