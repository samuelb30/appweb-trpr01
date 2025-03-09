<script setup lang="ts">
import type { Product } from '../scripts/product';
import DetailedProduct from './DetailedProduct.vue';
import ProductListItem from './ProductListItem.vue';

const props = defineProps<{
    products: Product[]
}>()
const emit = defineEmits(['on-edit', 'on-duplicate', 'on-delete', 'on-expand'])

function onDelete(productId: String){
    emit('on-delete', productId)    
}
function onDuplicate(productId: String){
    emit('on-duplicate', productId)
}
function onExpand(productId: String){
    emit('on-expand', productId)
}
function onEdit(product: Product){
    emit('on-edit', product)
}

</script>

<template>
    <div class="card p-5 m-0 rounded-4 shadow">
        <h2>Produits</h2>
        <ul class="list-group list-group-flush">
            <template v-for="product in props.products" :key="product.id">
                <template v-if="product.showDetails">
                    <DetailedProduct :product="product" @on-delete="onDelete" @on-duplicate="onDuplicate" @on-edit="onEdit" @on-expand="onExpand"/>
                </template>
                <template v-else>
                    <ProductListItem :product="product" @on-delete="onDelete" @on-duplicate="onDuplicate" @on-edit="onEdit" @on-expand="onExpand"/>
                </template>
            </template>
        </ul>
    </div>
</template>

<style scoped>
.card{
    min-width: 650px;
}


</style>