import React from 'react';
//import ReactDOM from 'react-dom/client';

export function Chat({ webSocket, userName }) {
  const [name, setName] = userName;
  //<Name updateName={userName} />
  console.log('Chat username: ', userName);

  return (
    <div>
      <Message name={userName} webSocket={webSocket} />
      <Conversation webSocket={webSocket} />
    </div>
  );
}

// function Name({ updateName }) {
//   return (
//     <main>
//       <div className='name'>
//         <fieldset id='name-controls'>
//           <legend>My Name</legend>
//           <input onChange={(e) => updateName(e.target.value)} id='my-name' type='text' />
//         </fieldset>
//       </div>
//     </main>
//   );
// }

function Message({ name, webSocket }) {
  const [message, setMessage] = React.useState('');
  const [connected, setConnected] = React.useState(webSocket.connected);

  React.useEffect(() => {
    webSocket.addObserver((chat) => {
      if (chat.event === 'system' && chat.from === 'websocket') {
        setConnected(chat.msg === 'connected');
      }
    });
  }, [webSocket]);

  function doneMessage(e) {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  function sendMsg() {
    webSocket.sendMessage(name, message);
    setMessage('');
  }

  const disabled = name === '' || !connected;
  //console.log('Chat disabled: ', disabled);

  return (
    <main>
      <fieldset id='chat-controls'>
      <div className="input-group mb-3">
        <input disabled={disabled} onKeyDown={doneMessage} value={message} onChange={(e) => setMessage(e.target.value)} type="text" class="form-control" placeholder="Send a message!" aria-label="message" aria-describedby="basic-addon2"/>
        <div className="input-group-append">
        <button disabled={disabled || !message} onClick={sendMsg} type="button" class="btn btn-outline-secondary" >Send</button>
        </div>
      </div>
      </fieldset>
    </main>
  );
}
//<legend>Chat</legend>
{/* <button disabled={disabled || !message} onClick={sendMsg}>
          Send
        </button> */}

function Conversation({ webSocket }) {
  const [chats, setChats] = React.useState([]);
  React.useEffect(() => {
    webSocket.addObserver((chat) => {
      setChats((prevMessages) => [...prevMessages, chat]);
    });
  }, [webSocket]);

  const chatEls = chats.map((chat, index) => (
    <div key={index}>
      <span className={chat.event}>{chat.from}</span> {chat.msg}
    </div>
  ));

  return (
    <main>
      <div main className='text-black' id='chat-text'>{chatEls}</div>
    </main>
  );
}

export class ChatClient {
  observers = [];
  connected = false;

  constructor() {
    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    this.socket.onopen = (event) => {
      this.connected = true;
      this.notifyObservers('system', 'websocket', 'connected');
      
    };

    // Display messages we receive from our friends
    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      const chat = JSON.parse(text);
      //get friends
      // const response = await fetch('/api/getFriendByEmail/${email}', {
      //   method: 'GET',

      //   },
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to fetch friend statuses");
      // }

      // console.log("Response status: " + response.status);
      // const data = await response.json();

      // friends = data.friends
      // if (chat.name  in friends {
      //   this.notifyObservers('received', chat.name, chat.msg);
      // }
      this.notifyObservers('received', chat.name, chat.msg);
    };

    // If the webSocket is closed then disable the interface
    this.socket.onclose = (event) => {
      this.notifyObservers('system', 'websocket', 'disconnected');
      this.connected = false;
    };
  }

  // Send a message over the webSocket
  sendMessage(name, msg) {
    this.notifyObservers('sent', 'me', msg);
    this.socket.send(JSON.stringify({ name, msg }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, from, msg) {
    this.observers.forEach((h) => h({ event, from, msg }));
  }
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Chat webSocket={new ChatClient()} />);<={} />