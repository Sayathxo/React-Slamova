import React, { useState, useMemo } from "react";
import '../App.css';
import RecipeGridList from "./recipeGridList";
import RecipeTableList from "./recipeTableList";
import RecipeSmallList from "./recipeSmallList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";

import { mdiTable, mdiViewGridOutline, mdiViewList, mdiMagnify } from "@mdi/js";

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");
  const [searchBy, setSearchBy] = useState("");

  const filteredrecipeList = useMemo(() => {
    return props.recipeList.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.id.toLowerCase().includes(searchBy.toLowerCase())
      );
    });
  }, [searchBy, props.recipeList]);

  function handleSearch(event) { 
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }
  
  function handleSearchDelete(event) { 
    if (!event.target.value) setSearchBy(""); 
  }

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
                className= "btn-search"
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
      {viewType === "grid" && <RecipeGridList recipeList={filteredrecipeList} />}
      {viewType === "small" && <RecipeSmallList recipeList={filteredrecipeList} />}
      {viewType === "table" && <RecipeTableList recipeList={filteredrecipeList} />}
    </div>
  );
}

export default RecipeList;