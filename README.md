# Do Disturb

[My Notes](notes.md)

Smartphone users are well aquainted with the "Do Not Disturb" feature. Allow us to introduce its companion, Do Disturb! This application lets your friends know when you are available to call and catch up. After logging in, the user sees which friends are available to call, facetime, etc. Users can set their own calendar and availability to let their friends take the turn and reach out as well. This is the perfect and polite solution to bridge the gap between long distance family and friends.

## 🚀 Specification Deliverable


For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

With "Do Disturb" it has never been easier to connect with your friends and family near and far without feeling guilty for intruding. The simple design allows users to set personal availability and see their friends that are free for a call that very minute. Let this tool turn your long commutes, lonely lunch breaks, and wasted time into moments of connection!

### Design

![Design image](design.jpeg)

The chart below shows the relationship between the different pages.

```mermaid
sequenceDiagram
    actor User
    User->>Login: Enter login information
    Login->>Available: See which friends are currently available
    Available-->>Login: Logout
    Available->>Calendar: Edit personal availability
    Calendar->>Calendar: Set current status
    Available-->>Friends: See all friends friends
    Friends->>Friends: Assign friends to groups
    Friends->>Friends: Add or delete friends
```


### Key features

- Login, logout, and register
- Add friends and see their status (available or not) 
- Set personal availability with visibility to different groups
- Edit personal availability as integrated with Google Calendar (third party service)
- Assign friends to different groups

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Four different views: login, home, calendar, and friends.
- **CSS** - Application styling that looks good on different screen sizes, responsive features, and a color theme for unity.
- **React** - Utilized for routing components, displaying other users' status, and state hooks.
- **Service** - Used for login and retrieving availablility status. Third party call to sync with Google Calendar.
- **DB/Login** - Store users, friends, and schedule in database. Register and login users. Can only add friends with an existing account.
- **WebSocket** - When a user edits their availability, their changes will reflect on their friends' devices. 

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
