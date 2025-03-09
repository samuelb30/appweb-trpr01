<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const props = defineProps<{
    productName: string;
    show: boolean;
}>();

const emit = defineEmits(['update:show']);

const modalElement = ref<HTMLElement | null>(null);
let bsModal: Modal | null = null;

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

const closeModal = () => {
    bsModal?.hide();
};
</script>

<template>
    <div ref="modalElement" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-warning">
                    <h5 class="modal-title">⚠️ Alerte de stock faible</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <p>Le produit <strong>{{ props.productName }}</strong> est en faible quantité. Pensez à renouveler le stock bientôt.</p>
                </div>
                <div class="modal-footer">
                    <button data-bs-dismiss="modal" type="button" class="btn btn-primary" @click="closeModal">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>