import axios from 'axios';
import store from "./store"
import { router } from "./router"

export default function setup() {
    console.log("installing Axios interceptors");

    axios.interceptors.request.use(function(config) {
        const basic = store.state.session.basicAuthToken; //"dGVzdDp0ZXN0";
        if (!basic) {
            console.log("user not logged in (but, first, we should try to detect if it is required !)");
            throw new axios.Cancel("not-logged-in");
        }

        if (basic) {
            config.headers.Authorization = `Basic ${basic}`;
        }

        // TODO: no way to set the bearer token right now (get it from ?)
        const bearer = store.state.session.bearerToken;
        if(bearer) {
            config.headers.Authorization = `Bearer ${bearer}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(response => {
        console.log("response intercept", response);
        return response;
    }, error => {
        console.log("response intercept error", error);
        if (error.message === 'not-logged-in' || error.response.state === 401) {
            router.push('/login');
        }
        return error;
    });

}
