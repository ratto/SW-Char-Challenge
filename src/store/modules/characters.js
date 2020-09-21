import Axios from 'axios'

const state = {
    characters: {}
}

const getters = {
    characters: state => state.characters,
}

const mutations = {
    SET_CHARACTER_STORE: (state, characters) => {
        state.characters = characters;
    }
}

const actions = {
    START_CHARACTER_STORE: async ({ commit }) => {
        let charArray = [];
        let hasNext = true;
        var i = 1;
        
        // as swapi can't deliver all the characters data, so we call each page that has data on it
        do {
            await Axios.get('https://swapi.dev/api/people/?page=' + i).then((response) => {
                if (response.data.next != null) {
                    response.data.results.forEach(character => {
                        let charObj = {
                            'name': character.name,
                            'eyeColor': character.eye_color
                        }

                        charArray.push(charObj);
                    });
                } else {
                    response.data.results.forEach(character => {
                        let charObj = {
                            'name': character.name,
                            'eyeColor': character.eye_color
                        }

                        charArray.push(charObj);
                    });

                    hasNext = false;  
                }
            }).catch(function (error) {
                window.console.log(error);
            })

            i++;

        } while(hasNext);
        
        commit('SET_CHARACTER_STORE', charArray);
        window.console.log('Success: All characters have been downloaded from swapi!');
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}