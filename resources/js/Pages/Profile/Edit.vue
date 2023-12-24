<script setup>
import Section from '@/Components/Layout/Section.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import ChangeTheme from '@/Pages/Profile/Partials/ChangeTheme.vue'
import DeleteUserForm from './Partials/DeleteUserForm.vue'
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue'

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
})
</script>

<template>
    <PageLayout title="Mon compte">
        <Section>
            <ChangeTheme />
        </Section>
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
