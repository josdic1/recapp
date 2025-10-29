from app.extensions import ma
from app.models import User, Category, Recipe

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ('_password_hash',)  # Never expose password hash
        load_only = ('password',)  # Password only for input, not output
    
    # Allow password input for creation/update
    password = ma.String(load_only=True, required=True)
    
    # Include related recipes
    recipes = ma.Nested('RecipeSchema', many=True, exclude=('user',))


class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance = True
        include_fk = True
    
    # Include related recipes (optional)
    recipes = ma.Nested('RecipeSchema', many=True, exclude=('category',))


class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
        load_instance = True
        include_fk = True
    
    # Nested relationships
    user = ma.Nested(UserSchema, exclude=('recipes', '_password_hash'))
    category = ma.Nested(CategorySchema, exclude=('recipes',))


# Schema instances for use in routes
user_schema = UserSchema()
users_schema = UserSchema(many=True)

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)