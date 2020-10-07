import firebase_admin
import pyrebase
import json
from flask import (Flask, render_template, request)
from firebase_admin import credentials, auth


app = Flask(__name__, 
    static_url_path='', 
    static_folder='../frontend/build', 
    template_folder='../frontend/build')


cred = credentials.Certificate('rumbeer-firebase-creds.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('fbConfig.json')))

@app.route("/")
def serve_react_build():
    return render_template("index.html", flask_token="Hello World")

#Api route to sign up a new user
@app.route('/api/signup', methods=['POST'])
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