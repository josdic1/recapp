from app import create_app
from app.extensions import db
from app.models import User, Category, Recipe

app = create_app()


@app.cli.command('destroy')
def destroy_db():
    """Delete the database file completely"""
    import os
    
    db_path = 'instance/app.db'
    
    if os.path.exists(db_path):
        os.remove(db_path)
        print("💥 Database file deleted!")
        print(f"🗑️  Removed: {db_path}")
    else:
        print("⚠️  No database file found")
    
    print("\n💡 Run 'flask reset' to create fresh tables")
    print("💡 Run 'flask seed' to add test data")


@app.cli.command('reset')
def reset_db():
    """Drop all tables and recreate them"""
    print("🔄 Resetting database...")
    db.drop_all()
    db.create_all()
    print("✅ Database reset complete!")


@app.cli.command('seed')
def seed_db():
    """Seed the database with initial data"""
    # Clear existing data
    print("🗑️  Clearing existing data...")
    Recipe.query.delete()
    Category.query.delete()
    User.query.delete()
    db.session.commit()
    
    # Create users
    print("👥 Creating users...")
    alex = User(name='alex')
    alex.password = '1111'
    
    bea = User(name='bea')
    bea.password = '1111'
    
    cam = User(name='cam')
    cam.password = '1111'
    
    db.session.add_all([alex, bea, cam])
    db.session.commit()
    
    # Create categories
    print("📁 Creating categories...")
    asian = Category(name='Asian')
    italian = Category(name='Italian')
    mexican = Category(name='Mexican')
    american = Category(name='American')
    dessert = Category(name='Dessert')
    
    db.session.add_all([asian, italian, mexican, american, dessert])
    db.session.commit()
    
    # Create recipes
    print("🍳 Creating recipes...")
    recipes = [
        Recipe(name='Lo Mein', user_id=alex.id, category_id=asian.id),
        Recipe(name='Pad Thai', user_id=alex.id, category_id=asian.id),
        Recipe(name='Spaghetti Carbonara', user_id=alex.id, category_id=italian.id),
        Recipe(name='Tacos', user_id=bea.id, category_id=mexican.id),
        Recipe(name='Lasagna', user_id=bea.id, category_id=italian.id),
        Recipe(name='Tiramisu', user_id=bea.id, category_id=dessert.id),
        Recipe(name='Burger', user_id=cam.id, category_id=american.id),
        Recipe(name='Fried Rice', user_id=cam.id, category_id=asian.id),
        Recipe(name='Brownies', user_id=cam.id, category_id=dessert.id),
    ]
    
    db.session.add_all(recipes)
    db.session.commit()
    
    print("\n✅ Database seeded successfully!")
    print("\n👤 Users: alex, bea, cam (password: 1111)")
    print("📂 Categories: Asian, Italian, Mexican, American, Dessert")
    print("🍽️  9 recipes created")

@app.cli.command('stats')
def show_stats():
    """Show database statistics"""
    user_count = User.query.count()
    category_count = Category.query.count()
    recipe_count = Recipe.query.count()
    
    print("\n📊 Database Statistics:")
    print(f"👥 Users: {user_count}")
    print(f"📁 Categories: {category_count}")
    print(f"🍽️  Recipes: {recipe_count}")

@app.cli.command('fresh')
def fresh_start():
    """Delete database, recreate tables, and seed data (all-in-one)"""
    import os
    
    # 1. Delete database file
    db_path = 'instance/app.db'
    if os.path.exists(db_path):
        os.remove(db_path)
        print("💥 Database deleted!")
    
    # 2. Recreate tables
    print("🔧 Creating fresh tables...")
    db.create_all()
    
    # 3. Seed data
    print("🌱 Seeding database...")
    
    # Create users
    alex = User(name='alex')
    alex.password = '1111'
    bea = User(name='bea')
    bea.password = '1111'
    cam = User(name='cam')
    cam.password = '1111'
    db.session.add_all([alex, bea, cam])
    db.session.commit()
    
    # Create categories
    asian = Category(name='Asian')
    italian = Category(name='Italian')
    mexican = Category(name='Mexican')
    american = Category(name='American')
    dessert = Category(name='Dessert')
    db.session.add_all([asian, italian, mexican, american, dessert])
    db.session.commit()
    
    # Create recipes
    recipes = [
        Recipe(name='Lo Mein', user_id=alex.id, category_id=asian.id),
        Recipe(name='Pad Thai', user_id=alex.id, category_id=asian.id),
        Recipe(name='Spaghetti Carbonara', user_id=alex.id, category_id=italian.id),
        Recipe(name='Tacos', user_id=bea.id, category_id=mexican.id),
        Recipe(name='Lasagna', user_id=bea.id, category_id=italian.id),
        Recipe(name='Tiramisu', user_id=bea.id, category_id=dessert.id),
        Recipe(name='Burger', user_id=cam.id, category_id=american.id),
        Recipe(name='Fried Rice', user_id=cam.id, category_id=asian.id),
        Recipe(name='Brownies', user_id=cam.id, category_id=dessert.id),
    ]
    db.session.add_all(recipes)
    db.session.commit()
    
    print("\n✅ Fresh start complete!")
    print("👤 Users: alex, bea, cam (password: 1111)")
    print("📂 5 categories, 🍽️ 9 recipes")

@app.shell_context_processor
def make_shell_context():
    """Make database and models available in flask shell"""
    return {
        'db': db,
        'User': User,
        'Category': Category,
        'Recipe': Recipe
    }

# This runs ONLY when you do `python run.py`
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    
    app.run(debug=True, port=5555)