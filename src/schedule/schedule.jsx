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
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes for easy comparison
  
    if (avail && new Date(avail) > now) {
      return "AVAILABLE";
    }
  
    const isAvailableNow = weeklyAvailList.some(item => {
      if (item.day !== currentDay) return false;
  
      // Convert stored time format (e.g., "9:00 AM") to minutes
      const startParts = item.start.split(/[: ]/);
      const endParts = item.end.split(/[: ]/);
      
      let startHour = parseInt(startParts[0], 10);
      let endHour = parseInt(endParts[0], 10);
      const startMinutes = parseInt(startParts[1], 10);
      const endMinutes = parseInt(endParts[1], 10);
  
      if (startParts[2] === "PM" && startHour !== 12) startHour += 12;
      if (endParts[2] === "PM" && endHour !== 12) endHour += 12;
      if (startParts[2] === "AM" && startHour === 12) startHour = 0;
      if (endParts[2] === "AM" && endHour === 12) endHour = 0;
  
      const startTotalMinutes = startHour * 60 + startMinutes;
      const endTotalMinutes = endHour * 60 + endMinutes;
  
      return currentTime >= startTotalMinutes && currentTime <= endTotalMinutes;
    });
  
    return isAvailableNow ? "AVAILABLE" : "BUSY";
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

  function convertTo24Hour(time) {
    const [hourMinute, period] = time.split(" ");
    let [hour, minute] = hourMinute.split(":").map(Number);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute; // Convert time to total minutes for easy comparison
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
      const dayDiff = daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return convertTo24Hour(a.start) - convertTo24Hour(b.start);
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
                  const dayDiff = daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
                  if (dayDiff !== 0) return dayDiff;
                  return convertTo24Hour(a.start) - convertTo24Hour(b.start);
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
          <div className="row justify-content-center p-2">
          <div className="col-auto">
            <div className="text-center text-dark d-flex align-items-center gap-1 flex-nowrap justify-content-center">
              <select id="availDay" className="form-select w-auto" value={dayInput} onChange={(e) => setDayInput(e.target.value)}>
                <option value="">Weekly Available</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <input type="time" id="availStartTime" className="form-control w-auto" value={startTimeInput} onChange={(e) => setStartTimeInput(e.target.value)} />
              <span>to</span>
              <input type="time" id="availEndTime" className="form-control w-auto" value={endTimeInput} onChange={(e) => setEndTimeInput(e.target.value)} />
              <button className="btn btn-dark" onClick={addToWeeklyAvailList}>Add</button>
            </div>
          </div>
        </div>
        </div>
        <br />
      </div>
    </main>
  );
}
