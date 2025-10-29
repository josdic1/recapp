// src/pages/DashboardPage.jsx
import { useState } from 'react';
import { useUser } from '../providers';
import { getRecipes } from '../api/api';
import RecipeItem from '../components/RecipeItem';

function DashboardPage() {
    const { user } = useUser();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    if (!user) {
        return <div>Please log in</div>;
    }

    const handleCategoryClick = async (category) => {
    console.log('🔘 [Dashboard] Category clicked:', category.name);
    setSelectedCategory(category);
    setLoading(true);

    try {
        console.log('📡 [Dashboard] Fetching recipes for category:', category.id);
        // Don't send user_id - backend gets it from session!
        const data = await getRecipes({ 
            category_id: category.id 
        });
        console.log('✅ [Dashboard] Recipes received:', data);
        setRecipes(data);
    } catch (error) {
        console.error('❌ [Dashboard] Error fetching recipes:', error);
        setRecipes([]);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            <h1>Welcome, {user.name}!</h1>
            
            <section>
                <h2>Your Recipe Categories</h2>
                {user.categories && user.categories.length > 0 ? (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {user.categories.map(cat => (
                            <button 
                                key={cat.id}
                                style={{
                                    padding: '15px 30px',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    background: selectedCategory?.id === cat.id ? '#28a745' : '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px'
                                }}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p>No recipes yet. Create your first recipe!</p>
                )}
            </section>

            {/* Recipe Display Section */}
            {selectedCategory && (
                <section style={{ marginTop: '40px' }}>
                    <h2>{selectedCategory.name} Recipes</h2>
                    
                    {loading ? (
                        <p>Loading recipes...</p>
                    ) : recipes.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {recipes.map(recipe => (
                                <RecipeItem key={recipe.id} recipe={recipe} />
                            ))}
                        </ul>
                    ) : (
                        <p>No recipes in this category yet.</p>
                    )}
                </section>
            )}
        </div>
    );
}

export default DashboardPage;