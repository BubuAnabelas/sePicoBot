import { Match } from '../models/match';

export const like = (client, args, channel, tags, message, self) => {
  if (args[0]) {
    args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
    searchIfSomeoenLikedMe(client, channel, tags.username, args[0]);
  }
}

function newMatch(who, likes) {
  let match = new Match({ who: who.toLowerCase(), likes: likes.toLowerCase() });
  match.save((err, match) => {
    if (err) throw new Error(e.message);

    //console.log('guardado');
  });
}

function searchIfSomeoenLikedMyInstagram(client, channel, miInstagram, who) {
  return new Promise((resolve, reject) => {
    Match.findOne({ likes: miInstagram.who, who }, (err, match) => {
      if (err) {
        console.log(err);
      } else {
        if (match) {
          //console.log('1',match)
          match.match = true;
          Iam.findOne({ who: match.who }, (err, whoInstagram) => {
            match.save();
            client.say(
              channel,
              `match entre @${match.who} ${whoInstagram && whoInstagram.instagram
                ? 'https://instagram.com/' + whoInstagram.instagram
                : ''
              } y @${miInstagram.who || ''} ${miInstagram && miInstagram.instagram
                ? 'https://instagram.com/' + miInstagram.instagram
                : ''
              }`
            );
            resolve(true);
          });
        } else {
          //newMatch(tags.username, args[1], undefined ,args[0]);
          resolve(false);
        }
      }
    });
  });
}

function searchIfSomeoenLikedMe(client, channel, miUsername, likes, myInstagram) {
  /* let query = myInstagram ? { likes: { $in:[miUsername.toLowerCase(), myInstagram.instagram.toLowerCase()]}, who: likes} : { likes: miUsername.toLowerCase(), who: likes}; */
  let query = { likes: miUsername.toLowerCase(), who: likes.toLowerCase() };

  Match.findOne(query, (err, match) => {
    if (err) {
      //console.log(err);
    } else {
      if (match) {
        //console.log('2',match,miUsername,likes)
        match.match = true;
        match.save();
        client.say(channel, `match entre @${match.who} y @${miUsername}`);
        /* Iam.findOne({who: match.who}, (err, whoInstagram) => {
                    //console.log('1'+whoInstagram);
                    client.say(channel, `match entre @${match.who} ${whoInstagram ? "https://instagram.com/"+whoInstagram.instagram: ''} y @${miUsername || ''} ${myInstagram && myInstagram.instagram ? "https://instagram.com/"+myInstagram.instagram: ''}`)
                }); */
      } else {
        //console.log(miUsername, likes);
        Match.findOne(
          {
            who: miUsername.toLowerCase(),
            likes: likes.toLowerCase(),
            match: true,
          },
          (err, match) => {
            if (match) {
              match.match = true;
              match.save();
              client.say(
                channel,
                `match entre @${match.who} y @${likes || ''}`
              );
              //console.log('3',match,miUsername,likes)
              /* Iam.findOne({who: match.who}, (err, whoInstagram) => {
                            //console.log('2'+whoInstagram);
                            Iam.findOne({ who: likes.toLowerCase()}, (err, insta) => {
                                //console.log('3'+whoInstagram);
                                client.say(channel, `match entre @${match.who} ${whoInstagram ? "https://instagram.com/"+whoInstagram.instagram: ''} y @${likes || ''} ${insta && insta.instagram ? "https://instagram.com/"+insta.instagram: ''}`)
                            })
                        }); */
            } else {
              newMatch(miUsername, likes);
            }
          }
        );
      }
    }
  });
}