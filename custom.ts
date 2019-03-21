//% color=190 weight=100 icon="\uf1ec" block="MAXBOT" advanced=true
namespace DFrobotMAXBOT {
    //% blockId=MAXBOT_go
    //% block="MAXBOT|go %v"
    export function go(v: string): void {
        if (v == "FORWARD") {
            basic.showIcon(IconNames.Angry)
            pins.servoWritePin(AnalogPin.P8, 180)
            pins.servoWritePin(AnalogPin.P12, 180)
        } else {
            if (v == "BACK") {
                basic.showIcon(IconNames.Surprised)
                pins.servoWritePin(AnalogPin.P8, 0)
                pins.servoWritePin(AnalogPin.P12, 0)
            } else {
                if (v == "LEFT") {
                    basic.showIcon(IconNames.Silly)
                    pins.servoWritePin(AnalogPin.P8, 90)
                    pins.servoWritePin(AnalogPin.P12, 180)
                } else {
                    if (v == "RIGHT") {
                        basic.showIcon(IconNames.Sword)
                        pins.servoWritePin(AnalogPin.P8, 180)
                        pins.servoWritePin(AnalogPin.P12, 90)
                    } else {

                    }
                }
            }
        }
    }
    //% blockid=MAXBOT_see
    //% block="MAXBOT|see"
    export function see(): string {
        let see: string = "NOTHING"
        let pingDistancesNow: number[] = []
        let foundDirection = 0
        let PingDistancesTminus1: number[] = []
        let pingDistanceTminus1 = 0
        let directionFinderIndex = 0
        let directionNow = 0
        let pingDistanceNow = 0
        let compassHeadingNow = 0
        let pingDirectionClockDegrees = 0
        let pingDirectionClockNumber: number[] = []
        let pingDirectionName: string[] = []
        pingDirectionName = ["NNE", "ENE", "E", "ESE", "SSE", "S", "SSW", "WSW", "W", "WNW", "NNW", "N"]
        pingDirectionClockNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        pingDirectionClockDegrees = 30
        let mbi: number = 0
        while (mbi < 3) {
            control.waitMicros(100)
            compassHeadingNow = input.compassHeading()
            pingDistanceNow = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            directionNow = 13
            directionFinderIndex = 0
            while (directionNow > 12) {
                if (compassHeadingNow < pingDirectionClockDegrees / 2 + pingDirectionClockDegrees * directionFinderIndex) {
                    directionNow = directionFinderIndex
                    if (directionFinderIndex > 11) {
                        directionNow = 0
                    }
                    foundDirection = 1
                } else {
                    directionFinderIndex += 1
                }
            }
            pingDistanceTminus1 = PingDistancesTminus1[directionNow]
            PingDistancesTminus1[directionNow] = pingDistancesNow[directionNow]
            pingDistancesNow[directionNow] = pingDistanceNow
            if (pingDistanceTminus1 > pingDistanceNow) {
                see = "APPROACHING"
            }
            mbi = mbi + 1
        }
        return see
    }
    //% blockid=MAXBOT_see
    //% block="MAXBOT|see %v"
    export function sees( v: string ): boolean {
        if (see() == v) {
            return true
        } else {
            return false
        }
    }
}