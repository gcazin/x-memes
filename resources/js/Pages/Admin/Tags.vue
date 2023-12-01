<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
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

        <Section class="dark:bg-gray-900">
            <div class="pb-6">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-b-lg">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Nom
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                v-for="(tag, index) in tags"
                                :key="index"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {{ tag }}
                                </th>
                                <td class="px-6 py-4">
                                    <DangerButton
                                        class="ms-3"
                                        @click="deleteTag(tag)"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </DangerButton>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
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
