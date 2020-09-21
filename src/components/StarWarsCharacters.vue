<template>
    <div class="d-flex justify-content-center">
        <button @click="GetRandomCharacters" class="btn btn-light">Get characters!</button>
        <div v-if="listReady">
            <div class="list-group">
                <div v-for="character in sw_characters" :key="character.name" class="list-group-item"><button :style="ChangeButtonColor(character.color)">{{ character.name }}</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'StarWarsCharacters',

    data() {
        return {
            listReady: false,
            sw_characters: [],
            character: Object,
        }
    },

    methods: {
        // after populating the characters data store, we can randomly fetch 10 different characters
        GetRandomCharacters() {
            var usedId = [];

            while(this.sw_characters.length < 10) {
                var validId = true;

                var id = Math.floor(Math.random() * this.$store.getters.characters.length);

                usedId.forEach(uId => {
                    if(id == uId) {
                        validId = false;
                    }
                });
                
                if(validId) {
                    this.ChangeCharProp(this.$store.getters.characters[id].name, this.$store.getters.characters[id].eyeColor);

                    this.sw_characters.push(this.character);
                    usedId.push(id);
                }
            }
            
            // After setting a 10-character list in sw_characters array, we sort all characters by their names
            this.SortCharacterList();
            this.listReady = true;
        },

        ChangeCharProp(name, color) {
            this.character = {
                'name': name,
                'color': color
            }
        }, 

        SortCharacterList() {
            this.sw_characters.sort(function (a, b) {
                if(a.name > b.name) {
                    return 1;
                }

                if(a.name < b.name) {
                    return -1;
                }

                return 0;
            })
        },

        ChangeButtonColor(color) {
            if (color == 'undefined') {
                return 'color: black'; // there are some "undefined" eye colors on the list, so we paint them in black
            }
            else {
                return 'color: ' + color;
            }
        },
    },

    computed: {
        ...mapGetters(['characters']),
    }
}
</script>

<style scoped>
button {
    margin: 0.2rem;
    padding: 0.2rem;
}
</style>