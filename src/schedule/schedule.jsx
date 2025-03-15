import React, { useState, useEffect } from 'react';
import './schedule.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsTrash3 } from "react-icons/bs";

export function Schedule() {
  const [status, setStatus] = useState('');
  const [avail, setAvail] = useState('');
  const [weeklyAvailList, setWeeklyAvailList] = useState([]);
  const [dayInput, setDayInput] = useState('');
  const [startTimeInput, setStartTimeInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');
  
  useEffect(() => {
    const savedAvailList = localStorage.getItem('weeklyAvailList');
    if (savedAvailList) {
      setWeeklyAvailList(JSON.parse(savedAvailList));
    }
    const savedAvail = localStorage.getItem('avail');
    if (savedAvail) {
      setAvail(new Date(savedAvail));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weeklyAvailList', JSON.stringify(weeklyAvailList));
    setStatus(getStatus());
  }, [weeklyAvailList]);

  useEffect(() => {
    localStorage.setItem('avail', avail);
    setStatus(getStatus());
  }, [avail]);

  function getStatus() {
    const now = new Date();
    if (avail && new Date(avail) > now) {
      return "AVAILABLE";
    }
    if (weeklyAvailList.some(item => item.day === now.toLocaleDateString('en-US', { weekday: 'long' }))) {
      return "AVAILABLE";
    }
    return "BUSY";
  }

  function addAvail() {
    const timeInput = document.getElementById('availUntil').value;
    if (!timeInput) return;
    const today = new Date();
    const time = new Date(today.toDateString() + ' ' + timeInput);
    setAvail(time);
  }

  function formatTime(time) {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }

  function addToWeeklyAvailList() {
    if (!dayInput || !startTimeInput || !endTimeInput) {
      alert('Please select a day and both start and end times');
      return;
    }
    if (endTimeInput <= startTimeInput) {
      alert('End time must be after start time');
      return;
    }
    const newAvail = { day: dayInput, start: formatTime(startTimeInput), end: formatTime(endTimeInput) };
    const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setWeeklyAvailList(prevList => [...prevList, newAvail].sort((a, b) => {
      return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day) || a.start.localeCompare(b.start);
    }));
    setDayInput('');
    setStartTimeInput('');
    setEndTimeInput('');
  }

  function removeFromWeeklyAvailList(index) {
    const updatedList = weeklyAvailList.filter((_, i) => i !== index);
    setWeeklyAvailList(updatedList);
  }

  return (
    <main>
      <div className="container">
        <div className="row text-center">
          <section>
            <div className="status">
              <h2>
                Your Status: 
                <span className="current-status"> {status}</span>
              </h2>
            </div>
            {status === 'BUSY' && (
              <div>
                <span>Available Now? Free Until:</span>
                <input type="time" id="availUntil" className="form-control d-inline w-auto mx-2" />
                <button type="submit" className="btn btn-dark" onClick={addAvail}>Save</button>
              </div>
            )}
          </section>
        </div>
        <br />
        <div className="row p-2">
          {weeklyAvailList.length > 0 && (
            <table className="table bg-light text-dark">
              <thead className="table-secondary">
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Start</th>
                  <th scope="col">End</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {[...weeklyAvailList].sort((a, b) => {
                  const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                  return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day) || a.start.localeCompare(b.start);
                }).map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.start}</td>
                    <td>{item.end}</td>
                    <td>
                      <BsTrash3 size="1rem" className="text-right" onClick={() => removeFromWeeklyAvailList(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="text-center d-flex align-items-center gap-1 flex-nowrap text-black">
            <select id="availDay" className="form-select w-auto" value={dayInput} onChange={(e) => setDayInput(e.target.value)}>
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <span>Start:</span>
            <input type="time" id="availStartTime" className="form-control w-auto" value={startTimeInput} onChange={(e) => setStartTimeInput(e.target.value)} />
            <span>End:</span>
            <input type="time" id="availEndTime" className="form-control w-auto" value={endTimeInput} onChange={(e) => setEndTimeInput(e.target.value)} />
            <button className="btn btn-dark" onClick={addToWeeklyAvailList}>Add</button>
          </div>
        </div>
        <br />
      </div>
    </main>
  );
}