import pandas as pd
from constants import STATE_FILE, STOP, BUFFER_FILE, CSV_HEADER, SAVE_PATH


def init_recording():
    with open(STATE_FILE, "w") as f:
        f.write(STOP)


def write_recording(action):
    with open(STATE_FILE, "a") as f:
        f.write("\n" + action)


def is_different_lap(prev_row, curr_row):
    return (
        (abs(prev_row["Distance"] - curr_row["Distance"]) > 200)
        or (prev_row["Distance"] < 0 and curr_row["Distance"] > 0)
        or (prev_row["Track"] != curr_row["Track"])
    )


def get_laps(df):
    dfs = []
    prevRow = df.iloc[0]
    prevCutIndex = 0

    for index, row in df.iterrows():
        if is_different_lap(prevRow, row):
            dfs.append(df.iloc[prevCutIndex:index])
            prevCutIndex = index
        prevRow = row

    dfs.append(df.iloc[prevCutIndex:])
    return dfs


def get_recorded():
    columns = CSV_HEADER
    csvBuffer = pd.read_csv(BUFFER_FILE, usecols=columns)

    if csvBuffer.empty:
        return []

    laps = get_laps(csvBuffer)

    lap_info = []

    for i, lap in enumerate(laps):
        start_row = lap.iloc[0]
        end_row = lap.iloc[-1]
        lap_info.append(
            {
                "id": i,
                "track": start_row["Track"],
                "start_distance": float(start_row["Distance"]),
                "final_distance": float(end_row["Distance"]),
                "delta": int(end_row["Delta"] - start_row["Delta"]),
            }
        )

    return lap_info


def delete_recorded(deleteLapIds):
    columns = CSV_HEADER
    csvBuffer = pd.read_csv(BUFFER_FILE, usecols=columns)

    if csvBuffer.empty:
        return []

    laps = get_laps(csvBuffer)

    for i in sorted(deleteLapIds, reverse=True):
        del laps[i]

    pd.concat(laps).to_csv(BUFFER_FILE, index=False)

    return deleteLapIds


def save_recorded(saveLapId, saveLapName):
    columns = CSV_HEADER
    csvBuffer = pd.read_csv(BUFFER_FILE, usecols=columns)

    if csvBuffer.empty:
        return -1

    laps = get_laps(csvBuffer)

    lap = laps[saveLapId]

    lap.to_csv(SAVE_PATH + saveLapName + ".csv", index=False)

    return saveLapId


def get_state():
    with open(STATE_FILE, "r") as f:
        return f.readlines()[-1]


if __name__ == "__main__":
    delete_recorded([1, 2, 3])
