<script setup>
import Text from '@/Components/Misc/Text.vue'
import NotificationItem from '@/Components/Notification/NotificationItem.vue'
import Pagination from '@/Components/Table/Pagination.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import { router, useForm, usePage } from '@inertiajs/vue3'
import _ from 'lodash'
import { watch } from 'vue'

const props = defineProps({
    notifications: {
        type: Array,
        required: true,
    },
})

const page = usePage()
const form = useForm({
    notifications: null,
})
const unreadNotifications = page.props.auth?.notifications

formService.setForm(form).setRouteName('notification')

const markAllAsRead = () => {
    form.notifications = _.flattenDeep(
        _.map(unreadNotifications, _.partialRight(_.pick, 'id'))
    )
    formService.handle('markAllAsRead')
}

watch(
    form,
    () => {
        if (form.wasSuccessful) {
            router.reload()
        }
    },
    { immediate: true }
)
</script>

<template>
    <PageLayout title="Notifications">
        <template #action>
            <button class="link link-secondary">
                <Text @click="markAllAsRead" type="xs"
                    >Tout marquer comme lu</Text
                >
            </button>
        </template>

        <Stack spacing="4">
            <Stack
                v-if="
                    notifications.data.filter(
                        (notification) => notification.read_at === null
                    ).length
                "
                spacing="3"
            >
                <Text type="subtitle"> Nouveau </Text>
                <div
                    v-if="unreadNotifications.length"
                    v-for="(notification, index) in unreadNotifications"
                    :key="index"
                    class="relative rounded-lg bg-base-300 p-4"
                >
                    <NotificationItem :notification only-unread />
                </div>
            </Stack>

            <Stack>
                <Text type="subtitle">Ancien</Text>
                <template
                    v-if="
                        notifications.data.filter(
                            (notification) => notification.read_at
                        ).length
                    "
                >
                    <div
                        v-for="(
                            notification, index
                        ) in notifications.data.filter(
                            (n) => n.read_at !== null
                        )"
                        :key="index"
                        class="rounded-lg bg-base-300 p-4"
                    >
                        <NotificationItem :notification />
                    </div>

                    <Pagination :item="notifications" />
                </template>
                <Section v-else>
                    <Text>Aucune notification a afficher.</Text>
                </Section>
            </Stack>
        </Stack>
    </PageLayout>
</template>

<style scoped></style>
