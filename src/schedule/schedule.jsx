import React from 'react';
import './schedule.css';

export function Schedule() {
  const [status, setStatus] = React.useState('');
  const [avail, setAvail] = React.useState('');
  

  React.useEffect(() => {
    setStatus(getStatus().status);
  }, [avail]);

  function getStatus() {
    if (avail){
      //const currentDate = new Date();
      if (new Date(avail) > new Date()){
        return { status : "AVAILABLE" };
      }
    }
    // This will be replaced with a 3rd party service call
    return { status : "BUSY" };
  }

  function addAvail() {
    const avail = document.getElementById('availUntil').value;
    console.log(avail);
    if (avail){
      setAvail(avail);
      setStatus("AVAILABLE");
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
            { status === 'BUSY' &&
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
        {/* </div>
      </div> */}
    </main>
  );
}