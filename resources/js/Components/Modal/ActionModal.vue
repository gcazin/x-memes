<script setup>
import Modal from '@/Components/Modal/Modal.vue'
import formService from '@/Services/form.service.js'

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    item: {
        type: Object,
    },
    form: {
        type: Object,
        required: true,
    },
})

const createItem = () => {
    props.form.post(route(`${props.route}.store`), {
        preserveScroll: true,
        onSuccess: () => formService.closeModal(props.name),
        onFinish: () => form.reset(),
    })
}

const updateItem = (item) => {
    props.form.put(route(`${props.route}.update`, item.id), {
        preserveScroll: true,
        onSuccess: () => formService.closeModal(props.name, item),
        onFinish: () => props.form.reset(),
    })
}

const deleteItem = (item) => {
    props.form.delete(route(`${props.route}.destroy`, item.id), {
        preserveScroll: true,
        onSuccess: () => formService.closeModal(props.name, item),
    })
}
</script>
<template>
    <!-- Create modal -->
    <Modal
        v-if="type === 'create'"
        :id="`${name}Modal`"
        :title="`Ajouter un élément`"
    >
        <template #description>
            <slot />
        </template>
        <form @submit.prevent="createItem">
            <button class="btn btn-primary" :disabled="form.processing">
                Ajouter
            </button>
        </form>
    </Modal>

    <!-- Update modal -->
    <Modal
        v-if="type === 'edit'"
        :id="`${name}Modal${item.id}`"
        :title="`Modifier l'élément`"
    >
        <template #description>
            <slot />
        </template>
        <form @submit.prevent="updateItem(item)">
            <button class="btn btn-info" :disabled="form.processing">
                Éditer
            </button>
        </form>
    </Modal>

    <!-- Delete tag modal -->
    <Modal
        v-if="type === 'delete'"
        :id="`${name}Modal${item.id}`"
        :title="`Supprimer l'élément`"
    >
        <template #description>
            Cette action est irreversible, êtes-vous sûr de vouloir continuer ?
        </template>
        <form @submit.prevent="deleteItem(item)">
            <button class="btn btn-error" :disabled="form.processing">
                Supprimer
            </button>
        </form>
    </Modal>
</template>
