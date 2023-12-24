<script setup>
import ActionButton from '@/Components/Elements/Button/ActionButton.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Card from '@/Components/Misc/Card.vue'
import AdminDashboardLayout from '@/Pages/Admin/Layout/AdminDashboardLayout.vue'
import Table from '@/Pages/Admin/Partials/Table.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'

defineProps({
    tags: {
        type: Array,
    },
})

const form = useForm({
    name: null,
})

formService.setForm(form).setRouteName('admin.tag')
</script>

<template>
    <AdminDashboardLayout title="Tags">
        <Stack>
            <div class="flex justify-end">
                <button
                    class="btn btn-primary"
                    @click="formService.openModal('createTag')"
                >
                    Ajouter un tag
                </button>
            </div>

            <!-- Modal -->
            <Modal id="createTagModal" title="Ajouter un badge">
                <form @submit.prevent="formService.handle('store')">
                    <TextInput label="Nom" v-model="form.name" />

                    <InputError :message="form.errors.name" />

                    <div class="mt-4">
                        <button
                            class="btn btn-primary"
                            :disabled="form.processing"
                        >
                            Ajouter le tag
                        </button>
                    </div>
                </form>
            </Modal>

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
                    {{ name }}
                </template>
                <template #actions="item">
                    <ActionButton
                        type="edit"
                        @click="formService.openModal('editTag', item)"
                    />

                    <!-- Edit tag modal -->
                    <Modal
                        :id="`editTagModal${item.id}`"
                        :title="`Modifier le tag ${item.name}`"
                    >
                        <form
                            @submit.prevent="formService.handle('update', item)"
                        >
                            <TextInput label="Nom" v-model="form.name" />
                            <InputError :message="form.errors.name" />

                            <button
                                class="btn btn-primary mt-4"
                                :disabled="form.processing"
                            >
                                Éditer le tag
                            </button>
                        </form>
                    </Modal>

                    <ActionButton
                        type="delete"
                        @click="formService.handle('destroy', item)"
                    />
                </template>
            </Table>
        </Stack>
    </AdminDashboardLayout>
</template>
