from flask import render_template,Blueprint,jsonify,request
import json
import datetime
from slugify import slugify
from templates import mongo

api_bp = Blueprint('api',__name__)


@api_bp.route('/api_status')
def api_status(): 
    data = {
      'status': 'Server Running'
    }
    return jsonify(data)

@api_bp.route('/api/createForm', methods=['POST'])
def create_form(): 
    data = request.json['data']
    curr_dt = datetime.datetime.now()
    timestampStr = curr_dt.strftime("%d%b%Y%H%M%S%f")
    data['slug'] = slugify(data['title']+timestampStr)
    data['url'] = ('http://localhost:5000/form/'+data['slug'])
    form = mongo.db.forms
    form.insert(data)
    sendData=data
    sendData.pop('_id')
    return jsonify(data['url'])

@api_bp.route('/api/getForm', methods=['POST'])
def get_form(): 
    formId = request.json['formId']
    forms = mongo.db.forms
    f = forms.find_one({'slug':formId})

    if f:
      f.pop('_id',None)
      f['error']=False
    else:
      f={'error':True}
    return jsonify({'formData':f})

@api_bp.route('/api/submitResponse', methods=['POST'])
def submit_response(): 
    formRes = request.json
    responses = mongo.db.responses
    responses.insert(formRes)

    return jsonify({'status':'success'})


@api_bp.route('/')
def home():
    return render_template("index.html")

@api_bp.route('/<path:path>')
def paths(path):
    return render_template("index.html")

