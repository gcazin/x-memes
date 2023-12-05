<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import TextInput from "@/Components/TextInput.vue";
import {ref} from "vue";
import Modal from "@/Components/Modal.vue";
import InputError from "@/Components/InputError.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import Card from "@/Components/Card.vue";
import FormService from "@/Services/form.service.js";

defineProps({
    tags: {
        type: Array
    },
})

const form = new FormService()
form
    .setFields({
        name: null
    })
    .setBaseRoute('admin.tag')
    .setSubPropertyValue('name:name.en')
    .setModalName('tag')
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout title="Tags">
        <div class="flex justify-end mb-4">
            <button class="btn btn-primary" @click="form.openModal('create')">Ajouter un tag</button>
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
                    @click="form.openModal('update', item)"
                >
                    <ion-icon name="create-outline"></ion-icon>
                </span>

                <!-- Edit tag -->
                <Modal :id="`updateTag${item.id}`" :title="`Éditer le tag`">
                    <form @submit.prevent="form.setUpdate(item)">
                        {{ form }}
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
                    @click="form.openModal('delete', item)"
                >
                   <ion-icon name="trash-outline"></ion-icon>
                </span>

                <!-- Delete tag -->
                <Modal :id="`deleteTag${item.id}`" :title="`Supprimer le tag ${item.name.en}`">
                    <form @submit.prevent="form.crud.delete">
                        <div class="mt-4">
                            <button class="btn btn-error" :disabled="form.processing">
                                Confirmer la suppression du tag {{ form.name }}
                            </button>
                        </div>
                    </form>
                </Modal>
            </template>
        </Table>

        <!-- Create tag -->
        <Modal id="createTag" title="Ajouter un tag">
            <form @submit.prevent="form.crud.create">
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
