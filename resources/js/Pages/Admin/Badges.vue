<script setup>
import ActionButton from '@/Components/Elements/Button/ActionButton.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import Select from '@/Components/Elements/Form/Select.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Textarea from '@/Components/Elements/Form/Textarea.vue'
import Modal from '@/Components/Elements/Modal/Modal.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Badge from '@/Components/Misc/Badge.vue'
import Card from '@/Components/Misc/Card.vue'
import AdminDashboardLayout from '@/Pages/Admin/Layout/AdminDashboardLayout.vue'
import Table from '@/Pages/Admin/Partials/Table.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'

defineProps({
    badges: {
        type: Array,
    },
    badgeTypes: {
        type: Array,
    },
})

const form = useForm({
    name: null,
    description: null,
    path: null,
    condition: null,
    type: null,
})

formService.setForm(form).setRouteName('admin.badge')
</script>

<template>
    <AdminDashboardLayout title="Badges">
        <Stack>
            <div class="flex justify-end">
                <button
                    class="btn btn-primary"
                    @click="formService.openModal('createBadge')"
                >
                    Ajouter un badge
                </button>

                <!-- Modal -->
                <Modal id="createBadgeModal" title="Ajouter un badge">
                    <form @submit.prevent="formService.handle('store')">
                        <TextInput label="Nom" v-model="form.name" />
                        <InputError :message="form.errors.name" />

                        <Textarea
                            label="Description"
                            v-model="form.description"
                        />
                        <InputError :message="form.errors.description" />

                        <TextInput
                            label="Condition"
                            v-model="form.condition"
                        ></TextInput>
                        <InputError :message="form.errors.condition" />

                        <Select
                            label="Type"
                            :model-value="form.type"
                            :options="badgeTypes"
                        />

                        <div class="mt-4">
                            <button
                                class="btn btn-primary"
                                :disabled="form.processing"
                            >
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
                :headers="[
                    'Nom',
                    'Description',
                    'Condition',
                    'Fichier',
                    'Décerné à',
                ]"
                :items="badges"
                :properties="[
                    'name',
                    'description',
                    'condition',
                    'path',
                    'users',
                ]"
                has-action
                has-background
            >
                <template #path="item">
                    <Badge :badge="item" />
                    <!--                    <img class="w-10" :src="`/images/${item.path}`" alt="">-->
                </template>
                <template #users="{ users }">
                    {{ users.length }} utilisateurs
                </template>
                <template #actions="item">
                    <ActionButton
                        type="edit"
                        @click="formService.openModal('editBadge', item)"
                    />

                    <!-- Edit tag modal -->
                    <Modal
                        :id="`editBadgeModal${item.id}`"
                        :title="`Éditer le tag ${item.name}`"
                        @close="formService.closeModal()"
                    >
                        <form
                            @submit.prevent="formService.handle('update', item)"
                        >
                            <TextInput label="Nom" v-model="form.name" />
                            <InputError :message="form.errors.name" />

                            <Textarea
                                label="Description"
                                v-model="form.description"
                            />
                            <InputError :message="form.errors.description" />

                            <TextInput
                                label="Condition"
                                v-model="form.condition"
                            />
                            <InputError :message="form.errors.condition" />

                            <Select
                                label="Type"
                                :model-value="form.type"
                                :options="badgeTypes"
                            />

                            <button
                                class="btn btn-primary mt-4"
                                :disabled="form.processing"
                            >
                                Modifier le badge
                            </button>
                        </form>
                    </Modal>

                    <ActionButton
                        type="delete"
                        @click="formService.handle('destroy', item)"
                    />
                </template>
            </Table>
        </Stack>
    </AdminDashboardLayout>
</template>
