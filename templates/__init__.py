from flask import Flask
from flask_pymongo import PyMongo
from dbconfig import dbconfig

app = Flask(__name__,
            static_folder='./public',
            template_folder='./static')

app.config['MONGO_DBNAME'] = dbconfig.dbname
app.config['MONGO_URI'] = dbconfig.uri

mongo = PyMongo(app)

from templates.api.views import api_bp
# register the blueprints
app.register_blueprint(api_bp)