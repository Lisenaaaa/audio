const bus = require('dbus-next').sessionBus()
const args = process.argv
args.shift()
args.shift()
;(async () => {
	try {
		const spotify = await bus.getProxyObject('org.mpris.MediaPlayer2.spotify', '/org/mpris/MediaPlayer2')
		const player = spotify.getInterface('org.mpris.MediaPlayer2.Player')
		const properties = spotify.getInterface('org.freedesktop.DBus.Properties')

		const metadata = await properties.Get('org.mpris.MediaPlayer2.Player', 'Metadata')

		const currentPlaying = decodeURIComponent(
			metadata.value['xesam:title'].value.split('/')[metadata.value['xesam:title'].value.split('/').length - 1]
		)
		const artist = metadata.value['xesam:artist'].value[0]

		switch (args[0] ? args[0].toLowerCase() : undefined) {
			case 'playpause':
				await player.PlayPause()
				break
			case 'getcurrent':
				console.log(`${artist}: ${currentPlaying}`)
				break
			case 'previous':
				await player.Previous()
				break
			case 'next':
				await player.Next()
				break

			case undefined:
				console.log(spotify.name.split('.')[spotify.name.split('.').length - 1])
		}
		process.exit()
	} catch (err) {
		if (err.message === 'The name org.mpris.MediaPlayer2.spotify was not provided by any .service files') console.log('')
		else (console.error(err))
        process.exit()
	}
})()
