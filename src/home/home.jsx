import React, { useState, useEffect } from 'react';
import './home.css';

export function Home({ userName, token }) {
  const [availFriend, setAvailFriend] = useState([]);
  const [busyFriend, setBusyFriend] = useState([]);

  useEffect(() => {
    updateFriends(userName); // Fetch friends initially
    const interval = setInterval(updateFriends(userName), 60000); // Refresh every minute
    return () => clearInterval(interval);
    
  }, [userName, token]);

  async function updateFriends(user) {
    try {
      const response = await fetch('/api/getFriendStatuses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Securely send the token
        credentials: 'include',
        body: JSON.stringify({user:user}),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch friend statuses");
      }

      const data = await response.json();

      const avail = data.available.map(friend => (
        <li className="list-group-item" key={friend}>{friend}</li>
      ));
      const busy = data.busy.map(friend => (
        <li className="list-group-item" key={friend}>{friend}</li>
      ));

      setAvailFriend(avail.length > 0 ? avail : [<li className="list-group-item" key="none">No friends available</li>]);
      setBusyFriend(busy);
    } catch (error) {
      console.error("Error updating friend statuses:", error);
    }
  }

  return (
    <main className="status container-fluid p-0 text-light">
      <div className="container">
        <h2 className="text-center">WELCOME {userName}</h2>
        {availFriend.length > 0 && (
          <>
            <h4 className="text-center">Your friends are free to chat!</h4>
            <br />
          </>
        )}
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