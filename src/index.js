import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from "./routes/Home";
import RecipeList from "./routes/RecipeList";
import RecipeDetail from "./routes/RecipeDetail"; 
import IngredientList from "./routes/IngredientList";
import { UserProvider } from "./UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="recipeList" element={<RecipeList />} />
            <Route path="recipeDetail/:id" element={<RecipeDetail />} /> 
            <Route path="ingredientList" element={<IngredientList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
