import glob
import pandas as pd
import csv

from constants import SAVE_PATH, CSV_HEADER, COMPARE_FILE, COMPARE_HEADER
from saved import get_saved
from f1Laps import get_f1_lap


def init_compare():
    reset_compare()


def reset_compare():
    with open(COMPARE_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(COMPARE_HEADER)


def write_to_compare(row):
    with open(COMPARE_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(row)


def write_driver(driver, circuit):
    write_to_compare([None, driver, circuit])


def write_personal(id):
    write_to_compare([id, None, None])


def get_lap_personal(id):
    dfLap = pd.read_csv(glob.glob(SAVE_PATH + "*.csv")[id], usecols=CSV_HEADER)
    data = []
    for index, row in dfLap.iterrows():
        data.append(
            {
                "delta": row["Delta"],
                "distance": row["Distance"],
                "speed": row["Speed"],
                "throttle": row["Throttle"] * 100,
                "gear": row["nGear"],
                "rpm": row["RPM"],
            }
        )
    return {"data": data, "track": dfLap.iloc[0]["Track"]}


def get_lap_driver(driver, track):
    dfLap = get_f1_lap(track, driver)
    data = []
    for index, row in dfLap.iterrows():
        data.append(
            {
                "delta": row["Time"].total_seconds() * 1000,
                "distance": row["Distance"],
                "speed": row["Speed"],
                "throttle": row["Throttle"],
                "gear": row["nGear"],
                "rpm": row["RPM"],
            }
        )
    return {"data": data, "track": track}


def get_compare():
    data = []
    with open(COMPARE_FILE, "r") as f:
        datareader = csv.reader(f)
        for row in datareader:
            print(row)
            if row[0] == "Personal":
                continue
            elif row[0] != "":
                data.append(get_lap_personal(int(row[0])))
            elif row[1] != "" and row[2] != "":
                data.append(get_lap_driver(row[1], row[2]))

    return data
