const tmi = require('tmi.js');
fs = require('node:fs');

const users = [ '' ]

const client = new tmi.Client({
	channels: users
});

client.connect();

client.on('message', (channel, tags, message) => {
	var digits = Math.floor(Math.random() * 90000000) + 10000000;
	var d = new Date();
	var s = d.getSeconds();
	var m = d.getMinutes();
	var h = d.getHours();
	
	const filename = `T-${h + "-" + m + "-" + s} ID-${digits}.txt`;
	const filecontent= `${tags['display-name']}: ${message}`;
	const channell = channel.replace('#', '');


	var logs = `./logs/${channell}/${tags['display-name']}`;
	
	if (!fs.existsSync(logs)){
		fs.mkdirSync(logs, { recursive: true });
	}

	fs.writeFile(`./logs/${channell}/${tags['display-name']}/${filename}`, `${filecontent}`, function (err) {
		if (err){
			return console.log(err);
		} 
		console.log(`\x1b[94m${channell}\x1b[0m: ${filename} \x1b[92mSaved\x1b[0m`);
	  });
});
