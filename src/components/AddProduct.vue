<script setup lang="ts">
import { type Ref, ref, computed } from 'vue'
import { type Product } from '../scripts/product.ts'
import { loadImg } from '../scripts/utils'
import {MIN,MAX} from '../components/Counter.vue'

import Counter from './Counter.vue';


const emit = defineEmits(['form-submitted'])

let valid: boolean = false

let imageUrlValid: Ref<boolean> = ref(true)
let nameValid: Ref<boolean> = ref(true)
let descValid: Ref<boolean> = ref(true)

let name: Ref<string> = ref("")
let desc: Ref<string> = ref("")
let imageUrl: Ref<string> = ref("")

let quantity: number = 1


let productNameError: Ref<string> = ref("")
let productDescriptionError: Ref<string> = ref("")
let imageUriError: Ref<string> = ref("")
let quantityError: Ref<string> = ref("")



function isBlank(value: string) {
    if (value.trim() === "") {
        return true
    }
    return false
}

const checkForEmptyFields = computed(() => {
    if (isBlank(name.value) || isBlank(desc.value) || isBlank(imageUrl.value)) {
        return true
    }
    return false
})

async function isImageValid(): Promise<boolean> {
    try {
        await loadImg(imageUrl.value)
    } catch (err: unknown) {
        return false
    }
    return true
}

async function validateForm() {
    productNameError.value = ""
    productDescriptionError.value = ""
    imageUriError.value = ""
    quantityError.value = ""

    valid = true
    if (name.value.trim().length < 2) {
        nameValid.value = false
        valid = false
        productNameError.value += "Le nom du produit ne doit pas être inférieur à 2 charactères!"
    } else if(name.value.trim().length > 20){
        productNameError.value += "Le nom du produit ne doit pas être supérieur à 20 charactères!"
        nameValid.value = false
        valid = false
    } else {
        nameValid.value = true
    }

    if (desc.value.trim().length < 5) {
        descValid.value = false
        valid = false
        productDescriptionError.value += "La description du produit ne doit pas être inférieur à 5 charactères!"
    } else {
        descValid.value = true
    }

    await isImageValid().then((isValid) => {
        imageUrlValid.value = isValid
        if (!isValid) { valid = false; imageUriError.value += "Impossible de récupérer une image à partir de cet URI!" }
        
    })

    if(quantity < MIN || quantity > MAX){
        quantityError.value += "La quantity doit être entre " + MIN + " et " + MAX + "!"
    }
}

function onQuanityChange(newQuantity: number) {
    quantity = newQuantity
}

async function onSubmit() {
    await validateForm()

    if (valid) {
        const product: Product = {
            id: crypto.randomUUID(),
            name: name.value,
            description: desc.value,
            imageUrl: imageUrl.value,
            quantity: quantity,
            showDetails: false
        }

        emit('form-submitted', [product])
    }

}
</script>

<template>
    <form class="card shadow rounded-4 border-2 p-5 m-0" @submit.prevent="onSubmit()" @keydown.enter.prevent novalidate>
        <h2 class="card-title align-self-center pb-3">Créer un produit</h2>
        <div class="row mb-3">
            <div class="col">
                <label for="product-name" class="form-label">Nom du produit</label>
                <input v-model="name" id="product-name" :class="{ 'is-invalid': !nameValid }" class="form-control"
                    type="text">
            </div>
            <span class="form-error">{{ productNameError }}</span>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="product-desc" class="form-label">Description</label>
                <textarea style="resize: none;" v-model="desc" id="product-desc" :class="{ 'is-invalid': !descValid }"
                    class="form-control" rows="6" cols="30"> </textarea>
            </div>
            <span class="form-error">{{ productDescriptionError }}</span>
        </div>
        <div class="row mb-3">
            <div class="col">
                <label for="product-img" class="form-label">URI de l'image</label>
                <input v-model="imageUrl" id="product-img" :class="{ 'is-invalid': !imageUrlValid }" class="form-control"
                    type="text">
            </div>
            <span class="form-error">{{ imageUriError }}</span>
        </div>

        <div class="row mb-3">
            <div class="col d-flex justify-content-between input-group">
                <label for="product-quantity">Quantité:</label>
                <Counter @on-change="onQuanityChange" />
            </div>
            <span class="form-error">{{ quantityError }}</span>
        </div>

        <div class="row">
            <div class="col">
                <button :class="{ disabled: checkForEmptyFields }" class="btn btn-primary w-100 m-auto" type="submit">Add
                    product</button>
            </div>
        </div>
    </form>
</template>

<style scoped>
form{
    position: sticky;
    top: 1px;
}
.form-error {
    color: rgb(204, 0, 0);
}</style>