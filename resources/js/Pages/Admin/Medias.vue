<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Table from "@/Pages/Admin/Partials/Table.vue";
import {ref} from "vue";
import InputError from "@/Components/Elements/Form/InputError.vue";
import Modal from "@/Components/Elements/Modal/Modal.vue";
import TextInput from "@/Components/Elements/Form/TextInput.vue";
import InputLabel from "@/Components/Elements/Form/InputLabel.vue";
import Tag from "@/Components/Misc/Tag.vue";
import ActionButton from "@/Components/Elements/Button/ActionButton.vue";
import ActionModal from "@/Components/Elements/Modal/ActionModal.vue";
import formService from "@/Services/form.service.js";
import Icon from "@/Components/Misc/Icon.vue";

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
    form.patch(route('admin.media.approve', id), {
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
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1">
                <div class="mb-4">
                    <Text type="subtitle" class="mb-2">
                        Médias approuvés
                        <Tag size="lg" type="primary">
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
                        <template #name="media">
                            <a :href="route('media.show', media.id)">{{ media.name }}</a>
                        </template>
                        <template #role="{ user }">
                            {{ user.roles.map((role) => role.name).join(', ') }}
                        </template>
                        <template #user="{ user }">
                            {{ user.username }} ({{ user.email }})
                        </template>
                        <template #media="{ extension, filename, name }">
                            <video controls class="h-full w-full" v-if="extension === 'mp4'" :src="`storage/${name}`"></video>
                            <img v-else class="w-32 rounded-xl" :src="`/storage/${filename}`" alt="">
                        </template>
                        <template #actions="item">
                            <ActionButton type="edit" @click="formService.openModal('editMedia', item)" />
                            <ActionModal
                                :form="form"
                                route="media"
                                name="editMedia"
                                type="edit"
                                :item="item"
                            >
                                <TextInput
                                    label="Titre"
                                    v-model="form.name"
                                />
                                <InputError :message="form.errors.name" />
                            </ActionModal>
                            <ActionButton type="delete" @click="deleteMedia(item.id)" />
                        </template>
                    </Table>
                </div>
            </div>
            <div class="flex-1">
                <Text type="subtitle" class="mb-2">
                    Médias en attente
                    <Tag size="lg" type="warning">
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
                        {{ user.username }} ({{ user.email }})
                    </template>
                    <template #media="{ extension, filename, name }">
                        <video controls class="h-full w-full" v-if="extension === 'mp4'" :src="`storage/${name}`"></video>
                        <img v-else class="w-40 rounded-xl" :src="`/storage/${filename}`" alt="">
                    </template>
                    <template #actions="{ id }">
                        <span
                            class="cursor-pointer transition px-1 hover:text-primary"
                            @click="approveMedia(id)"
                        >
                            <Icon size="2xl" name="checkmark-done" />
                        </span>
                        <ActionButton type="delete" @click="deleteMedia(id)" />
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


                    <div class="mt-4">
                        <button :disabled="form.processing">
                            Modifier
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    </AdminDashboardLayout>
</template>
