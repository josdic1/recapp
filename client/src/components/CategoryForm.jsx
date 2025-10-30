import { useState,useEffect, useContext } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import { useNavigate } from "react-router-dom";

function CategoryForm() {
    const [newCategoryInput, setNewCategoryInput] = useState('');
    const { categories, setCategories, onCreateCategory, boomerang, setBoomerang } = useContext(CategoryContext);
    const navigate = useNavigate(); 



function onSubmit(e) {
    e.preventDefault()
    if (newCategoryInput) {
        onCreateCategory(newCategoryInput);
        setBoomerang(prev => ({
            ...prev,
            input: newCategoryInput
        }))
        navigate('/recipes/new')
        setNewCategoryInput('');
    } else {
        alert('Please enter a category name');
    }
}

return (
    <>
    <form onSubmit={onSubmit}>
    <label htmlFor="newCategoryInput">New Category</label>
    <input type="text" name="newCategoryInput" id="newCategoryInput" value={newCategoryInput} onChange={(e) => setNewCategoryInput(e.target.value)}/>
    <button type="submit">Add Category</button>
    </form>
    </>
)}

export default CategoryForm