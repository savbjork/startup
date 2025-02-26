import React from 'react';
import './schedule.css';

export function Schedule() {
  const [status, setStatus] = React.useState('');
  const [avail, setAvail] = React.useState('');
  

  React.useEffect(() => {
    console.log('useEffect');
    setStatus(getStatus());
  }, [avail]);

  function getStatus() {
    //console.log(status);
    if (avail){
      //console.log('avail:', new Date(avail));
      //console.log(new Date());
      if (new Date(avail) > new Date()){
        return "AVAILABLE";
      }
    }
    return "BUSY"; // This will be replaced with a 3rd party service call
  }

  function addAvail() {
    const timeInput = document.getElementById('availUntil').value;
    const today = new Date();
    const time = new Date(today.toDateString() + ' ' + timeInput);
    //console.log(time);
    if (time){
      console.log('setting avail');
      setAvail(time);
    }
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
            { status == 'BUSY' &&
            <div>
              <label htmlFor="change">Available Now? Free Until:</label>
              <input type="time" id="availUntil" placeholder="Free until"/>
              <button type="submit" className="btn btn-dark" onClick={()=> addAvail()}>Save</button>
            </div>}
          </section>
          </div>
            <br/>
          <br/>
          <div className="text-center">
            <img className="calendar" src="calendar2.png" alt="calendar"/>
          </div>
      </div>
    </main>
  );
}