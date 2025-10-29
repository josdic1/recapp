# app/schemas.py
from app.extensions import ma
from app.models import User, Category, Recipe

class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance = True
        include_fk = True


class RecipeSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Recipe
        load_instance = True
        include_fk = True
    
    category = ma.Nested(CategorySchema)


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ('_password_hash', 'recipes')  # ← EXCLUDE recipes!
        load_only = ('password',)
    
    password = ma.String(load_only=True, required=True)
    
    # ONLY include categories - NO recipes
    categories = ma.Method("get_categories")
    
    def get_categories(self, obj):
        """Get user's categories"""
        return [{'id': cat.id, 'name': cat.name} for cat in obj.categories]


# Schema instances
user_schema = UserSchema()
users_schema = UserSchema(many=True)

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)

recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)