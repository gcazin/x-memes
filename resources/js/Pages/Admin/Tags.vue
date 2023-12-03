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

defineProps({
    tags: {
        type: Array
    },
})

const form = useForm({
    name: null
})

const creatingTagModal = ref(false);

const createTagModal = () => {
    creatingTagModal.value = true;
};

const addTag = () => {
    form.post(route('admin.tag.create', {
        name:  form.name
    }), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onFinish: () => form.reset(),
    });
};

const deleteTag = (id) => {
    form.delete(route('admin.tag.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    creatingTagModal.value = false;

    form.reset();
};
</script>

<template>
    <Head title="Administration" />

    <AdminDashboardLayout>
        <div class="flex mb-4">
            <div class="flex-1">
                <Text type="subtitle">Tags</Text>
            </div>
            <div class="flex-1 text-end">
                <PrimaryButton @click="createTagModal">Ajouter un tag</PrimaryButton>
            </div>
        </div>

        <Card title="Nombres de tags" :is-link="false">
            {{ tags.length }}
        </Card>

        <Section has-background>
            <Table
                :headers="['Nom']"
                :items="tags"
                :properties="['name']"
                has-action
            >
                <template #name="{ name }">
                    {{ name.en }}
                </template>
                <template #actions="{ name }">
                    <span
                        class="hover:text-red-500 cursor-pointer text-2xl transition"
                        @click="deleteTag(name.en)"
                    >
                        <ion-icon name="trash-outline"></ion-icon>
                    </span>
                </template>
            </Table>
        </Section>

        <Modal :show="creatingTagModal" @close="closeModal">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Ajouter un tag
                </h2>

                <form @submit.prevent="addTag" >
                    <TextInput
                        v-model="form.name"
                    />

                    <InputError :message="form.errors.name" />

                    <div class="mt-4">
                        <PrimaryButton :disabled="form.processing">
                            Ajouter le tag
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    </AdminDashboardLayout>
</template>
