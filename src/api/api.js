import axios from "axios"

class Api 
{
    constructor() 
    {
        this.baseURL = 'http://52.73.161.142/swagger/index.html?fbclid=IwAR0Cj-zfp9K6NfGpGLkDbZAlt7PMA_aIDR8pekoL06Tofpua7DjaBxgqCmk';

        axios.interceptors.request.use(
            config =>
            {
                return this.ConfigRequest(config)
            },
            error =>
            {
                return Promise.reject(error)
            }
        )

        axios.interceptors.response.use(
            response =>
            {
                return this.PostProcessing(response)
            },
            error =>
            {
                return this.HandleError(error)
            }
        )
    }

    ConfigRequest = (config) =>
    {
        if (config.hasOwnProperty('payload') === false)
        {
            return config
        }

        if (config['headers']['Content-Type'] === 'multipart/form-data')
        {
            let formData = config['payload'].data
            config['data'] = formData
        }
        else
        {
            config['data'] = {
                ...config['payload'].data
            }
        }

        return config
    }

    PostProcessing = (res) =>
    {

        if (res.status < 200 || res.status >= 300)
        {
            return Promise.reject({
                code: res.status || -1,
                title: res.statusText || 'Warning !',
                message: `invalid status ${res.status}`
            })
        }

        if (res.data)
        {
            return res.data
        }

    }

    HandleError = (payload) =>
    {
        let response = payload.response || {}
        return Promise.reject({
            code: response.status || -3,
            title: response.statusText || 'Warning !',
            message: (response.data && response.data.error) || (payload.message) || 'unknown reason'
        })
    }


    Request(method, url, payload, contentType = 'application/json', responseType = 'json')
    {
        let config = {};

        config['method'] = method;
        config['url'] = url;
        config['responseType'] = responseType;
        config['headers'] = {
            'Content-Type': contentType
        };
        config['payload'] = payload || {}
        return axios(config)
    }

    getAllCategories()
    {
        return this.Request('get',`${this.baseURL}/api/Category/get-all-category`)     
    }

    getAllManufacturers()
    {
        return this.Request('get',`${this.baseURL}/get-all-manufacturer`)     
    }

    getAllStores()
    {
        return this.Request('get',`${this.baseURL}/api/Store/get-all-store`) 
    }

    // Products:
    getAllProducts()
    {
        return this.Request('get',`${this.baseURL}/api/Category/get-all-product`)     
    }
    
    CreateProduct()
    {

    }

    EditProduct()
    {
        
    }

    DeleteProducts()
    {

    }


}
export default new Api()