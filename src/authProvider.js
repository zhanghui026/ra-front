import React from 'react'
// Authenticatd by default
const authProvider = (apiUrl) => ({
    login: ({ username, password }) => {
        const request  = new Request(`${apiUrl}/authenticate`,
            {
                method: 'POST',
                body: JSON.stringify({username,password}),
                headers: new Headers({ 'Content-Type': 'application/json'}) 
            }
        );

        return fetch(request) 
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                // console.log(response.json);
                const token = response.headers.get(
                    'authorization'
                );
                return token;
            })
            .then((token) => {
                console.log(token);
                localStorage.setItem('raToken',token);
                console.log(localStorage.getItem('raToken'));
                return Promise.resolve();
            });
            
    },
    logout: () => {
        console.log('logout');
        localStorage.removeItem('raToken');
        // localStorage.removeItem('role');
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('raToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
       
        return localStorage.getItem('raToken')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => {
        // if (!localStorage.getItem('raToken')){
        //     return Promise.reject();  
        //  }
 
        //  const raToken = localStorage.getItem('raToken');
        //  const request  = new Request(`${apiUrl}/account`,
        //  {
        //      method: 'GET',
        //      headers: new Headers({'Authorization':`Bearer ${raToken}`}) 
        //  });
         return Promise.resolve('admin');
        //  return fetch(request) 
        //      .then(response => {
        //          if (response.status < 200 || response.status >= 300) {
        //              return Promise.reject();
        //          }
        //          return response.json;
        //      })
        //      .then(({ authorities }) => {
        //          const role = 'admin';
        //          return role ? Promise.resolve(role): Promise.reject();
        //      });
        
    },
});


export default authProvider;