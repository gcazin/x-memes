<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import TextInput from "@/Components/TextInput.vue";
import {ref} from "vue";
import Modal from "@/Components/Modal.vue";
import InputError from "@/Components/InputError.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import Card from "@/Components/Card.vue";
import Toast from "@/Components/Toast.vue";


defineProps({
    tags: {
        type: Array
    },
})
const form = useForm({
    name: null
})

const addTag = () => {
    form.post(route('admin.tag.create'), {
        preserveScroll: true,
        onSuccess: () => closeModal('create'),
        onFinish: () => form.reset(),
    });
};

const editTag = (item) => {
    console.log(item)
    form.post(route('admin.tag.update', item.id), {
        preserveScroll: true,
        onSuccess: () => closeModal('edit', item),
        onFinish: () => form.reset(),
    });
};

const deleteTag = (item) => {
    form.delete(route('admin.tag.destroy', item.id), {
        preserveScroll: true,
        onSuccess: () => closeModal('delete', item),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};

const handleSelector = (name, item = null) => {
    let selector = `#${name}TagModal`
    if (item) {
        selector = `#${name}TagModal${item.id}`
    }
    return selector
}

const openModal = (name, item = null) => {
    let selector = handleSelector(name, item)
    document.querySelector(selector).showModal()

    if (name === 'edit') {
        form.name = item.name.en
    }
}

const closeModal = (name, item = null) => {
    let selector = handleSelector(name, item)
    console.log(selector)
    document.querySelector(selector).close()

    form.reset();
};
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout title="Tags">
        <div class="flex justify-end mb-4">
            <button class="btn btn-primary" @click="openModal('create')">Ajouter un tag</button>
        </div>

        <Card title="Nombres de tags" :is-link="false" has-background>
            {{ tags.length }}
        </Card>

        <Table
            :headers="['Nom']"
            :items="tags"
            :properties="['name']"
            has-action
            has-background
        >
            <template #name="{ name }">
                {{ name.en }}
            </template>
            <template #actions="item">
                <span
                    class="hover:text-green-500 cursor-pointer text-2xl transition"
                    @click="openModal('edit', item)"
                >
                    <ion-icon name="create-outline"></ion-icon>
                </span>

                <!-- Edit tag modal -->
                <Modal :id="`editTagModal${item.id}`" :title="`Éditer le tag ${item.name.en}`">
                    <form @submit.prevent="editTag(item)">
                        <TextInput
                            v-model="form.name"
                        />

                        <InputError :message="form.errors.name" />

                        <div class="mt-4">
                            <button class="btn btn-primary" :disabled="form.processing">
                                Éditer le tag
                            </button>
                        </div>
                    </form>
                </Modal>

                <span
                    class="hover:text-red-500 cursor-pointer text-2xl transition"
                    @click="openModal('delete', item)"
                >
                    <ion-icon name="trash-outline"></ion-icon>
                </span>

                <!-- Delete tag modal -->
                <Modal :id="`deleteTagModal${item.id}`" title="Supprimer le tag">
                    <template #description>
                        Êtes-vous sûr de supprimer le tag {{ item.name.en }} ?
                    </template>
                    <form @submit.prevent="deleteTag(item)">
                        <button class="btn btn-error" :disabled="form.processing">
                            Supprimer le tag
                        </button>
                    </form>
                </Modal>
            </template>
        </Table>

        <!-- Create tag -->
        <Modal id="createTagModal" title="Ajouter un tag">
            <form @submit.prevent="addTag" >
                <TextInput
                    v-model="form.name"
                />

                <InputError :message="form.errors.name" />

                <div class="mt-4">
                    <button class="btn btn-primary" :disabled="form.processing">
                        Ajouter le tag
                    </button>
                </div>
            </form>
        </Modal>
    </AdminDashboardLayout>
</template>
