import React from 'react';
import './schedule.css';

export function Schedule() {
  return (
    <main>
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-white text-center p-3">
            <section>
              <div class="status">
                <h2>
                  Your Status:
                <span class="current-status text-danger">Busy</span>
                </h2>
              </div>
              <div>
                <label for="change">Available Now? Free Until:</label>
                <input type="time" id="count" placeholder="Free until"/>
                <button type="submit" class="btn btn-dark">Save</button>
              </div>
            </section>
            <br/>
            <br/>
            <div>
              <table class="table bg-light text-dark">
                <thead class="table-secondary">
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
                        <label for="checkbox1">Family</label>
                        <input type="checkbox" id="checkbox1" name="varCheckbox" value="checkbox1" checked />
                        <label for="checkbox2">BFF</label>
                        <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" />
                      </fieldset>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Work</td>
                    <td>
                      <fieldset>
                        <label for="checkbox1">Family</label>
                        <input type="checkbox" id="checkbox1" name="varCheckbox" value="checkbox1" checked />
                        <label for="checkbox2">BFF</label>
                        <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" />
                      </fieldset>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Personal</td>
                    <td>
                      <fieldset>
                        <label for="checkbox1">Family</label>
                        <input type="checkbox" id="checkbox1" name="varCheckbox" value="checkbox1" checked />
                        <label for="checkbox2">BFF</label>
                        <input type="checkbox" id="checkbox2" name="varCheckbox" value="checkbox2" checked/>
                      </fieldset>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-6
           p-3">
            <div>
              <img class="calendar" src="calendar.png" alt="calendar"/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}