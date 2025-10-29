from flask import Blueprint, request, jsonify, session
from app.extensions import db
from app.models import User, Category, Recipe
from app.schemas import (
    user_schema, users_schema,
    category_schema, categories_schema,
    recipe_schema, recipes_schema
)
from app.services import (
    create_user, get_user_by_id, get_all_users, authenticate_user,
    update_user, delete_user,
    create_category, get_category_by_id, get_all_categories,
    update_category, delete_category,
    create_recipe, get_recipe_by_id, get_all_recipes,
    get_recipes_by_user, get_recipes_by_category,
    update_recipe, delete_recipe
)

main_bp = Blueprint('main', __name__)

# ==================== SESSION MANAGEMENT ROUTES ====================

@main_bp.route('/login', methods=['POST'])
def login():
    """Authenticate user and create session"""
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('password'):
        return jsonify({'error': 'Name and password required'}), 400
    
    user = authenticate_user(data['name'], data['password'])
    
    if user:
        # Store user_id in session
        session['user_id'] = user.id
        session['user_name'] = user.name
        
        return jsonify({
            'message': 'Login successful',
            'user': user_schema.dump(user)
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


@main_bp.route('/logout', methods=['POST'])
def logout():
    """Logout user and clear session"""
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200


@main_bp.route('/check-session', methods=['GET'])
def check_session():
    """Check if user is logged in"""
    user_id = session.get('user_id')
    
    if not user_id:
        return jsonify({'error': 'Not logged in'}), 401
    
    user = get_user_by_id(user_id)
    
    if not user:
        session.clear()  # Clear invalid session
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'message': 'Session valid',
        'user': user_schema.dump(user)
    }), 200


@main_bp.route('/register', methods=['POST'])
def register():
    """Register a new user and auto-login"""
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('password'):
        return jsonify({'error': 'Name and password required'}), 400
    
    user, error = create_user(data['name'], data['password'])
    
    if error:
        return jsonify({'error': error}), 400
    
    # Auto-login after registration
    session['user_id'] = user.id
    session['user_name'] = user.name
    
    return jsonify({
        'message': 'User created successfully',
        'user': user_schema.dump(user)
    }), 201


# ==================== USER ROUTES ====================

@main_bp.route('/users', methods=['GET'])
def get_users():
    """Get all users"""
    users = get_all_users()
    return jsonify(users_schema.dump(users)), 200


@main_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user by ID"""
    user = get_user_by_id(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(user_schema.dump(user)), 200


@main_bp.route('/users/<int:user_id>', methods=['PATCH'])
def update_user_route(user_id):
    """Update user"""
    data = request.get_json()
    
    user, error = update_user(
        user_id,
        name=data.get('name'),
        password=data.get('password')
    )
    
    if error:
        return jsonify({'error': error}), 400
    
    return jsonify(user_schema.dump(user)), 200


@main_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user_route(user_id):
    """Delete user"""
    success, error = delete_user(user_id)
    
    if not success:
        return jsonify({'error': error}), 404
    
    return jsonify({'message': 'User deleted successfully'}), 200


# ==================== CATEGORY ROUTES ====================

@main_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all categories (shared across all users)"""
    categories = get_all_categories()
    return jsonify(categories_schema.dump(categories)), 200


@main_bp.route('/categories', methods=['POST'])
def create_category_route():
    """Create a new category"""
    data = request.get_json()
    
    if not data or not data.get('name'):
        return jsonify({'error': 'Category name required'}), 400
    
    category, error = create_category(data['name'])
    
    if error:
        return jsonify({'error': error}), 400
    
    return jsonify(category_schema.dump(category)), 201


@main_bp.route('/categories/<int:category_id>', methods=['GET'])
def get_category(category_id):
    """Get category by ID"""
    category = get_category_by_id(category_id)
    
    if not category:
        return jsonify({'error': 'Category not found'}), 404
    
    return jsonify(category_schema.dump(category)), 200


@main_bp.route('/categories/<int:category_id>', methods=['PATCH'])
def update_category_route(category_id):
    """Update category"""
    data = request.get_json()
    
    if not data or not data.get('name'):
        return jsonify({'error': 'Category name required'}), 400
    
    category, error = update_category(category_id, data['name'])
    
    if error:
        return jsonify({'error': error}), 400
    
    return jsonify(category_schema.dump(category)), 200


@main_bp.route('/categories/<int:category_id>', methods=['DELETE'])
def delete_category_route(category_id):
    """Delete category"""
    success, error = delete_category(category_id)
    
    if not success:
        return jsonify({'error': error}), 404
    
    return jsonify({'message': 'Category deleted successfully'}), 200


# ==================== RECIPE ROUTES ====================

@main_bp.route('/recipes', methods=['GET'])
def get_recipes():
    """
    Get recipes filtered by user_id and/or category_id
    Query params: ?user_id=1&category_id=2
    """
    user_id = request.args.get('user_id', type=int)
    category_id = request.args.get('category_id', type=int)
    
    if user_id and category_id:
        # Get recipes by specific user AND category
        recipes = Recipe.query.filter_by(user_id=user_id, category_id=category_id).all()
    elif user_id:
        # Get all recipes by user
        recipes = get_recipes_by_user(user_id)
    elif category_id:
        # Get all recipes in category (across all users - probably not needed)
        recipes = get_recipes_by_category(category_id)
    else:
        # Get all recipes
        recipes = get_all_recipes()
    
    return jsonify(recipes_schema.dump(recipes)), 200


@main_bp.route('/recipes', methods=['POST'])
def create_recipe_route():
    """Create a new recipe"""
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('user_id') or not data.get('category_id'):
        return jsonify({'error': 'Name, user_id, and category_id required'}), 400
    
    recipe, error = create_recipe(
        data['name'],
        data['user_id'],
        data['category_id']
    )
    
    if error:
        return jsonify({'error': error}), 400
    
    return jsonify(recipe_schema.dump(recipe)), 201


@main_bp.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """Get recipe by ID"""
    recipe = get_recipe_by_id(recipe_id)
    
    if not recipe:
        return jsonify({'error': 'Recipe not found'}), 404
    
    return jsonify(recipe_schema.dump(recipe)), 200


@main_bp.route('/recipes/<int:recipe_id>', methods=['PATCH'])
def update_recipe_route(recipe_id):
    """Update recipe"""
    data = request.get_json()
    
    recipe, error = update_recipe(
        recipe_id,
        name=data.get('name'),
        user_id=data.get('user_id'),
        category_id=data.get('category_id')
    )
    
    if error:
        return jsonify({'error': error}), 400
    
    return jsonify(recipe_schema.dump(recipe)), 200


@main_bp.route('/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe_route(recipe_id):
    """Delete recipe"""
    success, error = delete_recipe(recipe_id)
    
    if not success:
        return jsonify({'error': error}), 404
    
    return jsonify({'message': 'Recipe deleted successfully'}), 200


# ==================== HEALTH CHECK ====================

@main_bp.route('/', methods=['GET'])
def health_check():
    """API health check"""
    return jsonify({'message': 'Recipe API is running'}), 200