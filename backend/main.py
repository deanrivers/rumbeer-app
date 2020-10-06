from flask import (Flask, render_template)

app = Flask("__main__", 
    static_url_path='', 
    static_folder='../frontend/build', 
    template_folder='../frontend/build')

@app.route("/")
def serve_react_build():
    return render_template("index.html", flask_token="Hello World")

@app.route("/api/updateStats")
def update_stats():
    return {"success": True}, 200

# this handles if user wants to go to specific endpoint in react
# without this, app will return 404 for anything non '/' i.e. /stats, /logout
@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')


#app.run(debug=True)

app.run()