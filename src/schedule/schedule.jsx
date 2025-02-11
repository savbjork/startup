import React from 'react';
import './schedule.css';

export function Schedule() {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-white text-center p-3">
            <section>
              <div className="status">
                <h2>
                  Your Status:
                <span className="current-status text-danger">Busy</span>
                </h2>
              </div>
              <div>
                <label htmlFor="change">Available Now? Free Until:</label>
                <input type="time" id="count" placeholder="Free until"/>
                <button type="submit" className="btn btn-dark">Save</button>
              </div>
            </section>
            <br/>
            <br/>
            <div>
              <table className="table bg-light text-dark">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Calendar Group</th>
                    <th scope="col">Available For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>School</td>
                    <td>
                      <fieldset>
                        <label htmlFor="checkbox1">Family</label>
                        <input type="checkbox" id="checkbox1" name="varCheckbox" value="checkbox1" defaultChecked />
                        <label htmlFor="checkbox2">BFF</label>
                        <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" />
                      </fieldset>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Work</td>
                    <td>
                      <fieldset>
                        <label htmlFor="checkbox1">Family</label>
                        <input type="checkbox" id="checkbox1" name="varCheckbox" value="checkbox1" defaultChecked />
                        <label htmlFor="checkbox2">BFF</label>
                        <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" />
                      </fieldset>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Personal</td>
                    <td>
                      <fieldset>
                        <label htmlFor="checkbox1">Family</label>
                        <input type="checkbox" id="checkbox1" name="varCheckbox" value="checkbox1" defaultChecked />
                        <label htmlFor="checkbox2">BFF</label>
                        <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" defaultChecked/>
                      </fieldset>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6
           p-3">
            <div>
              <img className="calendar" src="calendar.png" alt="calendar"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}