// import React, { useState } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import LoginPage from '../components/LoginPage.jsx';
// // import AdminSignup from '../components/AdminSignup.jsx';
// import AdminContainer from './AdminContainer.jsx';
// import UserContainer from './UserContainer.jsx';
// import CreateUser from '../components/CreateUser.jsx';
// import SpacesContainer from './SpacesContainer.jsx';
// import VClusterContainer from './VClusterContainer.jsx';


// export const LoginContext = React.createContext();


// const MainContainer = (props) => {

//   const [loginStatus, setLoginStatus] = useState({
//     login: false,
//     logout: true,
//   })

//   // console.log('login context', LoginContext);

//   // console.log('main', props)
//   return (
//     <div className='MainContainer'>


//       <Switch>

//         <Route path="/" exact>
//           <LoginContext.Provider value={loginStatus}>
//             <LoginPage props={loginStatus} />
//           </LoginContext.Provider>
//         </Route>
//         <Route path="/admin" exact component={AdminContainer} />
//         <Route path="/user" exact component={SpacesContainer} />
//         <Route path='/vcluster' exact component={VClusterContainer} />
//       </Switch>
//       {props.children}

//     </div>

//   )
// }

// export default MainContainer;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage.jsx';
// import AdminSignup from '../components/AdminSignup.jsx';
import AdminContainer from './AdminContainer.jsx';
import UserContainer from './UserContainer.jsx';
import CreateUser from '../components/CreateUser.jsx';
import ClusterContainer from './ClusterContainer.jsx';
import SpacesContainer from './SpacesContainer.jsx';
//added two routes for spaces and clusters
const MainContainer = () => {
  return (
    <div className='MainContainer'>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/admin" exact component={AdminContainer} />
        <Route path="/user" exact component={UserContainer} />
        {/* <Route path="/spaces" exact component={SpacesContainer} />
        <Route path="/clusters" exact component={ClusterContainer} /> */}
        {/* <Route path="/" exact component={SpacesContainer} />
        <Route path="/" exact component={ClusterContainer} /> */}
      </Switch>
      <SpacesContainer />
      <ClusterContainer />
    </div>
  )
}
export default MainContainer;