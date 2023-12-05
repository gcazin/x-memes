<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import InputLabel from "@/Components/InputLabel.vue";
import TextInput from "@/Components/TextInput.vue";
import {nextTick, ref} from "vue";
import Modal from "@/Components/Modal.vue";
import InputError from "@/Components/InputError.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import Card from "@/Components/Card.vue";
import Textarea from "@/Components/Textarea.vue";

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
    <Head title="Administration" />

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
                <button class="btn btn-error btn-outline" :onclick="`deleteBadge${id}.showModal()`">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>

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
