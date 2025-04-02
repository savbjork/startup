import React, { useState, useEffect } from 'react';
import './home.css';

const api_key = import.meta.env.VITE_REACT_APP_CALENDARIFIC_AUTH;

export function Home({ userName, token }) {
  const [availFriend, setAvailFriend] = useState([]);
  const [busyFriend, setBusyFriend] = useState([]);
  const [holiday, setHoliday] = useState('');

  useEffect(() => {
    updateFriends(userName); // Fetch friends initially
    const interval = setInterval(updateFriends(userName), 60000); // Refresh every minute
    return () => clearInterval(interval);
    
  }, [userName, token]);

  useEffect(() => {
    fetchHoliday();
    const interval = setInterval(() => fetchHoliday(), 86400000); // every day
    return () => clearInterval(interval);
  }, []);

  async function fetchHoliday() {
    console.log({api_key});
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate(); //TODO: change to today
    const year = today.getFullYear();
    const url = `https://calendarific.com/api/v2/holidays?&api_key=${api_key}&country=US&year=${year
    }&day=${day}&month=${month}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response status: " + response.status);
      const data = await response.json();

      console.log(url);
      console.log("Response status: " + data.status);
      console.log(data);

      if (data.response && data.response.holidays && data.response.holidays.length > 0) {
        setHoliday(data.response.holidays[0].name);
      } else {
        setHoliday('');
      }

    } catch (error) {
      console.error("Error updating friend statuses:", error);
    }
  }

  async function updateFriends(user) {
    try {
      const response = await fetch('/api/getFriendStatuses', {
        method: 'GET',
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

      setAvailFriend(avail);
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
        <br />
        {holiday.length > 0 && (
          <>
            <h4 className="text-center">Need a reason to call?</h4>
            <h4 className="text-center">It is {holiday}!</h4>
            <br />
          </>
        )}
        {holiday.length === 0 && (
          <>
            <h4 className="text-center">No holiday today, just call to say hi!</h4>
            <br />
          </>
        )}  
      </div>
    </main>
  );
}