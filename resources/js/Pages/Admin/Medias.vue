<script setup>
import ActionButton from '@/Components/Elements/Button/ActionButton.vue'
import LoadingButton from '@/Components/Elements/Button/LoadingButton.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Text.vue'
import AdminDashboardLayout from '@/Pages/Admin/Layout/AdminDashboardLayout.vue'
import Table from '@/Pages/Admin/Partials/Table.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'

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
        <Stack>
            <div class="flex flex-row">
                <div class="flex-1">
                    <Stack>
                        <Text type="subtitle">
                            Médias approuvés
                            <Tag size="lg" type="primary">
                                {{
                                    medias.filter((media) => media.approved)
                                        .length
                                }}
                            </Tag>
                        </Text>
                        <Table
                            class="h-96 overflow-auto"
                            :headers="[
                                'Titre',
                                'Media',
                                'Rôles',
                                'Utilisateur',
                                'Tags',
                            ]"
                            :items="medias.filter((m) => m.approved)"
                            :properties="[
                                'name',
                                'media',
                                'role',
                                'user',
                                'tags',
                            ]"
                            has-action
                            has-background
                        >
                            <template #name="media">
                                <a :href="route('media.show', media.id)">{{
                                    media.name
                                }}</a>
                            </template>
                            <template #role="{ user }">
                                {{
                                    user.roles
                                        .map((role) => role.name)
                                        .join(', ')
                                }}
                            </template>
                            <template #user="{ user }">
                                {{ user.username }} ({{ user.email }})
                            </template>
                            <template #media="{ path, thumbnail_path }">
                                <img
                                    class="w-24 rounded-xl"
                                    :src="`/storage/${thumbnail_path ?? path}`"
                                    alt=""
                                />
                            </template>
                            <template #tags="{ tags }">
                                <Tag v-for="(tag, index) in tags" :key="index">
                                    {{ tag.name }}
                                </Tag>
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
                                    <TextInput
                                        label="Titre"
                                        v-model="form.name"
                                    />
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
                    </Stack>
                </div>
                <div class="flex-1">
                    <Stack>
                        <Text type="subtitle">
                            Médias en attente
                            <Tag size="lg" type="warning">
                                {{
                                    medias.filter((media) => !media.approved)
                                        .length
                                }}
                            </Tag>
                        </Text>
                        <Table
                            class="h-96 overflow-y-auto"
                            :headers="[
                                'Titre',
                                'Media',
                                'Rôles',
                                'Utilisateur',
                            ]"
                            :items="medias.filter((m) => !m.approved)"
                            :properties="['name', 'media', 'role', 'user']"
                            has-action
                            has-background
                        >
                            <template #role="{ user }">
                                {{
                                    user.roles
                                        .map((role) => role.name)
                                        .join(', ')
                                }}
                            </template>
                            <template #user="{ user }">
                                {{ user.username }} ({{ user.email }})
                            </template>
                            <template
                                #media="{
                                    extension,
                                    path,
                                    thumbnail_path,
                                    name,
                                }"
                            >
                                <img
                                    class="w-24 rounded-xl"
                                    :src="`/storage/${thumbnail_path ?? path}`"
                                    alt=""
                                />
                            </template>
                            <template #tags="{ tags }">
                                <Tag v-for="(tag, index) in tags" :key="index">
                                    {{ tag.name }}
                                </Tag>
                            </template>
                            <template #actions="item">
                                <span
                                    class="cursor-pointer px-1 transition hover:text-primary"
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
                    </Stack>
                </div>
            </div>
        </Stack>
    </AdminDashboardLayout>
</template>
