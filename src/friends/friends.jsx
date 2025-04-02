import React, { useState, useEffect } from 'react';
import './friends.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsTrash3 } from "react-icons/bs";

export function Friends() {
  const [friends, setFriends] = useState([]);

  // Fetch friends when the component mounts
  useEffect(() => {
    fetchFriends();
  }, []);

  async function fetchFriends() {
    try {
      const response = await fetch('/api/getFriends', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched friends:", data);
      setFriends(data.friends || []);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }

  async function addFriend() {
    const friendInput = document.getElementById('addFriend').value.trim();
    if (!friendInput) return;
  
    try {
      const response = await fetch('/api/addFriend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: friendInput }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add friend");
      }
  
      const updatedFriends = await response.json();
      fetchFriends(); // Fetch updated friends list
      // console.log("Updated friends list:", updatedFriends);
      // setFriends(updatedFriends); 
  
      document.getElementById('addFriend').value = ''; // Clear input
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  }

  async function deleteFriend(friendName) {
    try {
      const response = await fetch(`/api/deleteFriend/${friendName}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to delete friend");
      }

      const updatedFriends = await response.json();
      fetchFriends(); // Fetch updated friends list
      // console.log("Updated friends list after delete:", updatedFriends); 
      // setFriends(updatedFriends);
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  }

  return (
    <main>
      <div className="container">
        <div className="row">
          <h2 className="text-light text-center">Friends</h2>
          <section>
            {friends.length > 0 ? (
              <table className="table bg-light text-dark">
                <thead className="table-secondary">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {friends.map((friend, index) => (
                    <tr key={index}> {/* ✅ Changed key to index for reliability */}
                      <td>{friend.name || friend}</td> {/* ✅ Handle case where API returns strings instead of objects */}
                      <td className="text-end">
                        <BsTrash3 size="1rem" className="cursor-pointer" onClick={() => deleteFriend(friend.name || friend)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-light">No friends found.</p>
            )}
            <div className="d-flex justify-content-center mt-3">
              <input id="addFriend" type="text" className="form-control w-auto" placeholder="Username" />
              <button type="submit" className="btn btn-dark ms-2" onClick={addFriend}>Add</button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
