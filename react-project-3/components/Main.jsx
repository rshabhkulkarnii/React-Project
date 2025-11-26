import React from 'react';
import IngredientsList from './ingredientsList';
import Recipe from './recipe';
import { getRecipeFromMistral } from '../ai';


export default function Main() {

    const [ingredients, setIngredients] = React.useState([]);

    const [recipe, setRecipe] = React.useState("");

    async function getrecipe() {
        const generatedRecipe = await getRecipeFromMistral(ingredients);
        setRecipe(generatedRecipe);

    }

    

    function addingredient(FormData) {
        const ingredients = FormData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, ingredients]);
    }


    return (
        <main>
            <p>Welcome to the Recipe Generator! Just enter the ingredients you have on hand, and we'll instantly suggest delicious recipes you can make. Whether you're short on time or trying to get creative with leftovers, we've got you covered. Start by entering your ingredients below.
            </p>
            <form  action={addingredient} className="ingredient-form">
                <input type="text" placeholder="Enter ingredients..." aria-label="Add ingredient" name="ingredient" />
                <button>Add Ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getrecipe={getrecipe} />}
            
            { recipe && <Recipe recipe = {recipe} /> }
        </main>
    )
}