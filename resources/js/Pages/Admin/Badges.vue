<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import TextInput from "@/Components/Elements/Form/TextInput.vue";
import Modal from "@/Components/Elements/Modal/Modal.vue";
import InputError from "@/Components/Elements/Form/InputError.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import Card from "@/Components/Misc/Card.vue";
import Textarea from "@/Components/Elements/Form/Textarea.vue";
import ActionButton from "@/Components/Elements/Button/ActionButton.vue";
import formService from "@/Services/form.service.js";
import Stack from "@/Components/Layout/Stack.vue";

defineProps({
    badges: {
        type: Array
    },
})

const form = useForm({
    name: null,
    description: null,
    condition: null
})

formService
    .setForm(form)
    .setRouteName('admin.badge')
</script>

<template>
    <AdminDashboardLayout title="Badges">
        <Stack>
            <div class="flex justify-end">
                <button class="btn btn-primary" @click="formService.openModal('createBadge')">Ajouter un badge</button>

                <!-- Modal -->
                <Modal id="createBadgeModal" title="Ajouter un badge">
                    <form @submit.prevent="formService.handle('store')">
                        <TextInput label="Nom" v-model="form.name"/>
                        <InputError :message="form.errors.name" />

                        <Textarea label="Description" v-model="form.description"/>
                        <InputError :message="form.errors.description" />

                        <TextInput label="Condition" type="number" v-model="form.condition"></TextInput>
                        <InputError :message="form.errors.condition" />

                        <div class="mt-4">
                            <button class="btn btn-primary" :disabled="form.processing">
                                Ajouter le badge
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>

            <Card title="Nombres de badges" :is-link="false" has-background>
                {{ badges.length }}
            </Card>

            <Table
                :headers="['Nom', 'Condition', 'Décerné à']"
                :items="badges"
                :properties="['name', 'condition', 'users']"
                has-action
                has-background
            >
                <template #users="{ users }">
                    {{ users.length }} utilisateurs
                </template>
                <template #actions="item">
                    <ActionButton type="edit" @click="formService.openModal('editBadge', item)"/>

                    <!-- Edit tag modal -->
                    <Modal :id="`editBadgeModal${item.id}`" :title="`Éditer le tag ${item.name}`">
                        <form @submit.prevent="formService.handle('update', item)">
                            <TextInput label="Nom" v-model="form.name" />
                            <InputError :message="form.errors.name" />

                            <Textarea label="Description" v-model="form.description" />
                            <InputError :message="form.errors.description" />

                            <TextInput type="number" label="Condition" v-model="form.condition" />
                            <InputError :message="form.errors.condition" />

                            <button class="btn btn-primary mt-4" :disabled="form.processing">
                                Modifier le badge
                            </button>
                        </form>
                    </Modal>

                    <ActionButton type="delete" @click="formService.handle('destroy', item)" />
                </template>
            </Table>
        </Stack>
    </AdminDashboardLayout>
</template>
