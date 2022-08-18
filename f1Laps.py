import fastf1 as ff1
from fastf1 import plotting
from fastf1 import utils

from matplotlib import pyplot as plt
from matplotlib.pyplot import figure

import numpy as np
import pandas as pd

ff1.Cache.enable_cache("cache")


def get_f1_lap(grand_prix, driver):
    quali = ff1.get_session(2022, grand_prix, "Q")
    quali.load()
    laps_driver = quali.laps.pick_driver(driver)
    fastest_driver = laps_driver.pick_fastest()
    telemetry_driver = fastest_driver.get_telemetry().add_distance()
    return telemetry_driver[["Time", "RPM", "Speed", "nGear", "Throttle", "Distance"]]


if __name__ == "__main__":
    print(get_f1_lap("Austria", "VER"))
