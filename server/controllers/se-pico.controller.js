import { Like } from '../models/like';

export const like = (client, args, channel, tags, message, self) => {
  if (args[0]) {
    args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
    if (args[0] !== tags.username) {
      userCanLike(client, channel, tags, args)
    }
  }
};


export const dislike = (client, args, channel, tags, message, self) => {
  if (args[0]) {
    args[0] = args[0].startsWith('@') ? args[0].substring(1) : args[0];
    if (args[0] !== tags.username) {
      dislikeSomeone(client, channel, tags.username, args[0]);
    }
  }
};

async function userCanLike(client, channel, tags, args) {
  let date = new Date();
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  let likesCount = await Like.countDocuments({ who: tags.username.toLowerCase(), created_at: { '$gte': firstDay, '$lte': lastDay } },
    (err, likeNumber) => {
      if (tags.subscriber) {
        if (likeNumber >= 15) {
          client.say(channel, `@${tags.username} tenes mas de 15 likes este mes!`);
          return false
        }
      }
      else {
        if (likeNumber >= 10) {
          client.say(channel, `@${tags.username} tenes mas de 10 likes este mes! Si te subeas tenes 5 likes mas!`);
          return false;
        }
      }
      searchIfSomeoneLikedMe(client, channel, tags.username, args[0]);
    });

}

function newLike(likeAuthor, likedPerson) {
  let like = new Like({ who: likeAuthor.toLowerCase(), likes: likedPerson.toLowerCase() });
  like.save((err, like) => {
    if (err) throw new Error(e.message);
  });
}

function dislikeSomeone(client, channel, dislikeAuthor, dislikedPerson) {
  let query = { likes: dislikeAuthor.toLowerCase(), who: dislikedPerson.toLowerCase() };
  let invertedQuery = { likes: dislikedPerson.toLowerCase(), who: dislikeAuthor.toLowerCase() }
  Like.findOneAndDelete(query,
    (err, like) => {
      client.say(channel, `@${dislikeAuthor}, dislikeó a @${dislikedPerson || ''} jujuj`);
    }
  );

  Like.findOneAndDelete(invertedQuery, (err, invertedLike) => { })
}

function searchIfSomeoneLikedMe(client, channel, likeAuthor, likedPerson) {
  let query = { who: likeAuthor.toLowerCase(), likes: likedPerson.toLowerCase() };
  Like.findOne(query, (err, like) => {
    if (like) {
      answerIfIsMatch(client, channel, likeAuthor, likedPerson)
    }
    else {
      newLike(likeAuthor, likedPerson);
      answerIfIsMatch(client, channel, likeAuthor, likedPerson)
    }
  });
}

function findInvertedLike(client, channel, likeAuthor, likedPerson) {
  let query = { who: likedPerson.toLowerCase(), likes: likeAuthor.toLowerCase() };
  Like.findOne(query, (err, like) => {
    if (like) {
      client.say(channel, `match @${likeAuthor} y @${likedPerson || ''}`);
    }
    else {
      return false;
    }
  });
}

function answerIfIsMatch(client, channel, likeAuthor, likedPerson) {
  findInvertedLike(client, channel, likeAuthor.toLowerCase(), likedPerson.toLowerCase())
}
