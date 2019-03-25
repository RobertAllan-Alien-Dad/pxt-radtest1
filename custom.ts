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
        let pingTotalDelta: number = 1
        let pingAveDelta: number = 0
        let pingTotalDistance: number = 0
        let pingAveDistance: number = 0
        let pingDistanceTminus1: number = 0
        let pingDistanceNow: number = 0
        let trend: number = 0
        let mbi: number = 0
        while (pingTotalDistance < 500) {
            // control.waitMicros(10)
            pingDistanceTminus1 = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingDistanceNow = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingTotalDelta = pingTotalDelta + (pingDistanceNow - pingDistanceTminus1)
            pingTotalDistance = pingTotalDistance + pingDistanceNow
            mbi = mbi + 1
        }
        pingAveDistance = pingTotalDistance / mbi
        if (Math.abs(pingTotalDelta) > (pingAveDistance / 10)) {
            if (pingTotalDelta > 0) {
                see = "FLEEING"
            } else if (pingTotalDelta < 0) {
                see = "APPROACHING"
            } else {
                see = "STANDING"
            }
        }
        if (pingAveDistance > 140) {
            see = see + " DISTANT"
        } else if (pingAveDistance > 50) {
            see = see + " MIDRANGE"
        } else {
            see = see + " CLOSE"
        }
        return see
    }    
    //% blockid=MAXBOT_ping_delta
    //% block="MAXBOT|ping_delta"
    export function ping_delta(): number {
        let see: string = "NOTHING"
        let pingTotalDelta: number = 1
        let pingAveDelta: number = 0
        let pingTotalDistance: number = 0
        let pingAveDistance: number = 0
        let pingDistanceTminus1: number = 0
        let pingDistanceNow: number = 0
        let trend: number = 0
        let mbi: number = 0
        while (pingTotalDistance < 500) {
            // control.waitMicros(10)
            pingDistanceTminus1 = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingDistanceNow = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingTotalDelta = pingTotalDelta + (pingDistanceNow - pingDistanceTminus1)
            pingTotalDistance = pingTotalDistance + pingDistanceNow
            mbi = mbi + 1
        }
        pingAveDistance = pingTotalDistance / mbi
        if (Math.abs(pingTotalDelta) > (pingAveDistance / 10)) {
            if (pingTotalDelta > 0) {
                see = "FLEEING"
            } else if (pingTotalDelta < 0) {
                see = "APPROACHING"
            } else {
                see = "STANDING"
            }
        }
        if (pingAveDistance > 140) {
            see = see + " DISTANT"
        } else if (pingAveDistance > 50) {
            see = see + " MIDRANGE"
        } else {
            see = see + " CLOSE"
        }
        return pingTotalDelta
    }    
    //% blockid=MAXBOT_ping_distance
    //% block="MAXBOT|ping_distance"
    export function ping_distance(): number {
        let see: string = "NOTHING"
        let pingTotalDelta: number = 1
        let pingAveDelta: number = 0
        let pingTotalDistance: number = 0
        let pingAveDistance: number = 0
        let pingDistanceTminus1: number = 0
        let pingDistanceNow: number = 0
        let trend: number = 0
        let mbi: number = 0
        while (pingTotalDistance < 500) {
            // control.waitMicros(10)
            pingDistanceTminus1 = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingDistanceNow = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            pingTotalDelta = pingTotalDelta + (pingDistanceNow - pingDistanceTminus1)
            pingTotalDistance = pingTotalDistance + pingDistanceNow
            mbi = mbi + 1
        }
        pingAveDistance = pingTotalDistance / mbi
        if (Math.abs(pingTotalDelta) > (pingAveDistance / 10)) {
            if (pingTotalDelta > 0) {
                see = "FLEEING"
            } else if (pingTotalDelta < 0) {
                see = "APPROACHING"
            } else {
                see = "STANDING"
            }
        }
        if (pingAveDistance > 140) {
            see = see + " DISTANT"
        } else if (pingAveDistance > 50) {
            see = see + " MIDRANGE"
        } else {
            see = see + " CLOSE"
        }
        return pingAveDistance
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