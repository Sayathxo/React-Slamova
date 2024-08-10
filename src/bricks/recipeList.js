import React, { useState } from "react";
import RecipeGridList from "./recipeGridList";
import RecipeTableList from "./recipeTableList";
import RecipeSmallList from "./recipeSmallList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline, mdiViewList } from "@mdi/js";

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
          <div>
            <Button
              variant={viewType === "grid" ? "primary" : "outline-primary"}
              onClick={() => setViewType("grid")}
              className="mr-2"
            >
              <Icon size={1} path={mdiViewGridOutline} /> Velký
            </Button>
            <Button
              variant={viewType === "small" ? "primary" : "outline-primary"}
              onClick={() => setViewType("small")}
              className="mr-2"
            >
              <Icon size={1} path={mdiViewList} /> Malý
            </Button>
            <Button
              variant={viewType === "table" ? "primary" : "outline-primary"}
              onClick={() => setViewType("table")}
            >
              <Icon size={1} path={mdiTable} /> Tabulka
            </Button>
          </div>
        </div>
      </Navbar>
      {viewType === "grid" && <RecipeGridList recipeList={props.recipeList} />}
      {viewType === "small" && <RecipeSmallList recipeList={props.recipeList} />}
      {viewType === "table" && <RecipeTableList recipeList={props.recipeList} />}
    </div>
  );
}

export default RecipeList;