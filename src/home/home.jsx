import React from 'react';
import './home.css';

export function Home(userName) {
  const [friends, setFriends] = React.useState([]);
  const [availFriend, setAvailFriend] = React.useState([]);
  const [busyFriend, setBusyFriend] = React.useState([]);
  
  React.useEffect(() => {
    const friendsText = localStorage.getItem('friends');
    if (friendsText) {
      //console.log('setting friends');
      setFriends(JSON.parse(friendsText));
    }
  }
  , []);

  React.useEffect(() => {
    if (friends.length) {
      updateFriends();
    }
    const interval = setInterval(() => updateFriends(), 60000); //gets friend status every minute
    return () => clearInterval(interval);
  }, [friends]);

  function updateFriends() { //web socket temp
    const avail = [];
    const busy = [];
    if (friends.length) {
      //console.log('friends');
      for (const friend of friends) {
        const status = getFriendStatus(friend);
        //console.log(friend, status);
        if (status == 'available') {
          avail.push(
            <li className="list-group-item" key={friend}>{friend}</li>
          );
        } else {
          busy.push(
            <li className="list-group-item" key={friend}>{friend}</li>
          );
        }
      }
    } else {
      //console.log('no friends');
      avail.push(
        <li className="list-group-item">Add a friend!</li>
      );
    }
    setAvailFriend(avail);
    setBusyFriend(busy);
  }
  

  function getFriendStatus(friend) {
    // TODO: replace with database call
    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      return 'available';
    }
    else {
      return 'busy';
    }
  }

  return (
    <main className="status container-fluid p-0 text-light">
      <div className="container">
      <h2 className="text-center">WELCOME {userName.userName}</h2>
        {(availFriend.length > 0) && 
        <>
          <h4 className="text-center">Your friends are free to chat!</h4>
          <br/>
        </>}
        <div className="row bg-light p-2" style={{ "--bs-bg-opacity": ".5" }}>
          <div className="col-md-6 text-white p-3">
            <h2 className="text-success">Available</h2>
            <ul className="list-group list-group-horizontal flex-wrap">
              {availFriend}
            </ul>
          </div>
          <div className="col-md-6 text-white p-3">
            <h2 className="text-danger">Busy</h2>
            <ul className="list-group list-group-horizontal flex-wrap">
              {busyFriend}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}