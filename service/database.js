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
  userCollection.updateOne({ token: token }, { $pull: { friends: friend } });
  return userCollection.findOne({ token: token }, { projection: { friends: 1 } });
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
  //const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Denver" }));
  const now = new Date();
  // if (availNow && availNow > now) {
  //   return "AVAILABLE";
  // }
  const availWeekly = await userCollection.findOne({ email: name }, { projection: { availWeekly: 1 } });
  const today = now.toISOString().split('T')[0];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayOfWeek = daysOfWeek[now.getDay()]; // Get the current day of the week as a name
  if (availWeekly) {
    for (const availability of availWeekly.availWeekly) {
      if (availability.day === todayDayOfWeek) {
        const start = new Date(now);
        start.setHours(availability.start.split(':')[0], availability.start.split(':')[1], 0, 0);
        const end = new Date(now);
        end.setHours(availability.end.split(':')[0], availability.end.split(':')[1], 0, 0);
        //const end = new Date(`${today}T${availability.end}:00`);
        console.log(start);
        console.log(end);
        console.log(now);
        if (start <= now.getTime() && now.getTime() <= end) {
          return {status: "AVAILABLE"};
        }
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
