// src/components/RecipeItem.jsx
function RecipeItem({ recipe }) {
    const handleEdit = () => {
        console.log('✏️ [RecipeItem] Edit clicked:', recipe.id, recipe.name);
        // TODO: Open edit modal
    };

    const handleDelete = () => {
        console.log('🗑️ [RecipeItem] Delete clicked:', recipe.id, recipe.name);
        // TODO: Confirm and delete
    };

    return (
        <li 
            key={recipe.id} 
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
            <span style={{ fontSize: '18px', fontWeight: '500', gap: '15px'}}>
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
                >
                    View
                </button>

                <button
                    onClick={handleEdit}
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
                    onClick={handleDelete}
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