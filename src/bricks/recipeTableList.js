import Table from "react-bootstrap/Table";
import React, { useState } from "react";

//vykreslení tabulky s recepty
function RecipeTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Název</th>
          <th>Popis</th>
          <th>Ingredience</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
        {props.recipeList.map((recipe) => {
          return <RecipeRow key={recipe.id} recipe={recipe} />;
        })}
      </tbody>     
    </Table>
  );
}

// funkce na rozbalení dlouhého textu
function RecipeRow({ recipe }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedDescription = recipe.description.length > 100
    ? `${recipe.description.substring(0, 100)}`
    : recipe.description;

  return (
    <tr>
      <td>{recipe.name}</td>
      <td>
        {isExpanded ? recipe.description : truncatedDescription}
        {recipe.description.length > 100 && (
          <button className="expand-table-button" onClick={toggleDescription}>
            {isExpanded ? "\u00AB" : "..."}
          </button>
        )}
      </td>
      <td>{recipe.ingredients ? recipe.ingredients.length : 0}</td>
      <td>{recipe.id}</td>
    </tr>
  );
}

export default RecipeTableList;