import React from 'react';
import { Admin, Resource, ShowGuesser, EditGuesser, fetchUtils } from 'react-admin';
import { UserList } from './user';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import { PostList, PostEdit, PostCreate } from './posts';
// import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dasboard from './Dashboard';
import dataProvider from './myDataProvider';
import MyLogoutButton from './MyLogoutButton';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from './i18n/en';

import orders from './orders';
import products from './products';
import categories from './categories';
import visitors from './visitors';
import invoices from './invoices'
import reviews from './reviews';



// import MyLoginPage from './MyLoginPage';
import Login from './layout/Login'

// api url 
const apiUrl = 'http://localhost:8080/api';



const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const raToken = localStorage.getItem('raToken');
  options.headers.set('Authorization', `${raToken}`);
  return fetchUtils.fetchJson(url, options);
};

const dataP = dataProvider(apiUrl, httpClient);

const authP = authProvider(apiUrl);


const i18nProvider = polyglotI18nProvider(locale => {
  // if (locale === 'fr') {
  //     return import('./i18n/fr').then(messages => messages.default);
  // }

  // Always fallback on english
  return englishMessages;
}, 'en');

const App = () => (
  <Admin
    loginPage={Login}
    dashboard={Dashboard}
    authProvider={authP}
    dataProvider={dataP}
    logoutButton={MyLogoutButton}
    i18nProvider={i18nProvider}>
    {permissions => [
      // <Resource name="posts" list={PostList} icon={PostIcon} create={PostCreate} edit={PostEdit} show={ShowGuesser} />,
      // <Resource name="clients" list={UserList} show={ShowGuesser} edit={EditGuesser} icon={UserIcon}></Resource>,
      <Resource name="customers" {...visitors} />,
      <Resource
        name="commands"
        {...orders}
        options={{ label: 'Orders' }}
      />,

      <Resource name="products" {...products} />,
      <Resource name="categories" {...categories} />,
      <Resource name="invoices" {...invoices} />,
      <Resource name="reviews" {...reviews} />,

    ]}
  </Admin>
);

export default App;