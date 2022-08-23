from flask import Flask, request, jsonify
from recording import (
    init_recording,
    write_recording,
    get_recorded,
    get_state,
    delete_recorded,
)
from constants import STOP, START
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.before_first_request
def init():
    print("App | Initializing")
    init_recording()


@app.post("/recording/set")
def post_recording():
    if request.is_json:
        json = request.get_json()
        if json["action"] == START:
            write_recording(START)
            return json["action"], 200
        elif json["action"] == STOP:
            write_recording(STOP)
            return json["action"], 200
        else:
            return {"error": "Incorrect format"}, 400

    return {"error": "Request must be JSON"}, 415


@app.post("/recording/delete")
def delete_recording():
    if request.is_json:
        json = request.get_json()
        print(json)
        if json["selected"]:
            delete_recorded(json["selected"])
            return json, 200
        else:
            return {"error": "Incorrect format"}, 400

    return {"error": "Request must be JSON"}, 415


@app.get("/recording")
def get_state_value():
    return get_state(), 200


@app.get("/recording/buffer")
def get_recording():
    return jsonify(get_recorded()), 200
