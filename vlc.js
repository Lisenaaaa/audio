const dbus = require('dbus-next')
const bus = dbus.sessionBus()
const args = process.argv
args.shift()
args.shift()
;(async () => {
	try {
		const vlc = await bus.getProxyObject('org.mpris.MediaPlayer2.vlc', '/org/mpris/MediaPlayer2')
		const player = vlc.getInterface('org.mpris.MediaPlayer2.Player')
		const properties = vlc.getInterface('org.freedesktop.DBus.Properties')

		const metadata = await properties.Get('org.mpris.MediaPlayer2.Player', 'Metadata')

		const currentPlaying = decodeURIComponent(
			metadata.value['xesam:url'].value.split('/')[metadata.value['xesam:url'].value.split('/').length - 1]
		)

		switch (args[0] ? args[0].toLowerCase() : undefined) {
			case 'playpause':
				await player.PlayPause()
				break
			case 'getcurrent':
				console.log(currentPlaying)
				break
			case 'previous':
				await player.Previous()
				break
			case 'next':
				await player.Next()
				break

			case undefined:
				console.log(vlc.name.split('.')[vlc.name.split('.').length - 1])
		}
		process.exit()
	} catch (err) {
		if (err.message === 'The name org.mpris.MediaPlayer2.vlc was not provided by any .service files') console.log('')
		process.exit()
	}
})()
