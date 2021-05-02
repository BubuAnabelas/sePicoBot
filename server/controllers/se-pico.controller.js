import { Match } from '../models/match';

export const like = (client, args, channel, tags, message, self) => {
  if (args[0]) {
    args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
    if (args[0] !== tags.username) {
      searchIfSomeoenLikedMe(client, channel, tags.username, args[0]);
    }
  }
};

function newMatch(who, likes) {
  let match = new Match({ who: who.toLowerCase(), likes: likes.toLowerCase() });
  match.save((err, match) => {
    if (err) throw new Error(e.message);
  });
}

function searchIfSomeoenLikedMyInstagram(client, channel, miInstagram, who) {
  return new Promise((resolve, reject) => {
    Match.findOne({ likes: miInstagram.who, who }, (err, match) => {
      if (err) {
        console.log(err);
      } else {
        if (match) {
          match.match = true;
          Iam.findOne({ who: match.who }, (err, whoInstagram) => {
            match.save();
            client.say(
              channel,
              `match entre @${match.who} ${
                whoInstagram && whoInstagram.instagram ? 'https://instagram.com/' + whoInstagram.instagram : ''
              } y @${miInstagram.who || ''} ${
                miInstagram && miInstagram.instagram ? 'https://instagram.com/' + miInstagram.instagram : ''
              }`
            );
            resolve(true);
          });
        } else {
          resolve(false);
        }
      }
    });
  });
}

function searchIfSomeoenLikedMe(client, channel, miUsername, likes, myInstagram) {
  let query = { likes: miUsername.toLowerCase(), who: likes.toLowerCase() };

  Match.findOne(query, (err, match) => {
    if (err) {
    } else {
      if (match) {
        match.match = true;
        match.save();
        client.say(channel, `match entre @${match.who} y @${miUsername}`);
      } else {
        Match.findOne(
          {
            who: miUsername.toLowerCase(),
            likes: likes.toLowerCase(),
            match: true
          },
          (err, match) => {
            if (match) {
              match.match = true;
              match.save();
              client.say(channel, `match entre @${match.who} y @${likes || ''}`);
            } else {
              newMatch(miUsername, likes);
            }
          }
        );
      }
    }
  });
}
