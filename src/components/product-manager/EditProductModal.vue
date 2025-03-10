<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import type { Product } from '../../scripts/product';
import AddProduct from './AddProduct.vue';

const props = defineProps<{
    product: Product
    show: boolean;
}>();
const emit = defineEmits(['update:show', 'acceptResponse']);

const modalElement = ref<HTMLElement | null>(null);
let bsModal: Modal | null = null;

let currentProduct = ref(props.product)


watch(() => props.show, (newValue) => {
    if (newValue) {
        bsModal?.show();
    } else {
        bsModal?.hide();
    }
});

onMounted(() => {
    if (modalElement.value) {
        bsModal = new Modal(modalElement.value);
        modalElement.value.addEventListener('hidden.bs.modal', () => {
            emit('update:show', false);
        });
    }
});

function getProduct(newProduct: Product){
    newProduct.id = props.product.id
    emit('acceptResponse', newProduct)
}




</script>


<template>
    <div ref="modalElement" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modification de {{currentProduct.name}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <AddProduct @form-submitted="getProduct" :product="currentProduct" title="" confirm-button-name="Modifier le produit"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>
