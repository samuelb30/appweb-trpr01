<script setup lang="ts">

import type { Product } from '../../scripts/product';
import DetailedProduct from './DetailedProduct.vue';
import ProductListItem from './ProductListItem.vue';

import {ref,type Ref,watch,onMounted} from 'vue'

const props = defineProps<{
    products: Product[]
}>()

let currentProducts = ref(props.products)

let searchedProducts: Ref<Product[]> = ref([])

let searchString = ref("")

let showSearch = ref(false)

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

function search(){
    if(searchString.value.trim().length > 0){
        searchedProducts.value = props.products.filter((product) => {return product.name.toLocaleLowerCase().includes(searchString.value.toLocaleLowerCase())})
        currentProducts.value = searchedProducts.value
        showSearch.value = true
    }else {
        currentProducts.value = props.products
        showSearch.value = false
    }
}

function convertProductsToCSV(products: Product[]): string {
    if (products.length === 0) {
        return "";
    }

    const headers = "id,name,description,URI de l'image,quantity";

    const rows = products.map(product =>
        `"${product.id}","${product.name}","${product.description}","${product.imageUrl}","${product.quantity}"`
    );

    return "\uFEFF" + [headers, ...rows].join("\n");
}

onMounted(() => {
    const exportButton = document.getElementById("exportCsv");
    if (exportButton) {
        exportButton.addEventListener("click", downloadCSV);
    }
})

function downloadCSV() {
    const csv = convertProductsToCSV(currentProducts.value);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const fileHandle = document.createElement("a");
    fileHandle.href = URL.createObjectURL(blob);
    fileHandle.setAttribute("download", "products.csv");

    fileHandle.click();
    URL.revokeObjectURL(fileHandle.href);
}

watch(() => props.products, (newProducts) => {
    if (searchString.value.trim().length > 0) {
        searchedProducts.value = newProducts.filter((product) =>
            product.name.toLocaleLowerCase().includes(searchString.value.toLocaleLowerCase())
        );
        currentProducts.value = searchedProducts.value;
    } else {
        currentProducts.value = [...newProducts];
    }
}, { deep: true });
</script>

<template>
    <div class="card p-5 m-0 rounded-4 shadow">
        <h2>Produits</h2>
        <div class="input-group mb-3">
            <input 
                type="text"
                class="form-control"
                placeholder="Rechercher un produit..."
                v-model="searchString"
                @input="search"
            >
            <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
        <ul class="list-group list-group-flush">
            <template v-for="product in currentProducts" :key="product.id">
                <template v-if="product.showDetails">
                    <DetailedProduct :product="product" @on-delete="onDelete" @on-duplicate="onDuplicate" @on-edit="onEdit" @on-expand="onExpand"/>
                </template>
                <template v-else>
                    <ProductListItem :product="product" @on-delete="onDelete" @on-duplicate="onDuplicate" @on-edit="onEdit" @on-expand="onExpand"/>
                </template>
            </template>
        </ul>
        <span id="exportCsv" class="w-100 d-flex justify-content-end pt-2"><button class="btn btn-primary">Exporter en CSV</button></span>
    </div>
</template>

<style scoped>
.card{
    min-width: 650px;
}


</style>