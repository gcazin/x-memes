<script setup>
import ActionButton from '@/Components/Button/ActionButton.vue'
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import Select from '@/Components/Form/Select.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Textarea from '@/Components/Form/Textarea.vue'
import Card from '@/Components/Misc/Card.vue'
import Modal from '@/Components/Modal/Modal.vue'
import Pagination from '@/Components/Table/Pagination.vue'
import Table from '@/Components/Table/Table.vue'
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'

const props = defineProps({
    users: {
        type: Array,
    },
    roles: {
        type: Array,
    },
})

const form = useForm({
    username: null,
    description: null,
    roles: [],
})

const deleteUser = (id) => {
    form.delete(route('user.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    })
}

formService.setForm(form).setRouteName('admin.user')
</script>

<template>
    <AdminDashboardLayout title="Utilisateurs">
        <Stack>
            <Card
                title="Nombres d'utilisateurs"
                :is-link="false"
                has-background
            >
                {{ users.total }}
            </Card>

            <Table
                :headers="[
                    `Nom d'utilisateur`,
                    'Adresse e-mail',
                    'Rôles',
                    `Date d'inscription`,
                ]"
                :items="users.data"
                :properties="['username', 'email', 'role', 'created_at']"
                has-action
                has-background
            >
                <template #role="{ roles }">
                    {{ roles.map((role) => role.name).join(', ') }}
                </template>
                <template #actions="item">
                    <ActionButton
                        type="edit"
                        @click="formService.openModal('editUser', item)"
                    />

                    <Modal
                        :id="`editUserModal${item.id}`"
                        :title="`Modifier l'utiliteur ${item.username}`"
                    >
                        <form
                            @submit.prevent="formService.handle('update', item)"
                        >
                            <Stack spacing="2">
                                <TextInput
                                    label="Nom d'utilisateur"
                                    v-model="form.username"
                                />

                                <Textarea
                                    label="Description"
                                    v-model="form.description"
                                />

                                <Select
                                    label="Rôles"
                                    v-model="form.roles"
                                    :options="roles"
                                />
                            </Stack>

                            <LoadingButton
                                class="mt-4"
                                :loading="form.processing"
                            >
                                Mettre à jour
                            </LoadingButton>
                        </form>
                    </Modal>

                    <ActionButton
                        type="delete"
                        @click="formService.handle('destroy', item)"
                    />
                </template>
            </Table>

            <Pagination :item="users" />
        </Stack>
    </AdminDashboardLayout>
</template>
