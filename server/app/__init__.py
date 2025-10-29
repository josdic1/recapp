from flask import Flask
from flask_cors import CORS
from app.extensions import db, migrate, bcrypt, ma
from app.config import Config

def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    ma.init_app(app)
    
    # CORS with credentials support for sessions - VITE PORT
    CORS(app, supports_credentials=True, origins=['http://localhost:5173'])
    
    # Register blueprints
    from app.routes import main_bp
    app.register_blueprint(main_bp)
    
    return app