import axios from "axios";
import Settings from "./Settings";
const Api = {
    baseUrl: Settings.baseUrl,
    userTokenKey: 'jwt_token',
    apiHeaders: {
    },
    getApiHeadres: function () {
        return this.apiHeaders;
    },
    axios: axios.create({
        baseURL: Settings.apiUrl,
    }),
    post: function (url, data, callback) {
        this.axios.post(url, data).then((res) => {
            callback(res);
        }).catch(function (error) {
            console.log(error);
        });
    },
    get: function (url, data, callback) {
        this.axios.get(url, data).then((res) => {
            callback(res);
        }).catch(function (error) {
            console.log(error);
        });
    },
    getAsyn: async function (url) {
        try {
            const res = await this.axios.get(url);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    },
    postAsync: async function (url,data) {
        try {
            const res = await this.axios.post(url,data);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    },
    setTokenToHeader: function () {
        let token = this.getUserToken();
        if (token) {
            this.axios = axios.create({
                baseURL: Settings.apiUrl,
                headers: {
                    withCredentials: true,
                    Authorization: 'Bearer ' + token
                }
            })
            return true;
        } else {
            return false;
        }
    },
    setUserToken(token){
        localStorage.setItem(this.userTokenKey,token);
    },
    getUserToken() {
        let token = null;
        token = localStorage.getItem(this.userTokenKey);
        if (!token) {
            return false;
        }
        return token;
    },
    removeToken(){
        localStorage.removeItem(this.userTokenKey);
    }
}
export default Api;