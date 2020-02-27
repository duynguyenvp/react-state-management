import { create } from './http'
const API_DOMAIN = "http://localhost:3000"
const getApiInstance = (baseURL = '') => {
    const ajax = create({ baseURL: API_DOMAIN + baseURL });

    const getAll = (url, args) => {
        return ajax.get(url, args)
    }
    const insert = (url, args) => {
        return ajax.post(url, args)
    }
    const update = (url, args) => {
        return ajax.put(url, args)
    }
    const remove = (url) => {
        return ajax.delete(url)
    }

    return {
        getAll,
        insert,
        update,
        remove
    }
}

export default getApiInstance;