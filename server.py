from asyncore import write
import socket
import csv
from decoding import CarTelemetryData, LapDataPacket, SessionPacket, Header, getPacketId

UDP_IP = ""
UDP_PORT = 20777
CSV_HEADER = [
    "Track ID",
    "Current Lap Time",
    "Current Lap Distance",
    "Speed",
    "Throttle",
    "Brake",
    "Gear",
    "RPM",
]
NUM_BUFFER_LINES = 10


def csvHeader():
    with open("lap.csv", "w", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(CSV_HEADER)


def csvWriteRows(rows):
    with open("lap.csv", "a", encoding="UTF8", newline="") as f:
        writer = csv.writer(f)
        writer.writerows(rows)


def getLapLine(trackId, lap, telemetry):
    return [
        trackId,
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

    print("Binding socket...")
    sock.bind((UDP_IP, UDP_PORT))
    print("Socket bound")
    csvHeader()

    lap, telemetry = None, None
    trackId = -1

    lapLines = []
    numLapLines = 0
    while True:
        data = sock.recvfrom(65507)[0]
        packetId = getPacketId(data)
        if packetId == 1:
            session = SessionPacket(data)
            trackId = session.trackId
        if packetId == 2:
            lap = LapDataPacket(data)
        if packetId == 6:
            telemetry = CarTelemetryData(data)

        if lap != None and telemetry != None:
            lapLines.append(getLapLine(trackId, lap, telemetry))
            numLapLines += 1
            if numLapLines >= NUM_BUFFER_LINES:
                print("Writing")
                csvWriteRows(lapLines)
                lapLines = []
                numLapLines = 0
            lap, telemetry = None, None


if __name__ == "__main__":
    main()
