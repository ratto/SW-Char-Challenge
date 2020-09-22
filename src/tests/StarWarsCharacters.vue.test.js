import { shallowMount } from '@vue/test-utils';
import swCharacters from '../components/StarWarsCharacters.vue';

describe("Iniciando os testes...", () => {

    const wrapper = shallowMount(swCharacters);
    const vm = wrapper.vm;

    test("... testando se existem 10 personagens carregados.", () => {

        vm.GetRandomCharacters();
        expect(vm.sw_characters.length).toBe(10);

    })

})