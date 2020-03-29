import React from 'react';
import { Admin,Resource,ShowGuesser,EditGuesser,fetchUtils} from 'react-admin';
import {UserList} from './user';
import Dashboard from './Dashboard'; 
import authProvider  from './authProvider';
import {PostList,PostEdit,PostCreate} from './posts';
// import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dasboard from './Dashboard';
import dataProvider from './dataProvider';
import MyLogoutButton from './MyLogoutButton';
import MyLoginPage from './MyLoginPage';


// api url 
const apiUrl = 'http://localhost:8080/api';



const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const raToken = localStorage.getItem('raToken');
  options.headers.set('Authorization',`${raToken}`);
  return fetchUtils.fetchJson(url,options);
};

const dataP = dataProvider(apiUrl,httpClient);

const authP  = authProvider(apiUrl);


const App = () => (
  <Admin loginPage={MyLoginPage} dashboard={Dashboard} authProvider={authP} dataProvider={dataP} logoutButton={MyLogoutButton}>
     {permissions => [
  <Resource name="posts" list={PostList} icon={PostIcon} create={PostCreate}  edit={PostEdit} show={ShowGuesser}/>,
    <Resource name="clients" list={UserList} show= {ShowGuesser} edit={EditGuesser} icon={UserIcon}></Resource>
     ]}
    </Admin>
);

export default App;