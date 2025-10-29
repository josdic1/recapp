// src/components/RecipeDebug.jsx
import { useRecipes } from '../providers';

function RecipeDebug() {
    const { recipes, loading } = useRecipes();

    console.log('🍽️ [RecipeDebug] Current state:', { recipes, loading });

    return (
        <div style={{ 
            border: '2px solid green', 
            padding: '20px', 
            margin: '20px',
            background: 'lightgreen',
            color: 'black',
            borderRadius: '8px'
        }}>
            <h3>🍽️ Recipe Debug</h3>
            <p><strong>Loading:</strong> {loading ? '⏳ Yes' : '✅ No'}</p>
            <p><strong>Recipes Count:</strong> {recipes ? recipes.length : 'null'}</p>
            
            {recipes && recipes.length > 0 && (
                <div>
                    <strong>Your Recipes:</strong>
                    <ul>
                        {recipes.map(recipe => (
                            <li key={recipe.id}>
                                {recipe.name} <em>({recipe.category.name})</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RecipeDebug;