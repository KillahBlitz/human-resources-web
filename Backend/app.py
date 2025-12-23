from flask import Flask
from flask_cors import CORS

from extensions import db, migrate, ma
from api import bp as api_bp
import api.employees
import models

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/human_recourses_db?charset=utf8mb4'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JSON_AS_ASCII"] = False

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.register_blueprint(api_bp)

    @app.route("/")
    def home():
        return "Employee Management API is running."

    return app

if __name__ == "__main__":
    create_app().run(debug=True, port=8080)