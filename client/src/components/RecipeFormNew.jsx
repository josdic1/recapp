// src/pages/RecipeFormNew.jsx
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../providers/CategoryProvider";
import { RecipeContext } from "../providers/RecipeProvider";
import { UserContext } from "../providers/UserProvider";
import { PlusCircleIcon } from "lucide-react"
import CategoryFormModal from "../components/CategoryFormModal";

function RecipeFormNew() {
    const { categories } = useContext(CategoryContext);
    const { createRecipe } = useContext(RecipeContext);
    const { user } = useContext(UserContext);
    
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
    });
    
    const navigate = useNavigate();

    const handleCategoryCreated = (newCategory) => {
        console.log('✅ Auto-selecting new category:', newCategory);
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

    const clearForm = () => {
        setFormData({
            name: '',
            category_id: ''
        });
    };

    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    function onSubmit(e) {
        e.preventDefault();
        if (formData.name && formData.category_id) {
            const newRecipe = {
                name: formData.name,
                category_id: parseInt(formData.category_id),
                user_id: user.id
            };
            createRecipe(newRecipe);
            clearForm();
            navigate('/dashboard');
        } else {
            alert('Recipe is missing a name or a category');
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                    type='text' 
                    name='name' 
                    onChange={onFormChange} 
                    value={formData.name} 
                    placeholder="Enter new recipe name..." 
                />
                
                <select name='category_id' onChange={onFormChange} value={formData.category_id}>
                    <option value=''>Categories</option>
                    {categoryList}
                </select>
                
                <p>Don't see your category?</p>
                
                <button type='button' onClick={() => setShowModal(true)}>
                    <PlusCircleIcon size={24} strokeWidth={2} /> Add Category
                </button>
                <br />
                
                <button type='submit'>Add Recipe</button>
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

export default RecipeFormNew;