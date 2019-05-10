from flask import Flask

app = Flask(__name__,
            static_folder='./public',
            template_folder='./static')

from templates.api.views import api_bp
# register the blueprints
app.register_blueprint(api_bp)