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

const creatingBadgeModal = ref(false);

const createBadgeModal = () => {
    creatingBadgeModal.value = true;
};

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
    creatingBadgeModal.value = false;

    form.reset();
};
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout>
        <div class="flex mb-4">
            <div class="flex-1">
                <Text type="subtitle">Badges</Text>
            </div>
            <div class="flex-1 text-end">
                <PrimaryButton @click="createBadgeModal">Ajouter un badge</PrimaryButton>
            </div>
        </div>

        <Card title="Nombres de badges" :is-link="false">
            {{ badges.length }}
        </Card>

        <Section has-background>
            <Table
                :headers="['Nom', 'Condition', 'Décerné à']"
                :items="badges"
                :properties="['name', 'condition', 'users']"
                has-action
            >
                <template #users="{ users }">
                    {{ users.length }} utilisateurs
                </template>
                <template #actions="{ id }">
                    <span
                        class="hover:text-red-500 cursor-pointer text-2xl transition"
                        @click="deleteBadge(id)"
                    >
                        <ion-icon name="trash-outline"></ion-icon>
                    </span>
                </template>
            </Table>
        </Section>

        <Modal :show="creatingBadgeModal" @close="closeModal">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Ajouter un badge
                </h2>

                <form @submit.prevent="addBadge">
                    <InputLabel for="name">Nom</InputLabel>
                    <TextInput v-model="form.name"/>

                    <InputLabel for="description">Description</InputLabel>
                    <Textarea v-model="form.description"/>

                    <InputLabel for="condition">Condition</InputLabel>
                    <TextInput v-model="form.condition" type="number"></TextInput>

                    <InputError :message="form.errors.name" />

                    <div class="mt-4">
                        <PrimaryButton :disabled="form.processing">
                            Ajouter le badge
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </AdminDashboardLayout>
</template>
