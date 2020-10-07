import firebase_admin
import pyrebase
import json
from functools import wraps
from flask import (Flask, render_template, request)
from firebase_admin import credentials, auth

app = Flask(__name__, 
    static_url_path='', 
    static_folder='../frontend/build', 
    template_folder='../frontend/build')

cred = credentials.Certificate('rumbeer-firebase-creds.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('fbConfig.json')))

def check_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get('authorization'):
            return {'message': 'No token provided'},400
        try:
            user = auth.verify_id_token(request.headers['Authorization'])
            print(user)
            request.user = user
        except:
            return {'message':'Invalid token provided.'},400
        return f(*args, **kwargs)
    return wrap

@app.route("/")
def serve_react_build():
    return render_template("index.html")

#api route to sign up a new user
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    if email is None or password is None:
        return {'message': 'Error missing email or password'},400
    try:
        user = auth.create_user(
               email=email,
               password=password
        )
        return {'message': f'Successfully created user {user.uid}'},200
    except:
        return {'message': 'Error creating user'},400

#api route to get token for authorization
@app.route("/api/token", methods=["POST"])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    if email is None or password is None:
        return {'message': 'Error missing email or password'},400
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user['idToken']
        return {'token': jwt}, 200
    except:
        return {'message': 'There was an error logging in'},400

@app.route('/api/userinfo')
@check_token
def userinfo():
    return {"data": request.user}, 200

@app.route("/api/updateStats")
def update_stats():
    return {"success": True}, 200

# this handles if user wants to go to specific endpoint in react
# without this, app will return 404 for anything non '/' i.e. /stats, /logout
@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)

#app.run()