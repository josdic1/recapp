# a-rec-app

# Flask Recipe API Template

A full-stack recipe application with Flask backend and authentication.

## Features

- ✅ User authentication (login/logout/session management)
- ✅ CRUD operations for Users, Categories, and Recipes
- ✅ Flask CLI commands for database management
- ✅ Flask shell with pre-loaded models
- ✅ Marshmallow serialization
- ✅ SQLAlchemy ORM
- ✅ Password hashing with Bcrypt

## Quick Start

### Backend Setup
```bash
cd server
python -m venv venv
source venv/bin/activate  # Mac/Linux
# or: venv\Scripts\activate  # Windows
pip install -r requirements.txt
flask fresh
python run.py
```

Server runs on `http://localhost:5555`

### Frontend Setup (if applicable)
```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Flask Commands
```bash
flask fresh      # Fresh database with seed data (recommended)
flask seed       # Add seed data only
flask reset      # Reset database tables
flask destroy    # Delete database file
flask stats      # Show database statistics
flask shell      # Interactive Python shell
```

## Default Test Users

- **alex** / password: `1111`
- **bea** / password: `1111`
- **cam** / password: `1111`

## API Endpoints

### Authentication
- `POST /login` - Login user
- `POST /logout` - Logout user
- `POST /register` - Register new user
- `GET /check-session` - Check if logged in

### Users
- `GET /users` - Get all users
- `GET /users/<id>` - Get user by ID
- `PATCH /users/<id>` - Update user
- `DELETE /users/<id>` - Delete user

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create category
- `GET /categories/<id>` - Get category by ID
- `PATCH /categories/<id>` - Update category
- `DELETE /categories/<id>` - Delete category

### Recipes
- `GET /recipes?user_id=1&category_id=2` - Get recipes (filterable)
- `POST /recipes` - Create recipe
- `GET /recipes/<id>` - Get recipe by ID
- `PATCH /recipes/<id>` - Update recipe
- `DELETE /recipes/<id>` - Delete recipe

## Database Schema
```
User
├── id (PK)
├── name
├── _password_hash
└── recipes (one-to-many)

Category
├── id (PK)
├── name (unique)
└── recipes (one-to-many)

Recipe
├── id (PK)
├── name
├── user_id (FK → User)
└── category_id (FK → Category)
```

## Project Structure
```
a-rec-app/
├── server/
│   ├── app/
│   │   ├── __init__.py      # App factory
│   │   ├── config.py        # Configuration
│   │   ├── extensions.py    # Flask extensions
│   │   ├── models.py        # Database models
│   │   ├── routes.py        # API endpoints
│   │   ├── schemas.py       # Marshmallow schemas
│   │   └── services.py      # Business logic
│   ├── instance/            # Database file (gitignored)
│   ├── .flaskenv           # Flask environment variables
│   ├── requirements.txt     # Python dependencies
│   └── run.py              # Entry point + CLI commands
└── client/                  # Frontend (if applicable)
```

## Tech Stack

**Backend:**
- Flask 3.1.2
- SQLAlchemy 2.0.44
- Flask-Marshmallow 1.3.0
- Flask-Bcrypt 1.0.1
- Flask-CORS 6.0.1

## License

MIT
