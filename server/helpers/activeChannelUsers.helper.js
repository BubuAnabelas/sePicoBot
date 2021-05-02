const fetch = require('node-fetch');

export const getActiveUsers = (channel) => {
  if (!channel) return;
  let url = `https://tmi.twitch.tv/group/user/${channel.substring(1)}/chatters`
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(({ chatters }) => resolve([...chatters.viewers, ...chatters.moderators, ...chatters.vips, ...chatters.broadcaster]))
      .catch((error) => reject(error));
  });
};


export function getRandomUser(channel, userMe) {
  return new Promise((resolve, reject) => {
    getActiveUsers(channel)
      .then(viewers => {
        const filteredViewers = viewers.filter((viewer) => viewer !== userMe && viewer !== "nightbot" && viewer !== "sepicobot");
        resolve(filteredViewers[Math.floor(Math.random() * filteredViewers.length)]);
      });
  });
}