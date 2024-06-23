function motor (duty_percent: number) {
    iMotor = duty_percent
    motors.dualMotorPower(Motor.M0, duty_percent)
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    iServo += -5
    pins.servoWritePin(AnalogPin.C8, iServo)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    pins.digitalWritePin(DigitalPin.C9, 0)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    iServo += 5
    pins.servoWritePin(AnalogPin.C8, iServo)
})
function _ (Kommentar: string) {
    return [
    "calliope-net/controller-63",
    "C9 Relais schaltet 9V Akku an/aus",
    "C13 C15 Spursensor 9V Pegelwandler",
    "C8 Grove 5V Servo",
    "C12 Grove 5V Licht oder Buzzer",
    "C14 Encoder Eingang zählt Impulse"
    ]
}
pins.onPulsed(DigitalPin.C14, PulseValue.Low, function () {
    if (iMotor >= 0) {
        iEncoder += 1
    } else {
        iEncoder += -1
    }
})
let iEncoder = 0
let iMotor = 0
let iServo = 0
pins.digitalWritePin(DigitalPin.C9, 1)
basic.showNumber(2)
pins.setPull(DigitalPin.C14, PinPullMode.PullUp)
let o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
o4digit.set(6)
iServo = 90
pins.servoWritePin(AnalogPin.C8, iServo)
loops.everyInterval(500, function () {
    if (pins.digitalReadPin(DigitalPin.C13) == 0 && pins.digitalReadPin(DigitalPin.C15) == 0) {
        basic.setLedColors(0x000000, 0x000000, 0x000000)
        motor(50)
    } else if (pins.digitalReadPin(DigitalPin.C13) == 0 && pins.digitalReadPin(DigitalPin.C15) == 1) {
        basic.setLedColors(0x000000, 0x000000, 0x00ff00)
        motor(20)
    } else if (pins.digitalReadPin(DigitalPin.C13) == 1 && pins.digitalReadPin(DigitalPin.C15) == 0) {
        basic.setLedColors(0x000000, 0x00ff00, 0x000000)
        motor(-20)
    } else if (pins.digitalReadPin(DigitalPin.C13) == 1 && pins.digitalReadPin(DigitalPin.C15) == 1) {
        basic.setLedColors(0x000000, 0x00ff00, 0x00ff00)
        motor(0)
    }
    if (iEncoder >= 0) {
        o4digit.show(iEncoder)
        o4digit.point(false)
    } else {
        o4digit.show(Math.abs(iEncoder))
        o4digit.point(true)
    }
    if (input.lightLevel() < 50) {
        pins.digitalWritePin(DigitalPin.C12, 0)
    } else if (input.lightLevel() > 100) {
        pins.digitalWritePin(DigitalPin.C12, 1)
    }
})
