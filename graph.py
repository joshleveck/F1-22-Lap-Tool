from webbrowser import get
import numpy as np
import pandas as pd
import csv
from server import CSV_HEADER
import matplotlib.pyplot as plt
from f1Laps import get_f1_lap


def getLastLine():
    with open("lap.csv", "r") as f:
        return f.readlines()[-1]


def getDistance(line):
    return line.split(",")[2]


def getTime(line):
    return line.split(",")[1]


def getSpeed(line):
    return line.split(",")[3]


def getLap(lap):
    columns = CSV_HEADER
    df = pd.read_csv("./lap.csv", usecols=columns)

    dfs = []
    prevRow = df.iloc[0]
    prevCutIndex = 0

    for index, row in df.iterrows():
        if abs(prevRow["Current Lap Distance"] - row["Current Lap Distance"]) > 200 or (
            prevRow["Current Lap Distance"] < 0 and row["Current Lap Distance"] > 0
        ):
            dfs.append(df.iloc[prevCutIndex:index])
            prevCutIndex = index
        prevRow = row

    return dfs[-lap]


def graph(lap):
    getLap(lap).plot(x="Current Lap Distance", subplots=True, layout=(8, 1))
    plt.show()


# time, rpm, speed, nGear, throttle


def compF1(grand_prix, driver, lap):
    f1Lap = get_f1_lap(grand_prix, driver)
    yourLap = getLap(lap)

    delta = getDelta(f1Lap, yourLap)

    plot_size = [15, 15]
    plot_ratios = [1, 1, 3, 1, 2]
    plot_filename = "./Pictures" + grand_prix + "Comp" + driver + ".png"

    plt.rcParams["figure.figsize"] = plot_size

    fig, ax = plt.subplots(5, gridspec_kw={"height_ratios": plot_ratios})

    ax[0].plot(delta["Distance"], delta["Delta"], label="Delta", color="blue")
    ax[0].axhline(0)
    ax[0].set(ylabel="Delta")

    ax[1].plot(
        yourLap["Current Lap Distance"], yourLap["RPM"], label="You", color="blue"
    )
    ax[1].plot(f1Lap["Distance"], f1Lap["RPM"], label=driver, color="red")
    ax[1].set(ylabel="RPM")

    ax[2].plot(
        yourLap["Current Lap Distance"], yourLap["Speed"], label="You", color="blue"
    )
    ax[2].plot(f1Lap["Distance"], f1Lap["Speed"], label=driver, color="red")
    ax[2].set(ylabel="Speed")
    ax[2].legend(loc="lower right")

    ax[3].plot(
        yourLap["Current Lap Distance"], yourLap["Gear"], label="You", color="blue"
    )
    ax[3].plot(f1Lap["Distance"], f1Lap["nGear"], label=driver, color="red")
    ax[3].set(ylabel="Gear")

    ax[4].plot(
        yourLap["Current Lap Distance"],
        yourLap["Throttle"] * 100,
        label="You",
        color="blue",
    )
    ax[4].plot(f1Lap["Distance"], f1Lap["Throttle"], label=driver, color="red")
    ax[4].set(ylabel="Throttle")

    plt.savefig(plot_filename, dpi=300)

    plt.show()


def getDelta(f1Lap, yourLap):
    newDf = pd.DataFrame(data={"Distance": [], "Delta": []})

    for index, f1Row in f1Lap.iterrows():
        yourRow = yourLap.iloc[
            (yourLap["Current Lap Distance"] - f1Row["Distance"])
            .abs()
            .argsort()
            .iloc[0]
        ]

        newDf.loc[index] = [
            f1Row["Distance"],
            yourRow["Current Lap Time"] - f1Row["Time"].total_seconds() * 1000,
        ]

    return newDf


compF1("Austria", "LAT", 1)
