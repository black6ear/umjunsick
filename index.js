const http = require('http');
const express = require('express');
const app = express();
var server = require('http').createServer(app);
app.get('/', (request, response) => {
	console.log(Date.now() + ' Ping Received');
	response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
setInterval(() => {
	http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



const path = require('path');
const fs = require('fs');
// Only import the Client class from Discord.js
const { Client } = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();

// Super fancy config loader/validator
const config = (() => {
	// Make sure the config file exists
	if (!fs.existsSync('config.json')) {
		// They must not have copied the config-example.json file yet,
		// so just exit
		console.error(
			'Please copy the config-example.json file and rename it to config.json, filling out all required fields.'
		);
		process.exit(1);
	}

	let json;
	try {
		// Parse the JSON file
		json = JSON.parse(fs.readFileSync('config.json').toString());
	} catch (error) {
		// Catch any parser errors or read errors and exit
		console.error(`Failed to load/parse the config.json file: ${error}`);
		process.exit(1);
	}


	return json;
})();

// Store the commands in a Map (slightly better than a raw object)
const commands = new Map();
// Create the client
const bot = new Client({ disableEveryone: true });
// Store the config and commands on the bot variable so as to make them
// easily accessible in commands and other files
bot.config = config;
bot.commands = commands;

// Read every file in ./commands and filter out the non-JS files
fs.readdirSync(path.resolve(__dirname, 'commands'))
	.filter(f => f.endsWith('.js'))
	.forEach(f => {
		// Attempt to load the file
		console.log(`Loading command ${f}`);
		try {
			// Require the raw file
			let command = require(`./commands/${f}`);
			// Validate that there's a run function and a valid help object
			if (typeof command.run !== 'function') {
				throw 'Command is missing a run function!';
			} else if (!command.help || !command.help.name) {
				throw 'Command is missing a valid help object!';
			}
			// Store the command in the map based on its name
			commands.set(command.help.name, command);
		} catch (error) {
			// Log any errors from the validator or from requiring the file
			console.error(`Failed to load command ${f}: ${error}`);
		}
	});




const { MyBot } = require("koreanbots")
const Bot = new MyBot("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1MDE3NzEzNzg1Nzc4OTk3MiIsImlhdCI6MTYwNzc4Mzc4MywiZXhwIjoxNjM5MzQxMzgzfQ.fS4yjAyLJxDX5ajQI7wQavYI2cf6TYJ1czlvLoUrmu_rojnzt20bf7H14iHwN8k4GbYgmVghZylclesR0e4SuPakGxO7nkJvuozXVLtkALk4e1bhUopoO2u-hFVwjjdSkw4g4ZKPVj7u4IHbuxbHFLQ6bqwWQUISGmwa927zXWw")

let update = count => Bot.update(count) 
    .then(res => console.log("서버 수를 정상적으로 업데이트하였습니다!\n반환된 정보:" + JSON.stringify(res)))
    .catch(console.error)

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag} (ID: ${bot.user.id})`);
	bot.user.setActivity(`$도움 | ${bot.guilds.cache.size}개의 서버`, {
    type: "PLAYING",
    url: "https://www.twitch.tv/wookwakgood"
  });
  update(bot.guilds.size) // 준비 상태를 시작할 때, 최초로 업데이트합니다.
  setInterval(() => update(bot.guilds.cache.size), 600000) // 10분마다 서버 수를 업데이트합니다.
});



bot.on('message', msg => {
	if (msg.content === '엄') {
		msg.channel.send('준\n식');
	}
});

bot.on('message', message => {
	if (message.author.bot || !message.guild) {
		return;
	}

	let { content } = message;

	if (!content.startsWith(config.prefix)) {
		return;
	}
	let split = content.substr(config.prefix.length).split(' ');
	let label = split[0];
	let args = split.slice(1);
	if (commands.get(label)) {
		commands.get(label).run(bot, message, args);
	}
});

config.token && bot.login(config.token).catch(console.error);
