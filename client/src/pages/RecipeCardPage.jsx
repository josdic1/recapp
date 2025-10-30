// src/pages/RecipeCardPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../api/api";

function RecipeCardPage() {
    const [cardRecipe, setCardRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id: recipeId } = useParams(); // ← "10" (string)
    const id = parseInt(recipeId, 10); // ← Convert to number

    // Validate ID
    if (isNaN(id)) {
        return <p>Invalid recipe ID.</p>;
    }

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                setLoading(true);
                console.log('Fetching recipe ID:', id); // Debug
                const recipe = await getRecipe(id); // ← Now a number
                setCardRecipe(recipe);
            } catch (err) {
                console.error('Failed to load recipe:', err);
                setError("Recipe not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };

        loadRecipe();
    }, [id]); // ← Depend on number, not string

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{cardRecipe.name}</h1>
            <p><strong>Category:</strong> {cardRecipe.category?.name || 'Unknown'}</p>
            {/* Add more fields */}
        </div>
    );
}

export default RecipeCardPage;