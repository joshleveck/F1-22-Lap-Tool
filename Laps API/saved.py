import glob
import os
import pandas as pd

from constants import SAVE_PATH, CSV_HEADER


def get_saved():
    saved_info = []
    for i, fname in enumerate(glob.glob(SAVE_PATH + "*.csv")):
        csv_saved = pd.read_csv(fname, usecols=CSV_HEADER)
        start_row = csv_saved.iloc[0]
        end_row = csv_saved.iloc[-1]
        saved_info.append(
            {
                "id": i,
                "track": start_row["Track"],
                "start_distance": float(start_row["Distance"]),
                "final_distance": float(end_row["Distance"]),
                "delta": int(end_row["Delta"] - start_row["Delta"]),
                "name": fname.split("\\")[1].split(".")[0],
            }
        )

    return saved_info


def delete_saved(deleteLapIds):
    for i, fname in enumerate(glob.glob(SAVE_PATH + "*.csv")):
        if i in deleteLapIds:
            os.remove(fname)

    return deleteLapIds
