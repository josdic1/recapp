// src/components/CategoryFormModal.jsx
import { useState } from 'react';
import { useCategories } from '../providers';
import Modal from './Modal';

function CategoryFormModal({ onClose, onCategoryCreated }) {
    const [name, setName] = useState('');
    const { onCreateCategory } = useCategories();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name.trim()) {
            alert('Please enter a category name');
            return;
        }
        
        const result = await onCreateCategory(name);
        
        if (result.success) {
            console.log('✅ Category created in modal:', result.category);
            onCategoryCreated(result.category);
        } else {
            alert(result.error);
        }
    };
    
    return (
        <Modal isOpen={true} onClose={onClose}>
            <h2 style={{ marginTop: 0 }}>Create New Category</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="categoryName">Category Name</label>
                <input 
                    id="categoryName"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter category name"
                    style={{ 
                        width: '100%', 
                        padding: '8px', 
                        marginTop: '8px',
                        marginBottom: '16px'
                    }}
                    autoFocus
                />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit">
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CategoryFormModal;