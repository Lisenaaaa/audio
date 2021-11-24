const dbus = require('dbus-next')
const bus = dbus.sessionBus()
const args = process.argv
args.shift()
args.shift()


;(async () => {
    const vlc = await bus.getProxyObject('org.mpris.MediaPlayer2.vlc', '/org/mpris/MediaPlayer2')
    const player = vlc.getInterface('org.mpris.MediaPlayer2.Player')

    console.log(player)
    process.exit()
})()