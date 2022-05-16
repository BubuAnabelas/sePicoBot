const normalizeUser = (user) => (user.startsWith('@') ? user.substring(1) : user).toLowerCase();
const isMod = (tags) => tags.mod;
const isStreamer = (tags) => tags.badges.broadcaster === '1';
const userInViewersList = (user, viewersLists) => viewers.find(v => normalizeUser(v) === normalizeUser(user)) !== undefined

export {
	normalizeUser,
	isMod,
	isStreamer,
	userInViewersList
}