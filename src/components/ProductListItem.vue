<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Product } from '../scripts/product';
import ConfirmActionModal from '../components/ConfirmActionModal.vue'
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
    if (props.product.quantity < 5) {
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

        <div class="d-flex justify-content-between">

            <button class="d-flex justify-content-between btn btn-light w-100 p-0 pe-2"
                @click="event = Event.EXPAND; emitProduct()" type="button">
                <img class="product-img-small " :src="_product.imageUrl" :alt="_product.name">
                <h5 class="align-self-center">{{ _product.name }}</h5>
                <span class="badge align-self-center" :class="getBadge">{{ _product.quantity }}</span>
            </button>
            <div class="d-flex justify-content-around bg-secondary button-group w-25 ">
                <button @click="displayEdit()"
                    class="w-100 h-100 btn btn-secondary p-1 border-end rounded-start">
                    ✏️
                </button>
                <button @click="{ event = Event.DUPLICATE; emitProduct() }"
                    class="w-100 h-100 btn btn-secondary p-1 border-start border-end">
                    <img src="../assets/duplication-icon.svg" alt="duplicate" width="25px">
                </button>
                <button @click="displayDeleteConfirmation()" class="w-100 h-100 btn btn-secondary p-1 border-start">
                    ❌
                </button>
            </div>
        </div>

    </li>
</template>

<style>
.badge {
    height: 25px;
}
</style>
<style scoped>
.product-img-small {
    height: 100%;
    width: auto;
    max-height: 40px;
    object-fit: contain;
    overflow: hidden;
}

.button-group {
    object-fit: cover;
    overflow: hidden;
}
</style>