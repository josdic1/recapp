from app import create_app
from app.extensions import db
from app.models import User, Category, Recipe

app = create_app()

def seed_database():
    """Seed the database with initial data"""
    
    with app.app_context():
        # Clear existing data
        print("Clearing existing data...")
        Recipe.query.delete()
        Category.query.delete()
        User.query.delete()
        db.session.commit()
        
        # Create users
        print("Creating users...")
        alex = User(name='alex')
        alex.password = '1111'
        
        bea = User(name='bea')
        bea.password = '1111'
        
        cam = User(name='cam')
        cam.password = '1111'
        
        db.session.add_all([alex, bea, cam])
        db.session.commit()
        print(f"Created users: {alex.name}, {bea.name}, {cam.name}")
        
        # Create categories (shared across all users)
        print("Creating categories...")
        asian = Category(name='Asian')
        italian = Category(name='Italian')
        mexican = Category(name='Mexican')
        american = Category(name='American')
        dessert = Category(name='Dessert')
        
        db.session.add_all([asian, italian, mexican, american, dessert])
        db.session.commit()
        print(f"Created categories: Asian, Italian, Mexican, American, Dessert")
        
        # Create recipes
        print("Creating recipes...")
        
        # Alex's recipes
        recipe1 = Recipe(name='Lo Mein', user_id=alex.id, category_id=asian.id)
        recipe2 = Recipe(name='Pad Thai', user_id=alex.id, category_id=asian.id)
        recipe3 = Recipe(name='Spaghetti Carbonara', user_id=alex.id, category_id=italian.id)
        
        # Bea's recipes
        recipe4 = Recipe(name='Tacos', user_id=bea.id, category_id=mexican.id)
        recipe5 = Recipe(name='Lasagna', user_id=bea.id, category_id=italian.id)
        recipe6 = Recipe(name='Tiramisu', user_id=bea.id, category_id=dessert.id)
        
        # Cam's recipes
        recipe7 = Recipe(name='Burger', user_id=cam.id, category_id=american.id)
        recipe8 = Recipe(name='Fried Rice', user_id=cam.id, category_id=asian.id)
        recipe9 = Recipe(name='Brownies', user_id=cam.id, category_id=dessert.id)
        
        db.session.add_all([
            recipe1, recipe2, recipe3,
            recipe4, recipe5, recipe6,
            recipe7, recipe8, recipe9
        ])
        db.session.commit()
        
        print("Created 9 recipes across 3 users")
        print("\n✅ Database seeded successfully!")
        print("\nUsers:")
        print("  - alex (password: 1111)")
        print("  - bea (password: 1111)")
        print("  - cam (password: 1111)")
        print("\nCategories:")
        print("  - Asian, Italian, Mexican, American, Dessert")
        print("\nRecipes distributed across all users and categories")

if __name__ == '__main__':
    seed_database()