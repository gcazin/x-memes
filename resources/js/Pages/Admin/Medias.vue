<script setup>
import Card from '@/Components/Misc/Card.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'
import _ from 'lodash'

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

formService.setForm(form).setRouteName('media')
</script>

<template>
    <AdminDashboardLayout title="Médias">
        <Stack>
            <div class="flex items-center">
                <div class="flex-1">
                    <Text type="sub">
                        {{ medias.filter((media) => !media.approved).length }}
                        médias en attente d'approbation
                    </Text>
                </div>
                <div class="flex-1 text-end">
                    <div class="space-x-2">
                        <button class="btn btn-outline btn-primary">
                            Voir les médias
                        </button>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 gap-6">
                <Card
                    v-for="(media, index) in medias"
                    :key="index"
                    :title="media.name"
                    has-media
                >
                    <template #media>
                        <img
                            class="h-96 w-full rounded-lg object-cover shadow"
                            :src="`/storage/${
                                media.thumbnail_path ?? media.path
                            }`"
                        />
                    </template>
                    <div class="flex flex-col">
                        <Text type="xs">
                            par
                            <span class="text-secondary">{{
                                media.user.username
                            }}</span>
                            {{ media.created_at }}
                        </Text>
                        <Text type="xs">
                            type:
                            {{ media.extension === 'mp4' ? 'vidéo' : 'image' }}
                        </Text>
                        <Text type="xs" v-if="media.approved">
                            approuvé par {{ media.approved_by?.username }} le
                            {{ media.approved_at }}
                        </Text>
                        <Text type="xs">
                            tags:
                            <span class="text-secondary">{{
                                _.map(media.tags, 'name').join(',')
                            }}</span>
                        </Text>
                        <Text type="xs"> slug: {{ media.slug }} </Text>
                    </div>
                    <template v-if="!media.approved" #action>
                        <button
                            class="btn btn-outline btn-error btn-sm mt-4"
                            @click="formService.handle('destroy', media)"
                        >
                            <Icon name="close" />
                        </button>
                        <button
                            class="btn btn-success btn-sm mt-4"
                            @click="
                                formService
                                    .setRouteName('admin.media')
                                    .handle('approve', media)
                            "
                        >
                            <Icon name="checkmark" />
                        </button>
                    </template>
                </Card>
            </div>
        </Stack>
        <!--        <Stack>
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
                                        <a :href="route('media.show', media.slug)">{{
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
                </Stack>-->
    </AdminDashboardLayout>
</template>
