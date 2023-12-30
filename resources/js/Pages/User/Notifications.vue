<script setup>
import Section from '@/Components/Layout/Section.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()
const notifications = page.props.auth?.notifications
</script>

<template>
    <PageLayout title="Notifications">
        <Section
            v-if="notifications.length"
            v-for="(notification, index) in notifications"
            :key="index"
        >
            <div class="flex items-center">
                <div class="w-1/6">
                    <img
                        :src="`/storage/${notification.data.data.path}`"
                        alt=""
                        class="mx-auto w-20 rounded"
                    />
                </div>
                <div class="flex-1">
                    {{ notification.data.title }}
                </div>
            </div>
        </Section>
        <Section v-else> Aucune notification a afficher. </Section>
    </PageLayout>
</template>

<style scoped></style>
