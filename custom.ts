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
}