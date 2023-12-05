<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import {ref} from "vue";
import InputError from "@/Components/InputError.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import Modal from "@/Components/Modal.vue";
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";
import Tag from "@/Components/Tag.vue";
import Badges from "@/Pages/Admin/Badges.vue";

defineProps({
    users: {
        type: Array
    },
    medias: {
        type: Object
    }
})

const form = useForm({
    name: null
})

const editingMediaModal = ref(false);

const editTagModal = () => {
    editingMediaModal.value = true;
};

const closeModal = () => {
    editingMediaModal.value = false;

    form.reset();
};

const approveMedia = (id) => {
    form.patch(route('media.approve', id), {
        preserveScroll: true,
    });
};
const editMedia = () => {
    form.post(route('admin.media.edit'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};
const deleteMedia = (id) => {
    form.delete(route('media.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout title="Médias">
        <div class="flex gap-4">
            <div class="flex-1">
                <div class="mb-4">
                    <Text type="subtitle" class="mb-2">
                        Médias approuvés
                        <Tag size="lg">
                            {{ medias.filter((media) => media.approved).length }}
                        </Tag>
                    </Text>
                    <Table
                        :headers="['Titre', 'Media', 'Rôles', 'Utilisateur']"
                        :items="medias.filter((m) => m.approved)"
                        :properties="['name', 'media', 'role', 'user']"
                        has-action
                        has-background
                    >
                        <template #role="{ user }">
                            {{ user.roles.map((role) => role.name).join(', ') }}
                        </template>
                        <template #user="{ user }">
                            {{ user.name }} ({{ user.email }})
                        </template>
                        <template #media="{ extension, filename, name }">
                            <video controls class="h-full w-full" v-if="extension === 'mp4'" :src="`storage/${name}`"></video>
                            <img v-else class="w-32 rounded-xl" :src="`/storage/${filename}`" alt="">
                        </template>
                        <template #actions="{ id }">
                            <div class="flex gap-1">
                                <span
                                    class="hover:text-green-500 cursor-pointer text-2xl transition"
                                    @click="editTagModal"
                                >
                                    <ion-icon name="create-outline"></ion-icon>
                                </span>
                                <span
                                    class="hover:text-red-500 cursor-pointer text-2xl transition"
                                    @click="deleteMedia(id)"
                                >
                                    <ion-icon name="trash-outline"></ion-icon>
                                </span>
                            </div>
                        </template>
                    </Table>
                </div>
            </div>
            <div class="flex-1">
                <Text type="subtitle" class="mb-2">
                    Médias en attente
                    <Tag size="lg">
                        {{ medias.filter((media) => !media.approved).length }}
                    </Tag>
                </Text>
                <Table
                    :headers="['Titre', 'Media', 'Rôles', 'Utilisateur']"
                    :items="medias.filter((m) => !m.approved)"
                    :properties="['name', 'media', 'role', 'user']"
                    has-action
                    has-background
                >
                    <template #role="{ user }">
                        {{ user.roles.map((role) => role.name).join(', ') }}
                    </template>
                    <template #user="{ user }">
                        {{ user.name }} ({{ user.email }})
                    </template>
                    <template #media="{ extension, filename, name }">
                        <video controls class="h-full w-full" v-if="extension === 'mp4'" :src="`storage/${name}`"></video>
                        <img v-else class="w-40 rounded-xl" :src="`/storage/${filename}`" alt="">
                    </template>
                    <template #actions="{ id }">
                        <SecondaryButton
                            class="ms-3"
                            @click="approveMedia(id)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </SecondaryButton>
                        <DangerButton
                            class="ms-3"
                            @click="deleteMedia(id)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </DangerButton>
                    </template>
                </Table>
            </div>
        </div>

        <!-- Edit medias -->
        <Modal :show="editingMediaModal" @close="closeModal">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Modifier le média
                </h2>

                <form @submit.prevent="editMedia">
                    <InputLabel>Titre</InputLabel>
                    <TextInput
                        v-model="form.name"
                    />

                    <InputError :message="form.errors.name" />

                    <div class="mt-4">
                        <PrimaryButton :disabled="form.processing">
                            Modifier
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </AdminDashboardLayout>
</template>
