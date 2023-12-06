<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import Card from "@/Components/Misc/Card.vue";
import ActionButton from "@/Components/Elements/Button/ActionButton.vue";
import formService from "@/Services/form.service.js";
import DeleteModal from "@/Components/Elements/Modal/ActionModal.vue";

defineProps({
    users: {
        type: Array
    },
})

const form = useForm({})

const deleteUser = (id) => {
    form.delete(route('user.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout title="Utilisateurs">
        <Card title="Nombres d'utilisateurs" :is-link="false" has-background>
            {{ users.length }}
        </Card>

        <Table
            :headers="['Nom', 'Adresse e-mail', 'Rôles', `Date d'inscription`]"
            :items="users"
            :properties="['name', 'email', 'role', 'created_at']"
            has-action
            has-background
        >
            <template #role="{ roles }">
                {{ roles.map((role) => role.name).join(', ') }}
            </template>
            <template #actions="item">
                <ActionButton type="delete" @click="formService.openModal('deleteUser', item)" />

                <!-- Delete tag modal -->
                <DeleteModal name="deleteUser" :item="item" @deleting="deleteUser(item)" :form="form" />
<!--                <Modal :id="`deleteUserModal${item.id}`" title="Supprimer le tag">
                    <template #description>
                        Êtes-vous sûr de supprimer l'utilisateur {{ item.name.en }} ?
                    </template>
                    <form @submit.prevent="deleteTag(item)">
                        <button class="btn btn-error" :disabled="form.processing">
                            Supprimer le tag
                        </button>
                    </form>
                </Modal>-->
            </template>
        </Table>
    </AdminDashboardLayout>
</template>
