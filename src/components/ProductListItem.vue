<script setup lang="ts">
import { type Product } from '../scripts/product';

enum Event{
    EDIT,
    DUPLICATE,
    DELETE
}
let event: Event = Event.EDIT
const emit = defineEmits(['on-edit', 'on-duplicate', 'on-delete'])

const props = defineProps<{
    product: Product
}>()
let product = props.product
function emitProduct(){
    switch(event){
        case Event.EDIT:
            emit('on-edit',product.id)
            break
        case Event.DUPLICATE:
            emit('on-duplicate',product.id)
            break
        case Event.DELETE:
            emit('on-delete',product.id)
            break
    }
}
</script>

<template>
    <li style=" overflow: hidden;" class="list-group-item rounded-4 border-2 m-2 p-0">
        <div class="d-flex justify-content-between">
            <img class="product-img-small" :src="props.product.imageUrl" :alt="props.product.name">
            <h5>{{product.quantity}}</h5>
            <h5 class="align-self-center">{{ props.product.name }}</h5>
            <div class="bg-secondary button-group">
                <button @click="{event = Event.EDIT; emitProduct()}" class="h-100 btn btn-secondary p-1 border-end rounded-start">
                    ✏️
                </button>
                <button @click="{event = Event.DUPLICATE; emitProduct()}" class="h-100 btn btn-secondary p-1 border-start border-end">
                    <img src="../assets/duplication-icon.svg" alt="duplicate" width="25px">
                </button>
                <button @click="{event = Event.DELETE; emitProduct()}" class="h-100 btn btn-secondary p-1 border-start">
                    ❌
                </button>
            </div>
        </div>
    </li>
</template>

<style scoped>
.product-img-small {
    width: 50px;
    object-fit: cover;
    overflow: hidden;
}
.button-group{
    object-fit: cover;
    overflow: hidden;
}
</style>