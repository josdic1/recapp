import { useState, useEffect, useMemo, createContext } from "react";

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
    const [recipes, setRecipes] = useState(null);
    
    
    const value = useMemo(() => (
        { 
            recipes, 
            setRecipes
        }), 
        [recipes, setRecipes]);


    return (
        <RecipeContext.Provider 
            value={value}>{children}
        </RecipeContext.Provider>
    )
}   

export default RecipeProvider