<script setup>
import { useForm } from '@inertiajs/vue3'
import Text from '@/Components/Text.vue'
import AdminDashboardLayout from '@/Pages/Admin/Layout/AdminDashboardLayout.vue'
import Table from '@/Pages/Admin/Partials/Table.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Tag from '@/Components/Misc/Tag.vue'
import ActionButton from '@/Components/Elements/Button/ActionButton.vue'
import formService from '@/Services/form.service.js'
import Icon from '@/Components/Misc/Icon.vue'
import LoadingButton from '@/Components/Elements/Button/LoadingButton.vue'

defineProps({
    users: {
        type: Array,
    },
    medias: {
        type: Object,
    },
})

const form = useForm({
    name: null,
})

formService.setForm(form)
</script>

<template>
    <AdminDashboardLayout title="Médias">
        <div class="flex flex-col lg:flex-row gap-4">
            <div class="flex-1">
                <div class="mb-4">
                    <Text type="subtitle" class="mb-2">
                        Médias approuvés
                        <Tag size="lg" type="primary">
                            {{
                                medias.filter((media) => media.approved).length
                            }}
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
                            <a :href="route('media.show', media.id)">{{
                                media.name
                            }}</a>
                        </template>
                        <template #role="{ user }">
                            {{ user.roles.map((role) => role.name).join(', ') }}
                        </template>
                        <template #user="{ user }">
                            {{ user.username }} ({{ user.email }})
                        </template>
                        <template #media="{ extension, filename, name }">
                            <video
                                controls
                                class="h-full w-full"
                                v-if="extension === 'mp4'"
                                :src="`storage/${name}`"
                            ></video>
                            <img
                                v-else
                                class="w-32 rounded-xl"
                                :src="`/storage/${filename}`"
                                alt=""
                            />
                        </template>
                        <template #actions="item">
                            <ActionButton
                                type="edit"
                                @click="
                                    formService.openModal('editMedia', item)
                                "
                            />
                            <ActionButton
                                type="delete"
                                @click="formService.handle('destroy', item)"
                            />

                            <Modal
                                :id="`editMediaModal${item.id}`"
                                title="Modifier le média"
                            >
                                <TextInput label="Titre" v-model="form.name" />
                                <InputError :message="form.errors.name" />

                                <LoadingButton
                                    @click="
                                        formService
                                            .setRouteName('media')
                                            .handle('update', item)
                                    "
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
                        <video
                            controls
                            class="h-full w-full"
                            v-if="extension === 'mp4'"
                            :src="`storage/${name}`"
                        ></video>
                        <img
                            v-else
                            class="w-40 rounded-xl"
                            :src="`/storage/${filename}`"
                            alt=""
                        />
                    </template>
                    <template #actions="item">
                        <span
                            class="cursor-pointer transition px-1 hover:text-primary"
                            @click="
                                formService
                                    .setRouteName('admin.media')
                                    .handle('approve', item)
                            "
                        >
                            <Icon size="2xl" name="checkmark-done" />
                        </span>
                        <ActionButton
                            type="delete"
                            @click="formService.handle('destroy', item)"
                        />
                    </template>
                </Table>
            </div>
        </div>
    </AdminDashboardLayout>
</template>
