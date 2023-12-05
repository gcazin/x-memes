<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';
import Section from "@/Components/Section.vue";

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});
</script>

<template>
    <Head title="Profile" />

    <PageLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Mon compte</h2>
        </template>

        <Section>
            <UpdateProfileInformationForm
                :must-verify-email="mustVerifyEmail"
                :status="status"
            />
        </Section>
        <Section>
            <UpdatePasswordForm />
        </Section>
        <Section>
            <DeleteUserForm />
        </Section>
    </PageLayout>
</template>
