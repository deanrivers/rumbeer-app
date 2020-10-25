import firebase_admin
import pyrebase
import os
from dotenv import load_dotenv, find_dotenv  # ignore-error
from functools import wraps
from flask import (Flask, render_template, request)
from flask_cors import CORS
from firebase_admin import credentials, auth, db

import requests.exceptions
# error types

app = Flask(__name__,
            static_url_path="",
            static_folder="./frontend/build",
            template_folder="./frontend/build")

cors = CORS(app, resources={r"/api/*": {"origins": "nydraft.com"}})

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
firebase = firebase_admin.initialize_app(cred, {
    "databaseURL": "https://rumbeer-dda6f.firebaseio.com"
})
pb = pyrebase.initialize_app(config)
pyre_db = pb.database()
pyre_auth = pb.auth()

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
            return {"message": "Invalid token provided.","status":400}, 400
        return f(*args, **kwargs)
    return wrap


@app.route("/")
def serve_react_build():
    return render_template("index.html")


""" 
api route to sign up a new user
"""

@app.route("/api/test")
def test_route():
    try:
        return {"message": "Hello World!"}, 200
    except Exception as e:
        return {"message": "This shouldn't be failing!"}, 400


@app.route("/api/resetPassword", methods=["POST"])
def send_reset_email():
    data = request.get_json()
    email = data["email"].lower()

    if email is None:
        return {"message": "Error missing email"}, 400

    try:
        pyre_auth.send_password_reset_email(email)

        return {"message": "Reset password email sent to: " + email + "!"}, 200

    except:
        return {"message": "Error sending reset password email"}, 400

    

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data['email'].lower()
    password = data['password']
    firstname_form = data['firstname']
    if email is None or password is None:
        return {"message": "Error missing email or password"}, 400
    try:
        user = auth.create_user(
            email=email,
            password=password,
        )

        SHEET_STATS_UID = "1D_KECY_BEbw70UR8gvXuUZIrKy9xsEkJ7hbdeREyZpY"
        sheet_stats = pyre_db.child(SHEET_STATS_UID).child("Player Stats").get()
        sheet_stats = sheet_stats.val()[1:]
        
        isPlayer = False
        position_value = ""
        team_value = ""
        country_value = ""

        for entry in sheet_stats:
            if entry["email"].lower() == email:
                isPlayer = True
                position_value = entry["position"]
                team_value = entry["team"]
                country_value = entry["country"]
                firstname = entry["name"]


        if isPlayer:
            pyre_db.child("Players").child(user.uid).set(
                {
                    "email": email,
                    "firstname": firstname,
                    "uid": user.uid,
                    "voteCounter": 0,
                    "isPlayer": isPlayer,
                    "position": position_value,
                    "team": team_value,
                    "country": country_value,
                    "stats": {
                        "pace": 60,
                        "defense": 60,
                        "dribbling": 60,
                        "physical": 60,
                        "overall": 60,
                        "shot": 60,
                        "pass": 60
                    },
                }
            )
        else:
            pyre_db.child("Players").child(user.uid).set(
                {
                    "email": email,
                    "firstname": firstname_form,
                    "uid": user.uid,
                    "isPlayer": isPlayer,
                }
            )

        return {"message": f"Successfully created user {user.uid} using email {email}","status":200}, 200
    except Exception as e:
        print('ERROR',e)
        return {"message": "Error creating user","status":400}, 400


"""
api route to get token for authorization
"""


