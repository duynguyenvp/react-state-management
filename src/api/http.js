import axios from 'axios'
import qs from 'qs'

export const create = (options) => {
    let opts = {};

    if (options.baseURL) {
        opts.baseURL = `${options.baseURL}`
    }

    let instance = axios.create(Object.assign({}, options, opts));

    instance.interceptors.request.use(function (config) {
        const {method, data, header} = config;
        if (method == 'post' && typeof data == 'object') {
            let nextHeader = Object.assign({}, header, {
                'content-type': 'application/x-www-form-urlencoded'
            })
            let nextData = qs.stringify(data);

            return Object.assign({}, config, {
                header: nextHeader,
                data: nextData
            })
        }
        return config;
    });

    instance.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {
        if (error.response.status == 401) {
          console.error(error)
        }
    });

    return instance;
}