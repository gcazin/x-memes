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
import formServiceAdminMedia from "@/Services/form.service.js";
import formServiceMedia from "@/Services/form.service.js";
import Icon from "@/Components/Misc/Icon.vue";
import LoadingButton from "@/Components/Elements/Button/LoadingButton.vue";

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

const approveMedia = (id) => {
    form.patch(route('admin.media.approve', id), {
        preserveScroll: true,
    });
};

formServiceMedia
    .setForm(form)
    .setRouteName('admin.media')
formServiceMedia
    .setForm(form)
    .setRouteName('media')
</script>

<template>
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
                            <ActionButton type="edit" @click="formServiceMedia.openModal('editMedia', item)" />
                            <ActionButton type="delete" @click="formService.handle('destroy', item)" />

                            <Modal :id="`editMediaModal${item.id}`" title="Modifier le média">
                                <TextInput
                                    label="Titre"
                                    v-model="form.name"
                                />
                                <InputError :message="form.errors.name" />

                                <LoadingButton
                                    @click="formServiceMedia.handle('update', item)"
                                    :loading="form.processing"
                                >
                                    Modifier le média
                                </LoadingButton>
                            </Modal>
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
                    <template #actions="item">
                        <span
                            class="cursor-pointer transition px-1 hover:text-primary"
                            @click="approveMedia(id)"
                        >
                            <Icon size="2xl" name="checkmark-done" />
                        </span>
                        <ActionButton type="delete" @click="formServiceMedia.handle('destroy', id)" />
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
