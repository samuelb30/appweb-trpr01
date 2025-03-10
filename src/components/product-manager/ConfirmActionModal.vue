<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

const props = defineProps<{
    title: string;
    body: string;
    show: boolean;
}>();

const emit = defineEmits(['update:show', 'acceptResponse']);

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
</script>


<template>
    <div ref="modalElement" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>{{ body }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Refuser</button>
                    <button @click="emit('acceptResponse', true)" type="button" class="btn btn-success" data-bs-dismiss="modal">Accepter</button>
                </div>
            </div>
        </div>
    </div>
</template>
