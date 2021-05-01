import { Bomba } from '../models/bomba';
import * as activeChatters from '../helpers/activeChannelUsers.helper';

export const prenderBomba = (client, args, channel, tags, message, self) => {
	try {
		Bomba.findOne({ state: 'Inactive' }, (err, inactiveBomb) => {
			if (err || !inactiveBomb) throw new Error(err);
			activeChatters.getActiveUsers(channel)
				.then((viewers) => {
					if (!inactiveBomb) {
						client.say(channel, `@${tags.username} ya hay una bomba activa`)
						return;
					}

					viewers = viewers.filter((user) => user !== tags.username && user !== "nightbot" && user !== "sepicobot")
					const randomViewer = viewers[Math.floor(Math.random() * viewers.length)]
					inactiveBomb.state = 'Active'
					inactiveBomb.userSender = tags.username
					inactiveBomb.userReceiver = randomViewer
					inactiveBomb.save()

					//600000 miliseconds = 10 minutes
					const minutes = 12 * 10000
					let miliseconds = Math.floor(Math.random() * minutes)

					//we add 30k seconds to prevent the bot to explode the bomb before the first 30 seconds
					console.log(miliseconds / 1000)

					setTimeout(() => explodeBomb(client, channel), 1800000)
					setTimeout(() => checkInactive(randomViewer, client, channel, tags), 10000)

					client.say(channel, `@${tags.username} prendio una bomba y la recibio @${randomViewer}`)
				})

		});
	} catch (error) {
		console.log(error);
	}
}


function explodeBomb(client, channel) {
	console.log("EXPLODE BOMB")
	try {
		Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
			if (err || !activeBomb) throw new Error(err);
			activeBomb.state = 'Inactive'
			activeBomb.save()
			client.say(channel, `@${activeBomb.userReceiver} te exploto la bomba en todo el oso`)
		})
	} catch (error) {
		console.log(error);
	}
}

function checkInactive(user, client, channel, tags) {

	try {
		Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
			if (err || !activeBomb) throw new Error(err);
			if (activeBomb.userReceiver == user) {
				activeChatters.getRandomUser(channel, user)
					.then((user) => {
						passBombToUser(channel, client, user, tags, activeBomb, true)
					}
					)
			}
		})
	} catch (error) {
		console.log(error);
	}

}


export const pasarBomba = (client, args, channel, tags, message, self) => {
	try {
		if (args[0] && args[0].startsWith('@')) {
			//chequear logica de args: arriba ya estoy verificando por el arroba, porque aca abajo chequea de nuevo?
			args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
			let user = args[0].toLowerCase();
			Bomba.findOne({ state: 'Active' }, (err, activeBomb) => {
				if (err || !activeBomb) throw new Error(err);
				if (user === tags.username) return;
				activeChatters.getActiveUsers(channel)
					.then((viewers) => {
						if (viewers.includes(user) && user !== "nightbot" && user !== "sepicobot") {
							passBombToUser(channel, client, user, tags, activeBomb)
						} else {
							client.say(channel, `@${tags.username} bbbbbbboludx, el usuario @${user} no se encuentra en el chat o no existe. No seas pijerx y pasale la bomba a alguien que este en el chat`)
						}

					});
			})
		}
	} catch (error) {
		console.log(error);
	}
}

function passBombToUser(channel, client, user, tags, activeBomb, inactive = false) {
	activeBomb.userSender = activeBomb.userReceiver
	activeBomb.userReceiver = user
	activeBomb.save()

	if (inactive) {
		client.say(channel, `@${activeBomb.userSender} parece estar inactivo. La bomba pasa a @${user}! pasa la bomba antes de que te explote en el oso `)
	}
	else {
		client.say(channel, `@${activeBomb.userSender} Le paso la bomba a  @${user}. @${user} pasa la bomba antes de que te explote en el oso `)
	}

	const minutes = 10 * 1000
	let miliseconds = Math.floor(Math.random() * minutes)

	//we add 30k seconds to prevent the bot to explode the bomb before the first 30 seconds
	setTimeout(() => checkInactive(user, client, channel, tags), miliseconds)
}
