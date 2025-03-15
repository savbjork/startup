import React from 'react';
import './friends.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsTrash3 } from "react-icons/bs";


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
          <td className="d-flex justify-content-between">
        {friend}
        <BsTrash3 size="1rem" className="text-right" onClick={deleteFriend}/>
          </td>
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

  function deleteFriend(e){
    const friendName = e.target.parentElement.textContent;
    //console.log(friendName);
    const newFriends = [];
    for (const friend of friends) {
      if (friend != friendName) {
        console.log('found friend');
        newFriends.push(friend);
      }
    }
    localStorage.setItem('friends', JSON.stringify(newFriends));
    setFriends(newFriends);
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
            <div className="d-flex">
              <input id="addFriend" type="text" className="form-control w-auto" placeholder="Username" />
              <button type="submit" className="btn btn-dark ms-2" onClick={() => addFriend()}>Add</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}