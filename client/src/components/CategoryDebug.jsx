// src/components/CategoryDebug.jsx
import { useCategories } from '../providers';

function CategoryDebug() {
    const { categories, loading } = useCategories();

    return (
        <div style={{ 
            border: '2px solid blue', 
            padding: '20px', 
            margin: '20px',
            background: 'lightblue',
            color: 'black',
            borderRadius: '8px'
        }}>
            <h3>📁 Category Debug</h3>
            <p><strong>Loading:</strong> {loading ? '⏳ Yes' : '✅ No'}</p>
            <p><strong>Categories:</strong> {categories ? categories.length : 0}</p>
        </div>
    );
}

export default CategoryDebug;