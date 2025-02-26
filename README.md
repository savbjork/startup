# Do Disturb

[My Notes](notes.md)

Smartphone users are well aquainted with the "Do Not Disturb" feature. Allow us to introduce its companion, Do Disturb! This application lets your friends know when you are available to call and catch up. After logging in, the user sees which friends are available to call, facetime, etc. Users can set their own calendar and availability to let their friends take the turn and reach out as well. This is the perfect and polite solution to bridge the gap between family and friends that are either separated by long distances, busy schedules, or both.

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

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://dodisturb.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - Four HTML pages that represent ability to login, see friend availability, assign friends groups, and set personal availability.
- [x] **Proper HTML element usage** - Consistent and proper use of HTML tags.
- [x] **Links** - Navigation bar at the top of every page allows direction to any other page.
- [x] **Text** - Text represents friend availability in home and what schedule page will look like.
- [x] **3rd party API placeholder** - The screenshot of the Google Calendar on the Schedule page represents the third party call to Google Calendar's API.
- [x] **Images** - Images used as profile photos for user friends and profile picture.
- [x] **Login placeholder** - Input box and submit button for login.
- [x] **DB data placeholder** - Friends stored in groups (Friends page) and calendar groups available for different friend groups (Schedule page) represent data pulled from and stored in the database.
- [x] **WebSocket placeholder** - Friends' current status shown on the Home page represent the realtime status that will be retrieved.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I worked hard on this part of the deliverable!
- [x] **Navigation elements** - Menu of icons at the top to navigate to different pages!
- [x] **Responsive to window resizing** - I did complete this part of the deliverable!
- [x] **Application elements** - Contrast, whitespace, and consistent tables and list styles.
- [x] **Application text content** - Consistent font and intentional headers throughout.
- [x] **Application images** - Image used in the background (approved by TA's on slack).

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Done!
- [x] **Components** - Login, home, friends, & schedule are all components with mocks for login, WebSocket.
- [x] **Router** - Routing between components functional.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I did complete this part of the deliverable (Mock 3rd party call: Google Calendar screenshot; setInterval: mock retrieving friend status every minute)
- [x] **Hooks** - I did complete this part of the deliverable. (useState: on Friends, Login, Home, and Schedule;useEffect: on Friends, Login, Home, and Schedule)

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
