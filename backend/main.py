import firebase_admin
import pyrebase
import json
import sys
import os
from dotenv import load_dotenv, find_dotenv  # ignore-error
from functools import wraps
from flask import (Flask, render_template, request)
from firebase_admin import credentials, auth

import requests.exceptions
# error types

app = Flask(__name__,
            static_url_path="",
            static_folder="../frontend/build",
            template_folder="../frontend/build")

load_dotenv(find_dotenv())

config = {
    "apiKey": os.environ['FIREBASE_API_KEY'],
    "authDomain": "rumbeer-dda6f.firebaseapp.com",
    "databaseURL": "https://rumbeer-dda6f.firebaseio.com",
    "projectId": "rumbeer-dda6f",
    "storageBucket": "rumbeer-dda6f.appspot.com",
    "messagingSenderId": "884743176160",
    "appId": "1:884743176160:web:82ad6a455ed9a8e7baf585",
    "measurementId": "G-45DZSXSVR2"
}

cred = credentials.Certificate("rumbeer-firebase-creds.json")
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(config)
db = pb.database()


def check_token(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if not request.headers.get("authorization"):
            return {"message": "No token provided"}, 400
        try:
            user = auth.verify_id_token(request.headers["Authorization"])
            request.user = user
        except Exception as e:
            print('error',e)
            return {"message": "Invalid token provided."}, 400
        return f(*args, **kwargs)
    return wrap


@app.route("/")
def serve_react_build():
    return render_template("index.html")


""" 
api route to sign up a new user
"""


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    firstname = data['firstname']
    if email is None or password is None:
        return {"message": "Error missing email or password"}, 400
    try:
        user = auth.create_user(
            email=email,
            password=password,
        )

        SHEET_STATS_UID = "1D_KECY_BEbw70UR8gvXuUZIrKy9xsEkJ7hbdeREyZpY"
        sheet_stats = db.child(SHEET_STATS_UID).child("Player Stats").get()
        sheet_stats = sheet_stats.val()[1:]
        

        isPlayer = False

        for entry in sheet_stats:
            if entry["email"] == email:
                isPlayer = True

        if isPlayer:
            db.child("Players").child(user.uid).set(
                {
                    "email": email,
                    "firstname":firstname,
                    "uid": user.uid,
                    "voteCounter": 0,
                    "isPlayer": isPlayer,
                    "stats": {
                        "pace": 60,
                        "defense": 60,
                        "dribbling": 60,
                        "physical": 60,
                        "overall": 60,
                        "position": 'CM',
                        "shot": 60,
                        "pass": 60
                    }

                }
            )
        else:
            db.child("Players").child(user.uid).set(
                {
                    "email": email,
                    "firstname":firstname,
                    "uid": user.uid,
                    "isPlayer": isPlayer,
                }
            )

        return {"message": f"Successfully created user {user.uid} using email {email}"}, 200
    except Exception as e:
        print('ERROR',e)
        return {"message": "Error creating user"}, 400


"""
api route to get token for authorization
"""


@app.route("/api/token", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    
    if email is None or password is None:
        return {"message": "Error missing email or password"}, 400
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user["idToken"]
        return {"token": jwt}, 200

#     except requests.exceptions.HTTPError as httpErr:
#         error_message = json.loads(httpErr.args[1])['error']['message']

    except Exception as e:
        print('Error =>',e)
        return e
        # return {"message": "There was an error logging in"}, 400


@app.route("/api/weekData", methods=["GET"])
@check_token
def week_data():
    try:
        week_dates = db.child("Weeks").get()

        print(week_dates.val())

        response = {"weeks": week_dates.val()}
        return response, 200

    except:
        return {"message": "There was an error retrieving week data"}, 400


@app.route("/api/sheetStats", methods=["GET"])
@check_token
def sheet_stats():
    try:
        SHEET_STATS_UID = "1D_KECY_BEbw70UR8gvXuUZIrKy9xsEkJ7hbdeREyZpY"
        sheet_stats = db.child(SHEET_STATS_UID).child("Player Stats").get()

        response = {"stats": sheet_stats.val()[1:]}
        return response, 200

    except:
        return {"message": "There was an error retrieving sheet stats"}, 400


@app.route("/api/sheetStandings", methods=["GET"])
@check_token
def standing_stats():
    try:
        SHEET_STANDINGS_UID = "1gMonxA02kvBpRK3HoJ6hz8LXEU4vt-1YC7yE8WLyCgY"
        standings_stats = db.child(
            SHEET_STANDINGS_UID).child("Team Standings").get()
        response = {"standings": standings_stats.val()[1:]}
        return response, 200

    except:
        return {"message": "There was an error retrieving sheet stats"}, 400


@app.route("/api/userStats", methods=["GET"])
@check_token
def userinfo():
    
    try:
        user_stats = db.child("Players").child(request.user["uid"]).get()
        return user_stats.val(), 200

    except Exception as e:
        print('ERROR',e)
        return {"message": "There was an error retrieving user stats"}, 400

@app.route("/api/allStats", methods=["GET"])
@check_token
def allStats():
    try:
        user_stats = db.child("Players").get()
        return user_stats.val(), 200

    except:
        return {"message": "There was an error retrieving all stats"}, 400


'''
 body format:
 {
     updates: [
        {
            "uid": "1234"
            "stats": 
            {
                "pace": 60,
                "defense": 60,
                "dribbling": 60,
                "physical": 60,
                "overall": 60,
                "position": 60,
                "shot": 60,
                "pass": 60
            }
        },
        {
            "uid": "3456"
            "stats": 
            {
                "pace": 60,
                "defense": 60,
                "dribbling": 60,
                "physical": 60,
                "overall": 60,
                "position": "CM,
                "shot": 60,
                "pass": 60
            }
         },
     ], 
     uid:'123456'
}
'''

@app.route("/api/updateStats", methods=["POST"])
@check_token
def update_stats():
    data = request.get_json()
    data_list = data["updates"]
    user_uid = request.user["uid"]
    
    # user_entry = db.child("Players").child(user_uid).get().val()
    # print(user_entry)

    try:

        for entry in data_list:
            uid = entry["uid"]
            stat_updates = {"stats": entry["stats"]}
            db.child("Players").child(uid).update(stat_updates)
        
        user_entry = db.child("Players").child(user_uid).get().val()
        vote_count = user_entry["voteCounter"]
        db.child("Players").child(user_uid).update({"voteCounter": vote_count + 1 })
        
        return {"message": "Updated player stats"}, 200
    except:
        return {"message": "There was an error updating stats"}, 400


"""
 this handles if user wants to go to specific endpoint in react
 without this, app will return 404 for anything non "/" i.e. /stats, /logout
"""


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run()
    # app.run(debug=True)
