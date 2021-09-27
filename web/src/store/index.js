import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

axios.interceptors.request.use(function (config) {
    config.headers.Accept = 'application/json';
    return config;
});

export default new Vuex.Store({
    state: {
        user: JSON.parse(window.localStorage.getItem('user')) || {},
        token: window.localStorage.getItem('token') || '',
        posts: [],
    },
    actions: {
        getPosts({commit, rootState}) {
            return new Promise((resolve, reject) => {
                axios.get(process.env.VUE_APP_API_URL+'/api/post', {
                    headers: {
                        Authorization: 'Bearer ' + rootState.token
                    }
                }).then(response => {
                    console.log(response);
                    resolve(response);
                    commit('SET_POSTS', response.data.data);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        updateApproval({commit, rootState}, {id, value}) {
            axios.put(process.env.VUE_APP_API_URL+'/api/post', {
                post_id: id,
                approved: value,
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + rootState.token
                    }
                }).then(() => {
                    commit('SET_POST', {
                        id: id,
                        approved: value,
                    });
            }).catch(err => {
                console.log(err);
            })
        },
        loginUser({commit, dispatch}, {email, password}) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.VUE_APP_API_URL + '/api/auth/login', {
                    email: email,
                    password: password
                }).then(response => {
                    if (response.status === 200) {
                        commit('SET_TOKEN', response.data.data.token);
                        window.localStorage.setItem('token', response.data.data.token);
                        dispatch('getUser').then(() => {
                            resolve();
                        });
                    }
                }).catch(error => {
                    reject(error)
                });
            });
        },
        registerUser({commit, dispatch}, {name, email, password, password_confirmation}) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.VUE_APP_API_URL + '/api/auth/register', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                }).then(response => {
                    if (response.status === 200) {
                        commit('SET_TOKEN', response.data.data.token);
                        window.localStorage.setItem('token', response.data.data.token);
                        dispatch('getUser').then(() => {
                            resolve();
                        });
                    }
                }).catch(error => {
                    reject(error)
                });
            });
        },
        getUser({commit, rootState}) {
            return new Promise((resolve, reject) => {
                axios.get(process.env.VUE_APP_API_URL + '/api/auth/me', {
                    headers: {
                        Authorization: 'Bearer ' + rootState.token
                    }
                }).then(response => {
                    commit('SET_USER', response.data);
                    window.localStorage.setItem('user', JSON.stringify(response.data));
                    resolve();
                }).catch(err => {
                    reject(err)
                })
            })
        },
        createNewPost({commit, rootState}, formData) {
            return new Promise((resolve, reject) => {
                commit('');
                axios.post(process.env.VUE_APP_API_URL + '/api/post', formData, {
                    headers: {
                        Authorization: 'Bearer ' + rootState.token,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });

            })
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        posts(state) {
            return state.posts;
        }
    },
    mutations: {
        SET_POST(state, {id, approved}) {
            let post = state.posts.findIndex(obj => obj.id === id);
            state.posts[post].approved = approved;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_POSTS(state, posts) {
            state.posts = posts;
        }
    }
});
