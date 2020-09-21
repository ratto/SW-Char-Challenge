import Vue from 'vue';
import Vuex from 'vuex';
import characters from './modules/characters.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        characters,
    },
});