import React from 'react';
import './friends.css';


export function Friends() {
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    const friendsText = localStorage.getItem('friends');
    if (friendsText) {
      setFriends(JSON.parse(friendsText));
    }
  }
  , []);

  const friendRows = [];
  if (friends) {
    console.log('friends')
    for (const friend of friends) {
      //const { name } = friend;
      console.log(friend);
      friendRows.push(
        <tr key={friend}>
          <td>{friend}</td>
          {/* <td>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn">
              <input type="radio" name="group1" id="group1_family" autoComplete="off" defaultChecked /> Family
            </label>
            <label className="btn">
              <input type="radio" name="group1" id="group1_BFF" autoComplete="off"/> BFF
            </label>
            </div>
          </td> */}
        </tr>
      );
      
    }
  }
  else {
    console.log('no friends');
  }


  return (
    <main>
      <div className="container">
        <div className="row">
             <h2 className="text-light text-center">Friends</h2>
            <section>
              <table className="table bg-light text-dark">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {friendRows}
              </tbody>
            </table>
            <input type="text" placeholder="Username"/>
            <button type="submit" className="btn btn-dark">Add</button>
            </section>
            
          {/* <div>
            <ul className="list-group list-group-horizontal flex-wrap">
              <li className="list-group-item">Family</li>
              <li className="list-group-item">BFF</li>
            </ul>
            <input type="text" placeholder="Group Name"/>
            <button type="submit" className="btn btn-dark">Add</button>
          </div> */}
        </div>
      </div>
    </main>
  );
}