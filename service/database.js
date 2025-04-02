const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function getAvailabilityNow(token) {
  return userCollection.findOne({ token: token }, { projection: { availNow: 1 } });
}

async function addAvailabilityNow(token, time) {
  return userCollection.updateOne({ token: token }, { $set: { availNow: time } });
}

async function addFriend(token, friend) {
  userCollection.updateOne({ token: token}, { $push: { friends: friend } });
  return userCollection.findOne({ token: token }, { projection: { friends: 1 } });
}

async function getFriends(token) {
  return userCollection.findOne({ token: token }, { projection: { friends: 1 } });
}

async function deleteFriend(token, friend) {
  return userCollection.updateOne({ token: token }, { $pull: { friends: friend } });
}

async function getAvailabilityWeekly(token) {
  return userCollection.findOne({ token: token }, { projection: { availWeekly: 1 } });
}

async function addAvailabilityWeekly(token, availability) {
  userCollection.updateOne({ token: token }, { $push: { availWeekly: availability } });
  return userCollection.findOne({ token: token }, { projection: { availWeekly: 1 } });

}

async function deleteAvailabilityWeekly(token, availability) {
  userCollection.updateOne({ token: token }, { $pull: { availWeekly: availability } });
  return userCollection.findOne({ token: token }, { projection: { availWeekly: 1 } });
}

async function getStatus(name) {
  // const availNow = await userCollection.findOne({ name: name }, { projection: { availNow: 1 } });
  // const now = new Date();
  // if (availNow && availNow > now) {
  //   return "AVAILABLE";
  // }
  const availWeekly = await userCollection.findOne({ name: name }, { projection: { availWeekly: 1 } });
  if (availWeekly) {
    for (const availability of availWeekly) {
      const start = new Date(availability.start);
      const end = new Date(availability.end);
      if (start <= now && now <= end) {
        return {status: "AVAILABLE"};
      }
    }
  }
  return {status: "BUSY"};
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  getAvailabilityNow,
  addAvailabilityNow,
  addFriend,
  getFriends,
  deleteFriend,
  getAvailabilityWeekly,
  addAvailabilityWeekly,
  deleteAvailabilityWeekly,
  getStatus,
};
