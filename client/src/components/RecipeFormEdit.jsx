// src/pages/RecipeFormEdit.jsx
import { useState, useEffect, useContext } from "react"
import { CategoryContext } from "../providers/CategoryProvider";
import { RecipeContext } from "../providers/RecipeProvider";
import CategoryFormModal from "../components/CategoryFormModal";
import { useParams, useNavigate } from "react-router-dom"
import { getRecipe } from "../api/api";
import { Edit3Icon } from "lucide-react"

function RecipeFormEdit() {
    const { categories } = useContext(CategoryContext);
    const { updateRecipe } = useContext(RecipeContext);
    const { id } = useParams();  // ← MUST MATCH ROUTE PARAM NAME
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        category_id: '',
    });

    useEffect(() => {
        if (!id) {
            console.log('❌ No recipe id in URL');
            return;
        }

        const fetchRecipe = async () => {
            console.log('📡 Fetching recipe with ID:', id);
            try {
                const recipe = await getRecipe(id);
                console.log('✅ Recipe loaded:', recipe);
                setFormData({
                    id: recipe.id,
                    name: recipe.name,
                    category_id: recipe.category_id,
                });
            } catch (error) {
                console.error('❌ Error loading recipe:', error);
                alert('Recipe not found!');
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, navigate]);

    const handleCategoryCreated = (newCategory) => {
        console.log('✅ New category created:', newCategory);
        setFormData(prev => ({
            ...prev,
            category_id: newCategory.id
        }));
        setShowModal(false);
    };

    const categoryList = categories && categories.length > 0 ? (
        categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
        ))
    ) : '';

    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function onSubmit(e) {
        e.preventDefault();
        console.log('📝 Submitting updated recipe:', formData);
        
        if (formData.name && formData.category_id) {
            const updatedRecipe = {
                id: formData.id,
                name: formData.name,
                category_id: parseInt(formData.category_id)
            };
            
            console.log('🚀 Calling updateRecipe API...');
            const result = await updateRecipe(updatedRecipe);
            
            if (result.success) {
                console.log('✅ Recipe updated successfully!');
                navigate('/dashboard');
            } else {
                console.error('❌ Update failed:', result.error);
                alert(`Error: ${result.error}`);
            }
        } else {
            alert('Recipe is missing a name or a category');
        }
    }

    if (loading) {
        return <p>Loading recipe...</p>;
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <h2>Edit Recipe</h2>
                <label htmlFor="name">Name</label>
                <input 
                    type='text' 
                    name='name' 
                    onChange={onFormChange} 
                    value={formData.name} 
                    placeholder="Recipe name"
                />
                <select name='category_id' onChange={onFormChange} value={formData.category_id}>
                    <option value=''>Select Category</option>
                    {categoryList}
                </select>
                <p>Don't see your category?</p>
                <button type='button' onClick={() => setShowModal(true)}>
                    <Edit3Icon size={24} strokeWidth={2} /> Add Category
                </button>
                <br />
                <button type='submit'>Update Recipe</button>
            </form>
            
            {showModal && (
                <CategoryFormModal 
                    onClose={() => setShowModal(false)}
                    onCategoryCreated={handleCategoryCreated}
                />
            )}
        </>
    );
}

export default RecipeFormEdit;