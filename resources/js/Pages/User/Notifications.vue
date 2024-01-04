<script setup>
import Section from '@/Components/Layout/Section.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Pagination from '@/Components/Misc/Pagination.vue'
import Text from '@/Components/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
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

console.log(props.notifications)
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

        <Stack spacing="6">
            <Stack v-if="unreadNotifications.length > 0" spacing="3">
                <Text type="subtitle"> Nouveau </Text>
                <div
                    v-if="unreadNotifications.length"
                    v-for="(notification, index) in unreadNotifications"
                    :key="index"
                    class="relative rounded-lg bg-base-300 p-4"
                >
                    <div class="flex items-center">
                        <div class="absolute -left-1.5 -top-2">
                            <Icon
                                name="ellipse"
                                :outline="false"
                                class="text-secondary"
                            />
                        </div>
                        <div class="ml-2 mr-6">
                            <img
                                :src="`/storage/${notification.data.content.path}`"
                                alt=""
                                class="mx-auto w-20 rounded"
                            />
                        </div>
                        <div class="flex-1">
                            <Text>
                                <a
                                    class="link"
                                    :href="
                                        route(
                                            'notification.show',
                                            notification.id
                                        )
                                    "
                                >
                                    {{ notification.data.title }}
                                </a>
                            </Text>
                            <Text type="xs">
                                {{ notification.formatted_created_at }}
                            </Text>
                        </div>
                        <div class="relative z-50">
                            <button
                                @click="
                                    formService.handle('update', notification)
                                "
                                class="btn btn-ghost btn-sm"
                            >
                                Marquer comme lu
                            </button>
                        </div>
                    </div>
                </div>
            </Stack>

            <Stack>
                <Text type="subtitle">Ancien</Text>
                <template
                    v-if="
                        notifications.data.filter(
                            (notification) => notification.read_at !== null
                        ).length
                    "
                >
                    <div
                        v-for="(notification, index) in notifications.data"
                        :key="index"
                        class="rounded-lg bg-base-300 p-4"
                    >
                        <div class="flex items-center">
                            <div class="ml-2 mr-6">
                                <img
                                    :src="`/storage/${notification.data.content.path}`"
                                    alt=""
                                    class="mx-auto w-20 rounded"
                                />
                            </div>
                            <div class="flex-1">
                                <Text>
                                    <a
                                        class="link"
                                        :href="
                                            route(
                                                'media.show',
                                                notification.data.content.slug
                                            )
                                        "
                                    >
                                        {{ notification.data.title }}
                                    </a>
                                </Text>
                            </div>
                            <div>
                                <Text>
                                    {{ notification.formatted_created_at }}
                                </Text>
                            </div>
                        </div>
                    </div>

                    <Pagination :item="notifications" />
                </template>
                <Section class="!bg-base-300" v-else>
                    <Text>Aucune notification a afficher.</Text>
                </Section>
            </Stack>
        </Stack>
    </PageLayout>
</template>

<style scoped></style>
