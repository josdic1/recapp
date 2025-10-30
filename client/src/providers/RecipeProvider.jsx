// src/providers/RecipeProvider.jsx
import { useMemo, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import { 
    createRecipe as apiCreateRecipe, 
    deleteRecipe as apiDeleteRecipe,
    updateRecipe as apiUpdateRecipe
} from "../api/api";
import { checkSession } from "../api/api";

export const RecipeContext = createContext();

function RecipeProvider({ children }) {
    const { setUser } = useContext(UserContext);

    const fetchRecipes = async () => {
        try {
            const data = await apiGetRecipes();
            return data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return [];
        }
    };

    const createRecipe = async (recipe) => {
        try {
            const data = await apiCreateRecipe(recipe);
            const userData = await checkSession();
            setUser(userData.user);
            return { success: true, recipe: data };
        } catch (error) {
            console.error('Error creating recipe:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || error.message 
            };
        }
    };

const deleteRecipe = async (id) => {
    try {
        await apiDeleteRecipe(id);  // API call
        const userData = await checkSession();  // Fetch fresh user
        setUser(userData.user);  // Update global user
        return { success: true, user: userData.user };  // ← RETURN USER
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return { 
            success: false, 
            error: error.response?.data?.error || error.message 
        };
    }
};

    const updateRecipe = async (recipe) => {
        try {
            const data = await apiUpdateRecipe(recipe);
            const userData = await checkSession();
            setUser(userData.user);
            return { success: true, recipe: data };
        } catch (error) {
            console.error('Error updating recipe:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    };

    const value = useMemo(() => ({
        fetchRecipes,
        createRecipe,
        deleteRecipe,
        updateRecipe
    }), []);

    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    );
}

export default RecipeProvider;