@app.route("/api/token", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    
    if email is None or password is None:
        return {"message": "Error missing email or password","status":400}, 400
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user["idToken"]
        return {"token": jwt,"status":200}, 200

#     except requests.exceptions.HTTPError as httpErr:
#         error_message = json.loads(httpErr.args[1])['error']['message']

    except Exception as e:
        # print('Error =>',e)
        # return e
        return {"message": "There was an error logging in","status":400}, 400


@app.route("/api/weekData", methods=["GET"])
@check_token
def week_data():
    try:
        week_dates = pyre_db.child("Weeks").get()
        response = {"weeks": week_dates.val()}
        return response, 200

    except:
        return {"message": "There was an error retrieving week data","status":400}, 400


@app.route("/api/weeklyResults", methods=["GET"])
@check_token
def week_results_data():
    try:

        WEEK_RESULT_UID = "15rZ-GRErVv3fjMnhaDMLbYmjDp6_Zm-rs_MYHeWWiB4"
        week_result_stats = pyre_db.child(WEEK_RESULT_UID).child("Game Results").get()

        response = {"weekResults": week_result_stats.val()[1:]}
        return response, 200

    except:
        return {"message": "There was an error retrieving week results data"}, 400


@app.route("/api/sheetStats", methods=["GET"])
@check_token
def sheet_stats():
    try:
        SHEET_STATS_UID = "1D_KECY_BEbw70UR8gvXuUZIrKy9xsEkJ7hbdeREyZpY"
        sheet_stats = pyre_db.child(SHEET_STATS_UID).child("Player Stats").get()

        response = {"stats": sheet_stats.val()[1:]}
        return response, 200

    except:
        return {"message": "There was an error retrieving sheet stats"}, 400


@app.route("/api/sheetStandings", methods=["GET"])
@check_token
def standing_stats():
    try:
        SHEET_STANDINGS_UID = "1gMonxA02kvBpRK3HoJ6hz8LXEU4vt-1YC7yE8WLyCgY"
        standings_stats = pyre_db.child(
            SHEET_STANDINGS_UID).child("Team Standings").get()
        response = {"standings": standings_stats.val()[1:]}
        return response, 200

    except:
        return {"message": "There was an error retrieving sheet stats"}, 400


@app.route("/api/userStats", methods=["GET"])
@check_token
def userinfo():
    
    try:
        user_stats = pyre_db.child("Players").child(request.user["uid"]).get()
        return user_stats.val(), 200

    except Exception as e:
        print('ERROR',e)
        return {"message": "There was an error retrieving user stats"}, 400

@app.route("/api/allStats", methods=["GET"])
@check_token
def allStats():
    try:
        user_stats = pyre_db.child("Players").get()
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
                "pace": "+1",
                "defense": "-1",
                "dribbling": "0",
                "physical": "-1",
                "shot": "0",
                "pass": "0"
            }
        },
        {
            "uid": "3456"
            "stats": 
            {
                "pace": "+1",
                "defense": "-1",
                "dribbling": "0",
                "physical": "-1",
                "shot": "0",
                "pass": "0"
            }
         },
     ], 
}
'''

@app.route("/api/updateStats", methods=["POST"])
@check_token
def update_stats():
    data = request.get_json()
    data_list = data["updates"]
    user_uid = request.user["uid"]
    
    # user_entry = pyre_db.child("Players").child(user_uid).get().val()
    # print(user_entry)

    try:
        
        for entry in data_list:
            uid = entry["uid"]
            user_updates = entry["stats"]
            player_ref  = db.reference("Players/" + uid + "/stats")

            def get_overall_average(current_data, user_updates):
                sum = 0
                total_entries = len(current_data) - 1
                for key, value in current_data.items():
                    if key == "overall":
                        continue 

                    sum += int(value) + int(user_updates[key])

                return round(sum / total_entries)

            def update_player_stats(current_data):
                if not current_data:
                    return {}

                
                updated_stats = {
                    "pace": int(current_data["pace"]) + int(user_updates["pace"]),
                    "defense": int(current_data["defense"]) + int(user_updates["defense"]),
                    "dribbling": int(current_data["dribbling"]) + int(user_updates["dribbling"]),
                    "physical": int(current_data["physical"]) + int(user_updates["physical"]),
                    "overall": get_overall_average(current_data, user_updates),
                    "shot": int(current_data["shot"]) + int(user_updates["shot"]),
                    "pass": int(current_data["pass"]) + int(user_updates["pass"]),
                }

                return updated_stats
            
            player_ref.transaction(update_player_stats)
        
        user_entry = pyre_db.child("Players").child(user_uid).get().val()
        vote_count = user_entry["voteCounter"]
        pyre_db.child("Players").child(user_uid).update({"voteCounter": vote_count + 1 })
        
        return {"message": "Updated player stats","status":200}, 200
    except Exception as e:
        print(e)
        return {"message": "There was an error updating stats","status":400}, 400
 


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
