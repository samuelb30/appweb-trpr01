<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Product } from '../../scripts/product';
import ConfirmActionModal from './ConfirmActionModal.vue'
import EditProductModal from './EditProductModal.vue';


enum Event {
    EDIT,
    DUPLICATE,
    DELETE,
    EXPAND
}
let event: Event = Event.EDIT
const emit = defineEmits(['on-edit', 'on-duplicate', 'on-delete', 'on-expand'])

const props = defineProps<{
    product: Product
}>()
let _product = ref(props.product)
function emitProduct() {
    switch (event) {
        case Event.EDIT:
            emit('on-edit', _product.value)
            break
        case Event.DUPLICATE:
            emit('on-duplicate', _product.value.id)
            break
        case Event.DELETE:
            emit('on-delete', _product.value.id)
            break
        case Event.EXPAND:
            emit('on-expand', _product.value.id)
            break
    }
}
const getBadge = computed(() => {
    if (props.product.quantity <= 0) {

    } else if (props.product.quantity < 5) {
        return "text-bg-danger"
    } else if (props.product.quantity < 10) {
        return "text-bg-warning"
    } else {
        return "text-bg-success"
    }
})

const deleteModalVisible = ref(false);
const deleteModalContent = ref({ title: '', body: '' });

const editModalVisible = ref(false);

function displayDeleteConfirmation() {
    deleteModalContent.value.title = "Supression d'un produit";
    deleteModalContent.value.body = "Êtes-vous sûr de vouloir surprimer le produit: " + props.product.name + '?';
    deleteModalVisible.value = true;
}
function displayEdit(){
    editModalVisible.value = true
}

function getProduct(newProduct: Product) {
    event = Event.EDIT; 
    _product.value = newProduct
    editModalVisible.value = false; 
    emitProduct()
}
</script>

<template>
    <ConfirmActionModal @accept-response="event = Event.DELETE; emitProduct()" v-model:show="deleteModalVisible"
        :title="deleteModalContent.title" :body="deleteModalContent.body" />
    <EditProductModal @accept-response="getProduct" v-model:show="editModalVisible" :product="_product" />
    <li style=" overflow: hidden;" class="list-group-item rounded-4 border-2 m-2 p-0">



        <button class="d-flex justify-content-between btn btn-light w-100 p-0 pe-2"
            @click="event = Event.EXPAND; emitProduct()" type="button">
            <img class="product-img w-25 align-self-start" :src="_product.imageUrl" :alt="_product.name">
            <div class="container w-75 ps-4 pe-4 pt-2 pb-2">
                <div class="row">
                    <div class="d-flex justify-content-between">
                        <h6 class="align-self-start"><u><b>Nom:</b></u></h6>
                        <p class="align-self-start"> {{ _product.name }}</p>
                        <span class="badge" :class="getBadge">{{ _product.quantity }}</span>
                    </div>
                </div>
                <div class="row border border-secondary-subtle border-2 rounded-2">
                    <p class="pt-1"><u><b>Description</b></u></p>
                    <p>{{_product.description }}</p>
                </div>
            </div>

        </button>


        <div class="d-flex justify-content-around bg-secondary button-group w-100 ">
            <button @click="displayEdit()"
                class="w-100 h-100 btn btn-secondary p-1 border-end rounded-start">
                ✏️
            </button>
            <button @click="{ event = Event.DUPLICATE; emitProduct() }"
                class="w-100 h-100 btn btn-secondary p-1 border-start border-end">
                <img src="../../assets/duplication-icon.svg" alt="duplicate" width="25px">
            </button>
            <button @click="displayDeleteConfirmation()" class="w-100 h-100 btn btn-secondary p-1 border-start">
                ❌
            </button>
        </div>



    </li>
</template>


<style scoped>
.product-img {
    width: 250px;
    object-fit: contain;
    overflow: hidden;
}

.button-group {
    object-fit: cover;
    overflow: hidden;
}
</style>