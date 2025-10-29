from app.extensions import db
from app.models import User, Category, Recipe
from sqlalchemy.exc import IntegrityError

# ==================== USER SERVICES ====================

def create_user(name, password):
    """Create a new user with hashed password"""
    try:
        user = User(name=name)
        user.password = password  # This triggers the password setter (hashing)
        db.session.add(user)
        db.session.commit()
        return user, None
    except IntegrityError as e:
        db.session.rollback()
        return None, str(e)


def get_user_by_id(user_id):
    """Get user by ID"""
    return User.query.get(user_id)


def get_all_users():
    """Get all users"""
    return User.query.all()


def authenticate_user(name, password):
    """Authenticate user by name and password"""
    user = User.query.filter_by(name=name).first()
    if user and user.check_password(password):
        return user
    return None


def update_user(user_id, name=None, password=None):
    """Update user information"""
    user = User.query.get(user_id)
    if not user:
        return None, "User not found"
    
    try:
        if name:
            user.name = name
        if password:
            user.password = password  # Triggers hashing
        db.session.commit()
        return user, None
    except IntegrityError as e:
        db.session.rollback()
        return None, str(e)


def delete_user(user_id):
    """Delete a user"""
    user = User.query.get(user_id)
    if not user:
        return False, "User not found"
    
    try:
        db.session.delete(user)
        db.session.commit()
        return True, None
    except Exception as e:
        db.session.rollback()
        return False, str(e)
    
# ==================== CATEGORY SERVICES ====================

def create_category(name):
    """Create a new category"""
    try:
        category = Category(name=name)
        db.session.add(category)
        db.session.commit()
        return category, None
    except IntegrityError:
        db.session.rollback()
        return None, "Category already exists"


def get_category_by_id(category_id):
    """Get category by ID"""
    return Category.query.get(category_id)


def get_all_categories():
    """Get all categories"""
    return Category.query.all()


def update_category(category_id, name):
    """Update category name"""
    category = Category.query.get(category_id)
    if not category:
        return None, "Category not found"
    
    try:
        category.name = name
        db.session.commit()
        return category, None
    except IntegrityError:
        db.session.rollback()
        return None, "Category name already exists"


def delete_category(category_id):
    """Delete a category"""
    category = Category.query.get(category_id)
    if not category:
        return False, "Category not found"
    
    try:
        db.session.delete(category)
        db.session.commit()
        return True, None
    except Exception as e:
        db.session.rollback()
        return False, str(e)


# ==================== RECIPE SERVICES ====================

def create_recipe(name, user_id, category_id):
    """Create a new recipe"""
    try:
        # Validate user and category exist
        user = User.query.get(user_id)
        category = Category.query.get(category_id)
        
        if not user:
            return None, "User not found"
        if not category:
            return None, "Category not found"
        
        recipe = Recipe(name=name, user_id=user_id, category_id=category_id)
        db.session.add(recipe)
        db.session.commit()
        return recipe, None
    except IntegrityError as e:
        db.session.rollback()
        return None, str(e)


def get_recipe_by_id(recipe_id):
    """Get recipe by ID"""
    return Recipe.query.get(recipe_id)


def get_all_recipes():
    """Get all recipes"""
    return Recipe.query.all()


def get_recipes_by_user(user_id):
    """Get all recipes by a specific user"""
    return Recipe.query.filter_by(user_id=user_id).all()


def get_recipes_by_category(category_id):
    """Get all recipes in a specific category"""
    return Recipe.query.filter_by(category_id=category_id).all()


def update_recipe(recipe_id, name=None, user_id=None, category_id=None):
    """Update recipe information"""
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return None, "Recipe not found"
    
    try:
        if name:
            recipe.name = name
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return None, "User not found"
            recipe.user_id = user_id
        if category_id:
            category = Category.query.get(category_id)
            if not category:
                return None, "Category not found"
            recipe.category_id = category_id
        
        db.session.commit()
        return recipe, None
    except IntegrityError as e:
        db.session.rollback()
        return None, str(e)


def delete_recipe(recipe_id):
    """Delete a recipe"""
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return False, "Recipe not found"
    
    try:
        db.session.delete(recipe)
        db.session.commit()
        return True, None
    except Exception as e:
        db.session.rollback()
        return False, str(e)