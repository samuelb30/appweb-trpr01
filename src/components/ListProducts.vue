<script setup lang="ts">
import type { Product } from '../scripts/product';
import ProductListItem from './ProductListItem.vue';

const props = defineProps<{
    products: Product[]
}>()
const emit = defineEmits(['on-edit', 'on-duplicate', 'on-delete'])

function onDelete(productId: String){
    emit('on-delete', productId)    
}
function onDuplicate(productId: String){
    emit('on-duplicate', productId)
}
</script>

<template>
    <div class="card p-5 m-0 rounded-4 shadow">
        <h2>Produits</h2>
        <ul class="list-group list-group-flush ">
            <template v-for="product in props.products" :key="product.id">
                <ProductListItem :product="product" @on-delete="onDelete" @on-duplicate="onDuplicate" @on-edit=""/>
            </template>
        </ul>
    </div>
</template>

<style scoped>



</style>