<script setup lang="ts">
import { type Ref, ref, watch} from 'vue'

import { type Product } from '../../scripts/product';
import AddProduct from './AddProduct.vue';
import ListProducts from './ListProducts.vue'
import { initialProducts } from '../../scripts/product';
import LowStockModal from './LowStockModal.vue'

let products: Ref<Product[]> = ref(initialProducts)


function getProduct(newProduct: Product) {
    products.value.push(newProduct)
}
function deleteProduct(productId: String){
    products.value = products.value.filter(product => product.id != productId)
}
function duplicateProduct(productId: String){
    for(let i = 0; i < products.value.length; i++){
        if(products.value[i].id === productId){
            products.value.push({
                id: crypto.randomUUID(),
                name: products.value[i].name,
                description: products.value[i].description,
                imageUrl: products.value[i].imageUrl,
                quantity: products.value[i].quantity,
                showDetails: false,
                hasBeenNotified: false
            })
        }
    }
}
function expandProduct(productId: String){
    for(let i = 0; i < products.value.length; i++){
        if(products.value[i].id === productId){
            products.value[i].showDetails = !products.value[i].showDetails
        }else {
            products.value[i].showDetails = false
        }
    }
}

function editProduct(product: Product){
    for(let i = 0; i < products.value.length; i++){
        if(products.value[i].id === product.id){
            console.log(product)
            products.value[i].name = product.name
            products.value[i].description = product.description
            products.value[i].imageUrl = product.imageUrl
            products.value[i].quantity = product.quantity
            products.value[i].hasBeenNotified = false
        }
    }

} 
let productLowInStock = ref("") 
let isAProductLowInStock = ref(false) 
watch(() => products.value, (products) => {
    products.forEach(product=>{
        if(product.quantity <= 4 && product.hasBeenNotified == false){
            productLowInStock.value = product.name
            isAProductLowInStock.value = true
            product.hasBeenNotified = true
        }
    })
}, { deep: true });
</script>


<template>
    
    <div class="container ps-4">
        <LowStockModal @update:show="isAProductLowInStock=false" :productName="productLowInStock" :show="isAProductLowInStock"/>
        <div class="d-flex row w-100 h-100 pt-5 justify-content-center">
            <div class="col-sm-12 col-lg-4 pb-5">
                <AddProduct @form-submitted="getProduct" title="Ajouter un produit" confirm-button-name="Ajouter le produit"/>
            </div>
            <div class="col-lg-8 pb-5">
                <ListProducts :products="products" @on-delete="deleteProduct" @on-duplicate="duplicateProduct" @on-expand="expandProduct" @on-edit="editProduct"/>
            </div>
        </div>
    </div>
</template>

<style>
body{
    background-color: grey;
}

</style>
