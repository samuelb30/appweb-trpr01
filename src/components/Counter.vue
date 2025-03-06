<script lang="ts">
    export const MIN = 1
    export const MAX = 100
</script>
<script setup lang="ts">
import {type Ref, ref, computed} from 'vue'

const checkMinMax = computed(() =>{
    if(number.value < MIN){
        number.value = MIN
    }else if(number.value > MAX){
        number.value = MAX
    }
})

let number: Ref<number> = ref(1)

const emit = defineEmits(['on-change'])


</script>

<template>
    <div class="row mb-3">
        <div class="col d-flex justify-content-between input-group">
            <button @click="{number-=1; checkMinMax; emit('on-change', number)}" class="btn bg-dark-subtle input-group-text" type="button">-</button>
                <input v-model="number" @change="{checkMinMax; emit('on-change', number)}" class="form-control text-center" min="1" max="100" type="number" value=1>
            <button @click="{number+=1; checkMinMax; emit('on-change', number)}" class="btn bg-dark-subtle input-group-text" type="button">+</button>
        </div>
    </div>
</template>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
button{
    width: 40px;
}
</style>