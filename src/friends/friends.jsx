import React from 'react';
import './friends.css';


export function Friends() {
  return (
    <main>
      <div className="container">
        <div className="row">
             <h2 className="text-light">Friends & Groups</h2>
            <section>
              <table className="table bg-light text-dark">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Group</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Adge</td>
                    <td>
                      <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn">
                        <input type="radio" name="group1" id="group1_family" autoComplete="off" defaultChecked /> Family
                      </label>
                      <label className="btn">
                        <input type="radio" name="group1" id="group1_BFF" autoComplete="off"/> BFF
                      </label>
                      </div>
                    </td>
                    <td>Busy</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jocey</td>
                    <td>
                      <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn">
                        <input type="radio" name="group2" id="jocey_family" autoComplete="off" defaultChecked/> Family
                      </label>
                      <label className="btn">
                        <input type="radio" name="group2" id="jocey_BFF" autoComplete="off"/> BFF
                      </label>
                      </div>
                    </td>
                    <td>Busy</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Sawyer</td>
                    <td>
                      <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn">
                        <input type="radio" name="group3" id="sawyer_family" autoComplete="off"/> Family
                      </label>
                      <label className="btn">
                        <input type="radio" name="group3" id="sawyer_BFF" autoComplete="off" defaultChecked /> BFF
                      </label>
                      </div>
                    </td>
                    <td>Available</td>
                    </tr>
              </tbody>
            </table>
            <input type="text" placeholder="Username"/>
            <button type="submit" className="btn btn-dark">Add</button>
            </section>
            
          <div>
            <ul className="list-group list-group-horizontal flex-wrap">
              <li className="list-group-item">Family</li>
              <li className="list-group-item">BFF</li>
            </ul>
            <input type="text" placeholder="Group Name"/>
            <button type="submit" className="btn btn-dark">Add</button>
          </div>
        </div>
      </div>
    </main>
  );
}