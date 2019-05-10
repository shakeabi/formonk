from flask import render_template,Blueprint,jsonify

api_bp = Blueprint('hello',__name__)

@api_bp.route('/')
def home():
    return render_template("index.html")

@api_bp.route('/<path>')
def paths(path):
    return render_template("index.html")

@api_bp.route('/api_status')
def api_status(): 
    data = {
      'status': 'Server Running'
    }
    return jsonify(data)
