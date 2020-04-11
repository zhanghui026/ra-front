import { fetchUtils,DataProvider } from 'react-admin';
import { stringify } from 'query-string';
import apiUrlDefault from './appConstant'; 

const httpClientDefault = fetchUtils.fetchJson;

const fstr = (str) => typeof str == 'string' ? str + "*" : str;

const dataProvider =  (apiUrl = apiUrlDefault,httpClient = httpClientDefault ) => ({

    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order} = params.sort;

        var search ;
        if (params.filter){
            search = Object.entries(params.filter).map(it => it[0] + '==' + fstr(it[1])).join('&');
        }

        const query = {
          page: page -1,
          size: perPage,
          sort: field? field+","+order.toLowerCase():'id,asc', 
          search: search 
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers,json}) => ({
            data: json,
            total: parseInt(headers.get('X-Total-Count'),10),
        }));
    }, 

    getOne: (resource,params) => { 
        return httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        }))},

    getMany: (resource,params) => {
        // console.log(params)
        // const { page, perPage } = params.pagination;
        // const { field, order} = params.sort;

        const query = {
            // page: page -1,
            // size: perPage,
            // sort: field? field+","+order.toLowerCase():'id,asc',
            ids: params.ids.map(String).join(',')
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({headers,json}) => ({
            data: json
        }));
    },
        
    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    create: (resource, params) => {
        console.log(JSON.stringify(params.data));
       return  httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },
       
    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(() => ({ data: params.previousData })),
   
        
    deleteMany: (resource, params) => {
         const query = {
             id: params.ids.map(String).join(',')
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
                method: 'DELETE',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: params.ids }));
        },   
});

export default dataProvider;
