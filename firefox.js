#!/usr/bin/env node

const bus = require('dbus-next').sessionBus()
const args = process.argv

async function getFirefoxName() {
	let obj = await bus.getProxyObject('org.freedesktop.DBus', '/org/freedesktop/DBus')
	let iface = obj.getInterface('org.freedesktop.DBus')
	let names = await iface.ListNames()
	let result = names.filter((n) => n.startsWith('org.mpris.MediaPlayer2.firefox'))

	return result[0]
}

;(async () => {
	try {
		const firefox = await bus.getProxyObject(await getFirefoxName(), '/org/mpris/MediaPlayer2')
		const player = firefox.getInterface('org.mpris.MediaPlayer2.Player')
		const properties = firefox.getInterface('org.freedesktop.DBus.Properties')

		const metadata = await properties.Get('org.mpris.MediaPlayer2.Player', 'Metadata')

		const youtubeTitle = metadata.value['xesam:title'].value

		switch (args[0] ? args[0].toLowerCase() : undefined) {
			case 'playpause':
				await player.PlayPause()
				break
			case 'getcurrent':
				console.log(youtubeTitle)
				break
			case 'previous':
				await player.Previous()
				break
			case 'next':
				await player.Next()
				break

			case undefined:
				console.log(properties.getAll())
		}
		process.exit()
	} catch (err) {
		if (err.message === 'Invalid bus name: undefined') console.log('')
		else console.error(err)
		process.exit()
	}
})()

class functions {
	async main() {}

	async youtube(action) {}
}

;(async () => {
	const args = process.argv
	args.shift()
	args.shift()

	
})()
