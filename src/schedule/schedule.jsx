import React, { useState, useEffect } from 'react';
import './schedule.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsTrash3 } from "react-icons/bs";

export function Schedule() {
  const [status, setStatus] = useState('BUSY');
  const [availNow, setAvail] = useState('');
  const [weeklyAvailList, setWeeklyAvailList] = useState([]);
  const [dayInput, setDayInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');

  useEffect(() => {
    fetchAvailabilityNow();
    fetchAvailabilityWeekly();
  }, []);

  useEffect(() => {
    setStatus(getStatus());
  }, [availNow, weeklyAvailList]);

  async function fetchAvailabilityNow() {
    try {
      const response = await fetch('/api/getAvailabilityNow', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAvail(data.availableUntil || '');
    } catch (error) {
      console.error("Error fetching current availability:", error);
    }
  }

  async function fetchAvailabilityWeekly() {
    try {
      const response = await fetch('/api/getAvailabilityWeekly', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setWeeklyAvailList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching weekly availability:", error);
    }
  }

  function getStatus() {
    const now = new Date();
    const availableUntil = availNow ? new Date(availNow) : null;
    
    if (availableUntil && availableUntil > now) {
      return "AVAILABLE";
    }
  
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes for comparison
  
    const isAvailableNow = weeklyAvailList.some(item => {
      if (item.day !== currentDay) return false;
  
      const [startHour, startMinute] = item.start.split(":").map(Number);
      const [endHour, endMinute] = item.end.split(":").map(Number);
  
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
  
      return currentTime >= startTotalMinutes && currentTime <= endTotalMinutes;
    });
  
    return isAvailableNow ? "AVAILABLE" : "BUSY";
  }

  async function setAvailabilityNow() {
    const timeInput = document.getElementById('availUntil').value;
    if (!timeInput) return;
  
    try {
      await fetch('/api/setAvailabilityNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ availableUntil: timeInput }),
      });
  
      setAvail(timeInput); // ✅ Update availability state
    } catch (error) {
      console.error("Error setting current availability:", error);
    }
  }

  async function addToWeeklyAvailList() {
    if (!dayInput || !startTimeInput || !endTimeInput) return;

    try {
      const response = await fetch('/api/addAvailabilityWeekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ day: dayInput, start: startTimeInput, end: endTimeInput }),
      });
      if (!response.ok) {
        throw new Error("Failed to add weekly availability");
      }
      const updatedAvailability = await response.json();
      setWeeklyAvailList(updatedAvailability);
      setDayInput('');
      setStartTimeInput('');
      setEndTimeInput('');
    } catch (error) {
      console.error("Error adding weekly availability:", error);
    }
  }

  async function deleteAvailability(day, start, end) {
    try {
      const response = await fetch(`/api/deleteAvailabilityWeekly/${day}/${start}/${end}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error("Failed to delete weekly availability");
      }
      const updatedAvailability = await response.json();
      setWeeklyAvailList(updatedAvailability);
    } catch (error) {
      console.error("Error deleting weekly availability:", error);
    }
  }

  return (
    <main>
      <div className="container">
        <div className="row text-center">
          <h2>Your Status: <span className="current-status"> {status}</span></h2>
          {/* {status === 'BUSY' && (
            <div>
              <label>Available Now? Free Until:</label>
              <input type="time" id="availUntil" className="form-control d-inline w-auto mx-2" onChange={(e) => setAvail(e.target.value)} />
              <button className="btn btn-dark" onClick={setAvailabilityNow}>Save</button>
            </div>
          )} */}
        </div>
        <br />
        <div className="row p-2">
          {weeklyAvailList.length > 0 ? (
            <table className="table bg-light text-dark">
              <thead className="table-secondary">
                <tr>
                  <th>Day</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {weeklyAvailList.map((slot, index) => (
                  <tr key={index}>
                    <td>{slot.day}</td>
                    <td>{slot.start}</td>
                    <td>{slot.end}</td>
                    <td>
                      <BsTrash3 size="1rem" className="text-right" onClick={() => deleteAvailability(slot.day, slot.start, slot.end)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-light">No weekly availability slots found.</p>
          )}
          <div className="text-center text-dark d-flex align-items-center gap-1 flex-wrap justify-content-center">
            <select className="form-select w-auto" value={dayInput} onChange={(e) => setDayInput(e.target.value)}>
              <option value="">Select a day</option>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => <option key={day} value={day}>{day}</option>)}
            </select>
            <input type="time" className="form-control w-auto" value={startTimeInput} onChange={(e) => setStartTimeInput(e.target.value)} />
            <span>to</span>
            <input type="time" className="form-control w-auto" value={endTimeInput} onChange={(e) => setEndTimeInput(e.target.value)} />
            <button className="btn btn-dark" onClick={addToWeeklyAvailList}>Add</button>
          </div>
        </div>
        <br />
      </div>
    </main>
  );
}
