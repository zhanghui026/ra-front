import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8080/api';
const httpClient = fetchUtils.fetchJson;

export default {

    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order} = params.sort;

        const query = {
          page: page -1,
          size: perPage,
          sort: field? field+","+order.toLowerCase():'id,asc',  
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers,json}) => ({
            data: json,
            total: parseInt(headers.get('X-Total-Count'),10),
        }));
    }, 

    getOne: (resource,params) => 
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource,params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },
        
    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),
       
    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(() => ({ data: params.previousData })),
   
        
    deleteMany: (resource, params) => {
        console.log(params)
         const query = {
             id: params.ids.map(String).join(',')
        };
        console.log(`${apiUrl}/${resource}?${stringify(query)}`);
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
                method: 'DELETE',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({ data: params.ids }));
        },   
}
