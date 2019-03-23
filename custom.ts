//% color=190 weight=100 icon="\uf1ec" block="MAXBOT" advanced=true
namespace DFrobotMAXBOT {
    let pingDistancesTminus1: Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] 
    let pingDistancesNow: Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] 
    let pingDirectionName: Array<string> = ["N", "NNE", "ENE", "E", "ESE", "SSE", "S", "SSW", "WSW", "W", "WNW", "NNW"]
    let pingDirectionClockDegrees = 30
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
    //% blockid=MAXBOT_ping
    //% block="MAXBOT|ping"
    export function ping(): string {
        let see: string = "NOTHING"
        let pingDistanceTminus1: number = 0
        let directionNow: number = facing_num()
        let pingDistanceNow = 0
        let trend: number = 0
        let oldPingDistance: number = undefined
        let mbi: number = 0
        while (mbi < 5) {
            control.waitMicros(100)
            pingDistanceNow = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingDistanceTminus1 = pingDistancesTminus1[directionNow]
            pingDistancesTminus1[directionNow] = pingDistancesNow[directionNow]
            pingDistancesNow[directionNow] = pingDistanceNow
            if (pingDistanceTminus1 > pingDistanceNow) {
                trend = trend - 1;
            } else if (pingDistanceTminus1 < pingDistanceNow) {
               trend = trend + 1;
            }
            mbi = mbi + 1
        }
        if (trend > 0) {
            see = "APPROACHING"
        } else if (trend < 0) {
            see = "FLEEING"
        } else {
            see = "STANDING"
        }
        if (pingDistanceNow > 140) {
            see = see + " DISTANT"
        } else if (pingDistanceNow > 23) {
            see = see + " MIDRANGE"
        } else {
            see = see + " CLOSE"
        }
        return see
    }
    //% blockid=MAXBOT_ping_dist
    //% block="MAXBOT|ping_dist"
    export function ping_dist(): number {
        let see: string = "NOTHING"
        let pingDistanceTminus1: number = 0
        let directionNow: number = facing_num()
        let pingDistanceNow = 0
        let trend: number = 0
        let oldPingDistance: number = undefined
        let mbi: number = 0
        while (mbi < 5) {
            control.waitMicros(100)
            pingDistanceNow = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingDistanceTminus1 = pingDistancesTminus1[directionNow]
            pingDistancesTminus1[directionNow] = pingDistancesNow[directionNow]
            pingDistancesNow[directionNow] = pingDistanceNow
            if (pingDistanceTminus1 > pingDistanceNow) {
                trend = trend - 1;
            } else if (pingDistanceTminus1 < pingDistanceNow) {
                trend = trend + 1;
            }
            mbi = mbi + 1
        }
        return pingDistanceNow
    }
    //% blockid=MAXBOT_ping_trend
    //% block="MAXBOT|ping_trend"
    export function ping_trend(): number {
        let see: string = "NOTHING"
        let pingDistanceTminus1: number = 0
        let directionNow: number = facing_num()
        let pingDistanceNow = 0
        let trend: number = 0
        let oldPingDistance: number = undefined
        let mbi: number = 0
        while (mbi < 5) {
            control.waitMicros(100)
            pingDistanceNow = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingDistanceTminus1 = pingDistancesTminus1[directionNow]
            pingDistancesTminus1[directionNow] = pingDistancesNow[directionNow]
            pingDistancesNow[directionNow] = pingDistanceNow
            if (pingDistanceTminus1 > pingDistanceNow) {
                trend = trend - 1;
            } else if (pingDistanceTminus1 < pingDistanceNow) {
                trend = trend + 1;
            }
            mbi = mbi + 1
        }
        return trend
    }
    //% blockid=MAXBOT_facing
    //% block="MAXBOT|facing "
    export function facing(): string {
        let directionNow = facing_num()
        return pingDirectionName[directionNow]
    }
    //% blockid=MAXBOT_facing_num
    //% block="MAXBOT|facing_num "
    export function facing_num(): number {
        let foundDirection = 0
        let directionFinderIndex = 0
        let directionNow = 0
        let compassHeadingNow = 0
        let directionClockDegrees = 0
        let directionClockNumber: number[] = []
        let directionName: string[] = []
        compassHeadingNow = input.compassHeading()
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
        return directionNow
    }
    //% blockid=MAXBOT_pings
    //% block="MAXBOT|pings %v"
    export function pings(v: string): boolean {
        if (ping() == v) {
            return true
        } else {
            return false
        }
    }
}