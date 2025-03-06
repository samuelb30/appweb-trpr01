<script setup lang="ts">
import { type Ref, ref } from 'vue'

import { type Product } from './scripts/product';
import AddProduct from './components/AddProduct.vue';
import ListProducts from './components/ListProducts.vue'

let products: Ref<Product[]> = ref([])

function getProduct(newProduct: Product[]) {
    products.value.push(newProduct[0])
}
function deleteProduct(productId: String){
    products.value = products.value.filter(product => product.id !== productId)
}
function duplicateProduct(productId: String){
    for(let i = 0; i < products.value.length; i++){
        if(products.value[i].id === productId){
            products.value.push({
                id: crypto.randomUUID(),
                name: products.value[i].name,
                description: products.value[i].description,
                imageUrl: products.value[i].imageUrl,
                quantity: products.value[i].quantity
            })
        }
    }
}


</script>


<template>
    <div class="container ps-4 m-0">
        <div class="row w-100 h-100 pt-5">
            <div class="col-sm-12 col-lg-4">
                <AddProduct @form-submitted="getProduct" />
            </div>
            <div class="col-lg-8 m-auto">
                <ListProducts :products="products" @on-delete="deleteProduct" @on-duplicate="duplicateProduct"/>
            </div>
        </div>
    </div>
</template>

<style>
body{
    background-color: grey;
}
AddProduct{
    width: 30%;
}
</style>
