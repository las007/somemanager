
// import axios from 'axios'
import JsonP from 'jsonp'

export default class Axios {
    static jsonp(opts) {
        return new Promise((resolve, reject) => {
            JsonP(opts.url, {
                params: 'callback'
            }, function (err, response) {
                //to do
                // debugger;
                if (response) {
                    resolve(response)
                } else {
                    reject(response.message)
                }
            })
        })
    }
}
