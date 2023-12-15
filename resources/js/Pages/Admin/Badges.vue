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

const addBadge = () => {
    form.post(route('admin.badge.create'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};

const deleteBadge = (id) => {
    form.delete(route('admin.badge.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    document.querySelector('#addBadgeModal').close();

    form.reset();
};
</script>

<template>
    <AdminDashboardLayout title="Badges">
        <div class="flex justify-end mb-4">
            <button class="btn btn-primary" onclick="addBadgeModal.showModal()">Ajouter un badge</button>

            <!-- Modal -->
            <Modal id="addBadgeModal" title="Ajouter un badge">
                <form @submit.prevent="addBadge">
                    <TextInput label="Nom" v-model="form.name"/>

                    <Textarea label="Description" v-model="form.description"/>

                    <TextInput label="Condition" type="number" v-model="form.condition"></TextInput>

                    <InputError :message="form.errors.name" />

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
            <template #actions="{ name, id }">
                <ActionButton type="delete" :onclick="`deleteBadge${id}.showModal()`" />

                <!-- Modal -->
                <Modal :id="`deleteBadge${id}`" title="Confimer la suppression du badge">
                    <template #description>
                        <p class="py-4">Voulez-vous vraiment supprimer le badge {{ name }} ?</p>
                    </template>
                    <form @submit.prevent="deleteBadge(id)">
                        <div class="mt-4">
                            <button class="btn btn-error" :disabled="form.processing">
                                Supprimer le badge
                            </button>
                        </div>
                    </form>
                </Modal>
            </template>
        </Table>
    </AdminDashboardLayout>
</template>
