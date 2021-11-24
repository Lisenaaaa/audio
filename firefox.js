#!/usr/bin/env node

const bus = require('dbus-next').sessionBus()
const args = process.argv
args.shift()
args.shift()
;(async () => {
	try {
		const firefox = await bus.getProxyObject('org.mpris.MediaPlayer2.firefox', '/org/mpris/MediaPlayer2/firefox')

        console.log(firefox)
		process.exit()
	} catch (err) {
		// if (err.message === 'The name org.mpris.MediaPlayer2.firefox was not provided by any .service files') console.log('')
		// else (console.error(err))
        console.error(err)
        process.exit()
	}
})()
