import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const { ingredients } = useOutletContext();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    setError(null); // Reset chybového stavu při změně ID
    setLoading(true); // Reset načítacího stavu při změně ID

    if (!id) {
      setError(new Error("Bohužel ID receptu nebylo zadáno."));
      setLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recipe/get?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Odezva sítě nebyla v pořádku: ${response.statusText}`);
        }

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Recept s tímto ID neexistuje.");
        }

        setRecipe(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-page">{error.message}</div>;
  }

  const getIngredientName = (id) => {
    if (!ingredients) return "Unknown ingredient"; // kontrola pro undefined

    const ingredient = ingredients.find(ingredient => ingredient.id === id);
    return ingredient ? ingredient.name : "Unknown ingredient";
  };

  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail-card">
        <h1 className="recipe-title">{recipe.name}</h1>
        <img className="recipe-image" src={recipe.imgUri} alt={recipe.name} />
        <p className="recipe-description">{recipe.description}</p>
        <h2>Ingredients</h2>
        <ul className="ingredient-list">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredient-item">
              {ingredient.amount} {ingredient.unit} - {getIngredientName(ingredient.id)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetail;
