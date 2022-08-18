from flask import Flask, request, jsonify
import csv
from f1Laps import get_f1_lap

app = Flask(__name__)


def getDistance(line):
    return float(line[2])


@app.get("/player_data")
def get_player_data():
    with open("lap.csv", "r", encoding="utf-8") as f:
        try:
            return jsonify(list(f.readlines())[-100:])
        except:
            return jsonify([])


@app.get("/previous_lap")
def get_previos_lap(lap):
    with open("C:\code\Personal Github\F1-22-Data\lap.csv", "r", encoding="utf-8") as f:
        datareader = csv.reader(f)
        totalLaps = []
        currLap = []

        prevRow = None
        for row in datareader:
            if prevRow == None or prevRow[0] == "Track ID":
                prevRow = row
            elif abs(getDistance(prevRow) - getDistance(row)) > 500:
                totalLaps.append(currLap)
            else:
                currLap.append(row)
                prevRow = row

        if lap > len(totalLaps):
            return {"error": "not enough laps"}, 415
        return jsonify(totalLaps[-lap])


@app.get("/f1_lap")
def get_lap():
    get_f1_lap()


print(get_previos_lap(1))
