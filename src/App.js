import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ReactNotifications from 'react-notifications-component';
import axios from 'axios';
import './App.css';
import Login from './Login/log-in.js'
import Upload from './Upload';
import Canvas from './Canvas';
import NavigationBar from './Nav/nav.js'
import Main from './Main/Main';
import Search from './Friends/Search';
import Profile from './Proflie/profile'


function App() {
  const [user, setUser] = useState({ id: null, name: 'Not logged in' });
  const [imgs, setImgs] = useState([]);
  const [doods, setDoods] = useState({});
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [fetchDoods, setFetchDoods] = useState();
  const [fetchRequests, setFetchRequests] = useState();

  const getDoods = (user) => {
    return axios.get(`/api/doodles/${user.id}`);
  }

  const getImgs = (user) => {
    return axios.get(`/api/images/${user.id}`);
  }

  const getAllDoods = () => {
    if (!user.id) {
      return;
    }
    const allUsers = [user].concat(friends);
    return Promise.all(allUsers.map(user => getDoods(user)))
      .then((allDoods) => {
        const doodsCopy = {...doods};
        allDoods
        .map(userDoods => userDoods.data)
        .forEach(userDoods => {
          if(userDoods.length) {
            doodsCopy[userDoods[0].doodler_id] = userDoods;
          }
        });
        setDoods(doodsCopy);
      })
      .catch(err => console.error(err));
  }

  const getFriends = (user) => {
    return axios.get(`/api/friends/${user.id}`);
  }

  const getRequests = () => {
    if (!user.id) {
      return;
    }
    axios.get(`/api/friends/requests/${user.id}`)
      .then((requests) => setRequests(requests.data.filter(request => {
        return !friends.some(friend => friend.id === request.id);
      })))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if(fetchDoods) {
      clearInterval(fetchDoods);
    }
    if (fetchRequests) {
      clearInterval(fetchRequests);
    }
    getAllDoods();
    getRequests();
    setFetchDoods(setInterval(getAllDoods, 5000));
    setFetchRequests(setInterval(getRequests, 5000));
  }, [friends]);

  useEffect(() => {
    if(user.id) {
        getFriends(user)
        .then(results => {
          setFriends(results.data);
          })
        .catch(err => console.error(err));
    } else {
      setImgs([]);
      setDoods({});
      setFriends([]);
    }
  }, [user]);

  return (
    <div className="App">
      <React.Fragment>
        <Router>
          <ReactNotifications/>
          <NavigationBar user={user} setUser={setUser} getAllDoods={getAllDoods} />
          <Switch>
            <Route
            exact path="/"
            render={(props) => {
              const { back } = props.location
              if(!user.id) {
              return <Login setUser={setUser} />
              }
              if(!back) {
                return <Redirect to='/home' /> 
              }
              return <Redirect to={back} />
            }
            }
           />
            <Route
              path="/upload"
              render={() => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/upload'
                  }} />
                }
                return <Upload user={user} setUser={setUser} />
              }}
            />
            <Route
              path="/profile"
              render={(props) => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/profile'
                  }} />
                }
                const profUser = props.location.user || user;
                if (!friends.some(friend => friend.id === profUser.id) && profUser !== user) {
                  alert(`You are not yet friends with ${profUser.name}. Please add them first.`);
                  return <Redirect to="/home" />
                }
                return <Profile
                          user={profUser}
                          doods={doods} 
                          getAllDoods={getAllDoods}
                          getImgs={getImgs}
                          getFriends={getFriends}
                          requests={profUser.id === user.id && requests}
                        />

              //   return (
                
              //   <div>
              //     <div className="imgheader">
              //       <Row>
              //         <Col>
              //           <div></div>
              //           <div><b>{user.name}</b></div>
              //           <Image className="profileimgs" src={user.imageurl} rounded />
              //           <div>{user.email}</div>
              //           <div>{user.id !== null && doods[user.id] ? `Total Doods: ${doods[user.id].length}` : null}</div>
              //         </Col>
              //       </Row>
              //     </div>
              //     <SideNav friends={friends} />
              //     <NormalImageFeed
              //       imgs={imgs}
              //       getAllDoods={getAllDoods}
              //       user={user}
              //     />
              //     <Doodlefeed doods={doods} user={user}/>
              //   </div>
              // )}
              }}
            />
            <Route
              path="/doodle"
              render={(props) => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/doodle'
                  }} />
                }
                return (
                  <Canvas
                    user={user}
                    url={props.location.url}
                    original_id={props.location.original_id}
                    getAllDoods={props.location.getAllDoods}
                  />
                );
              }}
            />
          <Route
            path="/home"
            render={() => {
            if(!user.id) {
              return <Redirect to={{
                pathname: "/",
                back: "/home"
              }} />
            }
            return <Main
                      user={user}
                      imgs={imgs}
                      doods={doods}
                      friends={friends}
                      getFriends={getFriends}
                      setFriends={setFriends}
                    />
          }}
            />
            <Route
              path="/search"
              render={() => {
                if(!user.id) {
                  return <Redirect to={{
                    pathname: '/',
                    back: '/search'
                  }} />
                }
                return <Search user={user} getFriends={getFriends} />
            }}
            />
            {/* <Route
              path="/comments"
              render={()=> {
                if(!user.id){
                  return <Redirect to={{
                    pathname: '/',
                    back: '/comments'
                  }} />
                }
                return <Comments 
                  user={user}
                  setComments={setComments} 
                  getComments={getComments}
                  doods={doods}
                   />  */}
              }}
              />
          </Switch>
        </Router>
      </React.Fragment>
    </div>
  );
}
export default App;
