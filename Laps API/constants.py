UDP_IP = ""
UDP_PORT = 20777
CSV_HEADER = [
    "Track",
    "Delta",
    "Distance",
    "Speed",
    "Throttle",
    "Brake",
    "nGear",
    "RPM",
]
NUM_BUFFER_LINES = 10
TRACK_IDS = {
    -1: "Undefined",
    0: "Australia",
    1: "France",
    2: "China",
    3: "Bahrain",
    4: "Spain",
    5: "Monaco",
    6: "Canada",
    7: "Britain",
    8: "Germany",
    9: "Hungary",
    10: "Belgium",
    11: "Monza",
    12: "Singapore",
    13: "Japan",
    14: "Abu Dhabi",
    15: "Circuit of the Americas",
    16: "Brazil",
    17: "Austria",
    18: "Russia",
    19: "Mexico",
    20: "Azerbaijan",
    21: "Sakhir Short",
    22: "Silverstone Short",
    23: "Texas Short",
    24: "Suzuka Short",
    25: "Hanoi",
    26: "Netherlands",
    27: "Imola",
    28: "Portugal",
    29: "Jeddah",
    30: "Miami",
}

STATE_FILE = "../storage/recording.txt"
BUFFER_FILE = "../storage/buffer.csv"

START = "start"
STOP = "stop"
