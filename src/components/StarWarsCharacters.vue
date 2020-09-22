<template>
    <!-- 
        Nota: optei por utilizar CSS Grid neste exemplo devido à facilidade de posicionamento
        entre dispositivos, porém, segundo o novo Bootstrap 4 (usado neste exemplo), o ideal é 
        utilizar o Flexbox. Se houvessem mais elementos DOM, principalmente se houvesse animação 
        ou sobreposição, teria utilizado o Flexbox ao invés do CSS Grid, que é menos dinâmico.
     -->
    <div class="container">
        <div class="row">        
            <div class="col-12">
                <button @click="GetRandomCharacters" class="btn btn-light">Gerar lista de Personagens!</button>
            </div>
        </div>
        <hr>
        <div class="row justify-content-lg-center" v-if="listReady">
            <div class="col-4 col-offset-4">
                <ul>
                    <li v-for="character in sw_characters" :key="character.name">
                        <button :style="ChangeButtonColor(character.color)" @click="RemoveFromArray(character.name)" class="btn btn-light">{{ character.name }}</button>
                    </li>
                </ul>
            </div>
        </div>
        <hr>
        <div class="row justify-content-lg-center" v-if="listReady">
            <div class="col-4 col-offset-4">
                <select name="characters" id="characters" v-model="selected">
                    <option v-for="character in sw_characters" :key="character.name" :value="character.name" :style="ChangeButtonColor(character.color)">{{ character.name }}</option>
                </select>
                <div>
                    <button class="btn btn-info" @click="RemoveFromArray(selected)">Remover selecionado</button>
                </div>
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

            selected: ''
        }
    },

    methods: {
        // after populating the character's data store, we can randomly fetch 10 different characters
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

        RemoveFromArray(name) {
            let objIndex = 0;
            let i = 0;
            this.sw_characters.forEach( character => {
                if(character.name == name) {
                    objIndex = i;
                } 
                else {
                    i++;
                }
            })

            this.sw_characters.splice(objIndex, 1);
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
    padding: 0.25rem;
}

ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>