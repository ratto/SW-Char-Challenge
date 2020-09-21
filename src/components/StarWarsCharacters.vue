<template>
    <div class="d-flex justify-content-center">
        <button @click="GetRandomCharacters" class="btn btn-light">Get characters!</button>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'StarWarsCharacters',

    data() {
        return {
            sw_characters: [],
            character: Object
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
            
            this.SortCharacterList();
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
        }
    },

    computed: {
        ...mapGetters(['characters'])
    }
}
</script>

<style scoped>
    
</style>