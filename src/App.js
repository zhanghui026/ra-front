import React from 'react';
import { Admin,Resource,ShowGuesser} from 'react-admin';
import {UserList} from './user';
import Dashboard from './Dashboard'; 
import authProvider  from './authProvider';
import {PostList,PostEdit,PostCreate} from './posts';
// import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dasboard from './Dashboard';
import dataProvider from './dataProvider';



// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

const App = () => (
  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
  {/* <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}  icon={PostIcon} /> */}
  <Resource name="posts" list={PostList} icon={PostIcon} create={PostCreate}  edit={PostEdit} show={ShowGuesser}/>
    {/* <Resource name="users" list={UserList} icon={UserIcon}></Resource> */}
  </Admin>
);

export default App;