import struct


def toInteger(bytes):
    return int.from_bytes(bytes, byteorder="little")


def toFloat(bytes):
    return struct.unpack("<f", bytes)[0]


def getPacketId(string):
    return toInteger(string[5:6])


class Header:
    def __init__(self, string: str) -> None:
        self.gameYear = toInteger(string[0:2])  # uint16
        self.gameMajorVersion = toInteger(string[2:3])  # uint8
        self.gameMinorVersion = toInteger(string[3:4])  # uint8
        self.packetVersion = toInteger(string[4:5])  # uint8
        self.packetId = toInteger(string[5:6])  # uint8
        self.sessionUID = toInteger(string[6:14])  # uint64
        self.sessionTime = toFloat(string[14:18])  # float
        self.frameIdentifier = toInteger(string[18:22])  # uint32
        self.playerCarIndex = toInteger(string[22:23])  # uint8
        self.secondaryPlayerCarIndex = toInteger(string[23:24])  # uint8

    def __str__(self) -> str:
        return "Game Year: {}\nVersion: {}.{}\nPacket Version: {}\nPacket ID: {}\nSession UID: {}\nSession Time: {}".format(
            self.gameYear,
            self.gameMajorVersion,
            self.gameMinorVersion,
            self.packetVersion,
            self.packetId,
            self.sessionUID,
            self.sessionTime,
        )


class singleTelemetryData:
    def __init__(self, data) -> None:
        self.speed = toInteger(data[0:2])
        self.throttle = toFloat(data[2:6])
        self.steer = toFloat(data[6:10])
        self.brake = toFloat(data[10:14])
        self.gear = toInteger(data[15:16])
        self.rpm = toInteger(data[16:18])


class CarTelemetryData(Header):
    def __init__(self, string) -> None:
        super().__init__(string[:24])
        data = string[24:]
        self.carData = []
        for i in range(22):
            self.carData.append(singleTelemetryData(data[33 * i : 33 * (i + 1)]))

    def __str__(self) -> str:
        return "Speed: {}\nThrottle: {}\nSteer: {}\nBrake: {}\nGear: {}\nRPM: {}\n\n".format(
            self.carData[0].speed,
            self.carData[0].throttle,
            self.carData[0].steer,
            self.carData[0].brake,
            self.carData[0].gear,
            self.carData[0].rpm,
        )


class LapData:
    def __init__(self, string) -> None:
        self.lastLapTime = toInteger(string[0:4])
        self.currentLapTime = toInteger(string[4:8])
        self.sector1Time = toInteger(string[8:10])
        self.sector2Time = toInteger(string[10:12])
        self.lapDistance = toFloat(string[12:16])


class LapDataPacket(Header):
    def __init__(self, string) -> None:
        super().__init__(string[:24])
        data = string[24:]
        self.lapData = []
        for i in range(22):
            self.lapData.append(LapData(data[43 * i : 43 * (i + 1)]))
        self.timeTrialPBCar = toInteger(data[989:990])

    def __str__(self):
        return "Last Lap Time: {}\nCurrent Lap Time: {}\nS1: {}\nS2: {}\nLap Distance: {}\n\n".format(
            self.lapData[0].lastLapTime,
            self.lapData[0].currentLapTime,
            self.lapData[0].sector1Time,
            self.lapData[0].sector2Time,
            self.lapData[0].lapDistance,
        )


class PacketSessionHistoryData(Header):
    def __init__(self, string) -> None:
        super().__init__(string[:24])


class SessionPacket(Header):
    def __init__(self, string: str) -> None:
        super().__init__(string[:24])
        data = string[24:]

        self.weather = toInteger(data[0:1])
        self.trackTemp = toInteger(data[1:2])
        self.airTemp = toInteger(data[2:3])
        self.totalLaps = toInteger(data[3:4])
        self.trackLength = toInteger(data[4:6])
        self.sessionType = toInteger(data[6:7])

        self.trackId = toInteger(data[7:8])


if __name__ == "__main__":
    pass
    # time = datetime.datetime.fromtimestamp(struct.unpack("<f", string[14:18])[0])
    # today = datetime.date.today()
    # time = time.replace(year=today.year, day=today.day, month=today.month)

    # print(time.strftime("%Y-%m-%d %H:%M:%S"))
    # print(struct.unpack("<f", string[14:18]))
    # print(string[14:18])
    # print(Header(string))
