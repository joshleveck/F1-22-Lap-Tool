import json
from lib2to3.pgen2 import driver
from flask import Flask, request, jsonify
from recording import (
    init_recording,
    write_recording,
    get_recorded,
    get_state,
    delete_recorded,
    save_recorded,
)
from saved import get_saved, delete_saved
from compare import (
    write_driver,
    write_personal,
    init_compare,
    get_compare,
    reset_compare,
)
from constants import STOP, START
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.before_first_request
def init():
    print("App | Initializing")
    init_recording()
    init_compare()


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


@app.delete("/recording/delete")
def delete_recording():
    if request.is_json:
        json = request.get_json()
        if json["selected"]:
            delete_recorded(json["selected"])
            return json, 200
        else:
            return {"error": "Incorrect format"}, 400

    return {"error": "Request must be JSON"}, 415


@app.post("/recording/save")
def save_recording():
    if request.is_json:
        json = request.get_json()
        if json["selected"] and json["name"]:
            save_recorded(json["selected"], json["name"])
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


@app.get("/saved")
def get_save():
    return jsonify(get_saved()), 200


@app.delete("/saved")
def delete_save():
    if request.is_json:
        json = request.get_json()
        if json["selected"]:
            delete_saved(json["selected"])
            return json, 200
        else:
            return {"error": "Incorrect format"}, 400

    return {"error": "Request must be JSON"}, 415


@app.post("/compare/driver")
def post_driver_lap():
    if request.is_json:
        json = request.get_json()
        if json["driver"] and json["circuit"]:
            write_driver(json["driver"], json["circuit"])
            return json, 200
        else:
            return {"error": "Incorrect format"}, 400

    return {"error": "Request must be JSON"}, 415


@app.post("/compare/personal")
def post_personal_lap():
    if request.is_json:
        json = request.get_json()
        if json["id"] is not None:
            write_personal(json["id"])
            return json, 200
        else:
            return {"error": "Incorrect format"}, 400

    return {"error": "Request must be JSON"}, 415


@app.get("/compare/reset")
def compare_reset():
    return reset_compare(), 200


@app.get("/compare")
def compare_get():
    return jsonify(get_compare()), 200
