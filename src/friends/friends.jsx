import React from 'react';
import './friends.css';


export function Friends() {
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    const friendsText = localStorage.getItem('friends');
    if (friendsText) {
      setFriends(JSON.parse(friendsText));
    }
  }, []);

  const friendRows = [];
  if (friends) {
    //console.log('friends')
    for (const friend of friends) {
      //console.log(friend);
      friendRows.push(
        <tr key={friend}>
          <td>{friend}</td>
        </tr>
      );
    }
  }
  // else {
  //   console.log('no friends');
  // }

  function addFriend() {
    const friendInput = document.getElementById('addFriend').value;
    if (friendInput){
      //make sure friend not already in
      for (const friend of friends) {
        if (friend == friendInput) {
          return;
        }
      }
      //console.log('setting friend');
      localStorage.setItem('friends', JSON.stringify([...friends, friendInput]));
      setFriends([...friends, friendInput]);

      //clear input
      document.getElementById('addFriend').value = '';
    }
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
          <input id="addFriend" type="text"  placeholder="Username" />
          <button type="submit" className="btn btn-dark" onClick={()=> addFriend()}>Add</button>
          </section>
        </div>
      </div>
    </main>
  );
}