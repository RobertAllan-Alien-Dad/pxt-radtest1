//% color=190 weight=100 icon="\uf1ec" block="MAXBOT" advanced=true
namespace DFrobotMAXBOT {
    let pingTotalDistance: number = 0
    let pingProductDistance: number = 1
    let pingAveDistance: number = 0
    let pingDistance: number = 0
    let pingDistanceImmediate: number = 0
    let mbi: number = 0
    let mbi2: number = 0
    let mbidiv2: number = 0
    let mbiInverse: number = 0
    let pingDistances: number[] = [0, 0]
    let pingDeltas: number[] = [0, 0]
    let pingMedianDelta: number = 0
    let pingExp: number = 0.3333
    let sortedArray: number[] = []
    let pingDirectionName: Array<string> = ["N", "NNE", "ENE", "E", "ESE", "SSE", "S", "SSW", "WSW", "W", "WNW", "NNW"]
    let pingDirectionClockDegrees = 30
    //% blockId=MAXBOT_go
    //% block="MAXBOT|go %v"
    export function go(v: string): void {
        if (v == "FORWARD") {
            //basic.showIcon(IconNames.Angry)
            pins.servoWritePin(AnalogPin.P8, 100)
            pins.servoWritePin(AnalogPin.P12, 100)
            basic.pause(200)
            pins.servoWritePin(AnalogPin.P8, 90)
            pins.servoWritePin(AnalogPin.P12, 90)
        } else {
            if (v == "BACK") {
                //basic.showIcon(IconNames.Surprised)
                pins.servoWritePin(AnalogPin.P8, 80)
                pins.servoWritePin(AnalogPin.P12,80)
                basic.pause(200)
                pins.servoWritePin(AnalogPin.P8, 90)
                pins.servoWritePin(AnalogPin.P12, 90)
            } else {
                if (v == "LEFT") {
                    //basic.showIcon(IconNames.Silly)
                    pins.servoWritePin(AnalogPin.P8, 85)
                    pins.servoWritePin(AnalogPin.P12, 95)
                    basic.pause(200)
                    pins.servoWritePin(AnalogPin.P8, 90)
                    pins.servoWritePin(AnalogPin.P12, 90)
                } else {
                    if (v == "RIGHT") {
                        //basic.showIcon(IconNames.Sword)
                        pins.servoWritePin(AnalogPin.P8, 95)
                        pins.servoWritePin(AnalogPin.P12,85)
                        basic.pause(200)
                        pins.servoWritePin(AnalogPin.P8, 90)
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
        let see: string = ""
        mbi = 0
        mbi2 = 0
        pingTotalDistance = 0
        pingProductDistance = 1
        while (((mbi2 < 80) && ((pingTotalDistance < 20000) || !((mbi == 0) || (mbi % 2 == 0))))) {
            pingDistanceImmediate = sonar.ping(
                DigitalPin.P1,
                DigitalPin.P2,
                PingUnit.Centimeters
            )
            if ((pingDistanceImmediate > 0) && (pingDistanceImmediate < 1000)) {
                pingDistances[mbi] = pingDistanceImmediate
                pingTotalDistance = pingTotalDistance + pingDistanceImmediate
                pingProductDistance = pingProductDistance * pingDistanceImmediate
                mbi = mbi + 1
            }
            mbi2 = mbi2 + 1
        }

        // get Median of set of distance readings
        sortedArray = pingDistances.sort()
        mbidiv2 = mbi / 2
        pingDistance = sortedArray[mbidiv2]
        pingAveDistance = pingDistance

        while (mbidiv2 > 0) {
            let pingAveDistToTheMBIpower: number = 1
            pingAveDistToTheMBIpower = pingAveDistance ** mbi
            if ((pingAveDistToTheMBIpower + pingAveDistance) >= (pingProductDistance)) {
                if ((pingAveDistToTheMBIpower - pingAveDistance) <= (pingProductDistance)) {
                    mbidiv2 = 0
                } else {
                    pingAveDistance = pingAveDistance - 1
                    mbidiv2 = mbidiv2 - 1
                }
            } else {
                pingAveDistance = pingAveDistance + 1
                mbidiv2 = mbidiv2 - 1
            }
        }

        pingAveDistance = Math.floor(pingAveDistance)

        if (pingAveDistance > 90) {
            see = see + "DISTANT"
        } else if (pingAveDistance > 40) {
            see = see + "MIDRANGE"
        } else {
            see = see + "CLOSE"
        }
        return see
    }

    //% blockid=MAXBOT_ping_distance
    //% block="MAXBOT|ping_distance"
    export function ping_distance(): number {
        ping()
        return pingAveDistance
    }

    //% blockid=MAXBOT_ping_debug
    //% block="MAXBOT|ping_debug"
    export function ping_debug(): string {
        ping()
        return "pingTotalDistance=" + pingTotalDistance + ";" + "pingDistance=" + pingDistance + ";" + "pingAveDistance=" + pingAveDistance + ";" + "mbiInverse=" + mbiInverse + ";" + "mbi=" + mbi + ";" + "mbi2=" + mbi2 + ";"
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