import socket
import csv
from time import sleep
from decoding import CarTelemetryData, LapDataPacket, SessionPacket, Header, getPacketId
from constants import (
    CSV_HEADER,
    TRACK_IDS,
    UDP_IP,
    UDP_PORT,
    NUM_BUFFER_LINES,
    BUFFER_FILE,
    STATE_FILE,
    STOP,
)
from recording import get_state


def csvHeader():
    with open(BUFFER_FILE, "w", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(CSV_HEADER)


def csvWriteRows(rows):
    with open(BUFFER_FILE, "a", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(rows)


def getLapLine(trackId, lap, telemetry):
    return [
        TRACK_IDS[trackId],
        lap.lapData[0].currentLapTime,
        lap.lapData[0].lapDistance,
        telemetry.carData[0].speed,
        telemetry.carData[0].throttle,
        telemetry.carData[0].brake,
        telemetry.carData[0].gear,
        telemetry.carData[0].rpm,
    ]


def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    print("Server | Binding socket")
    sock.bind((UDP_IP, UDP_PORT))
    print("Server | Socket bound")
    csvHeader()

    lap, telemetry = None, None
    trackId = -1

    lapLines = []
    numLapLines = 0
    while True:
        state = get_state()
        if state == STOP:
            lap, telemetry = None, None
            trackId = -1

            lapLines = []
            numLapLines = 0

            sleep(1)
        else:
            data = sock.recvfrom(65507)[0]
            packetId = getPacketId(data)

            if packetId == 1:
                trackId = SessionPacket(data).trackId
            if packetId == 2:
                lap = LapDataPacket(data)
            if packetId == 6:
                telemetry = CarTelemetryData(data)

            if lap != None and telemetry != None:

                lapLines.append(getLapLine(trackId, lap, telemetry))
                numLapLines += 1

                if numLapLines >= NUM_BUFFER_LINES:
                    print("Server | Writing buffer lines")
                    csvWriteRows(lapLines)
                    lapLines = []
                    numLapLines = 0

                lap, telemetry = None, None


if __name__ == "__main__":
    main()
