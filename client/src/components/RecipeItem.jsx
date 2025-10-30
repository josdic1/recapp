// src/components/RecipeItem.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../providers';

function RecipeItem({ recipe, onDelete }) {
    const navigate = useNavigate();
    const { deleteRecipe } = useRecipes();

    console.log('🍽️ [RecipeItem] Rendering recipe:', recipe);  // ← ADD THIS


    const onClick = async (e) => {
        const { name } = e.target;

        switch (name) {
            case 'view':
                console.log('Recipe ID before navigate:', recipe.id, typeof recipe.id);

                if (!recipe.id) {
                    alert("Recipe has no ID!");
                    return;
                }

                const url = `/recipes/${recipe.id}`;
                console.log('Navigating to:', url);
                navigate(url);
                break;

            case 'edit':
                console.log('✏️ [RecipeItem] Edit clicked, navigating to:', `/recipes/${recipe.id}/edit`);  // ← ADD THIS
                navigate(`/recipes/${recipe.id}/edit`);
                break;

            case 'delete':
                const confirmDelete = window.confirm(
                    `Are you sure you want to delete "${recipe.name}"?`
                );

                if (confirmDelete) {
                    console.log('Deleting:', recipe.name);

                    // Call API
                    const result = await deleteRecipe(recipe.id);

                    // Check if it worked
                    if (result.success) {
                        console.log('Deleted!');

                        // THIS IS THE KEY LINE:
                        onDelete();  // ← Tells DashboardPage to remove it from the list
                    } else {
                        console.error('Delete failed:', result.error);
                        alert(`Failed: ${result.error}`);
                    }
                }
                break;

            default:
                break;
        }
    };

    return (
        <li
            style={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                background: '#071d33ff',
                borderRadius: '5px'
            }}
        >
            <span style={{ fontSize: '18px', fontWeight: '500' }}>
                {recipe.name}
            </span>

            <div style={{ display: 'flex', gap: '15px' }}>
                <button
                    style={{
                        padding: '5px 15px',
                        background: '#063c34ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                    name='view'
                    onClick={onClick}
                >
                    View
                </button>

                <button
                    onClick={onClick}
                    name='edit'
                    style={{
                        padding: '5px 15px',
                        background: '#ffc107',
                        color: 'black',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                >
                    Edit
                </button>

                <button
                    onClick={onClick}
                    name='delete'
                    style={{
                        padding: '5px 15px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default RecipeItem;