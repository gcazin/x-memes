<script setup>
import Button from '@/Components/Button/Button.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import Avatar from '@/Components/User/Avatar.vue'
import formService from '@/Services/form.service.js'
import { useForm } from '@inertiajs/vue3'

defineProps({
    notification: {
        type: Array,
    },
    onlyUnread: {
        type: Boolean,
        default: false,
    },
})

const form = useForm({
    notifications: null,
})

formService.setForm(form).setRouteName('notification')
</script>

<template>
    <div class="flex items-center">
        <div class="absolute -left-1.5 -top-2" v-if="onlyUnread">
            <Icon name="ellipse" :outline="false" class="text-secondary" />
        </div>
        <div class="ml-2 mr-6">
            <Avatar
                v-if="
                    notification.type.includes('NewUserNotification') ||
                    notification.type.includes('NewFollowerNotification')
                "
                :user="notification.data.content"
            />
            <img
                v-else
                :src="`/storage/${notification.data.content.path}`"
                alt=""
                class="mx-auto w-16 rounded"
            />
        </div>
        <div class="flex-1">
            <Text>
                <a
                    class="link"
                    :href="route('notification.show', notification.id)"
                >
                    {{ notification.data.title }}
                </a>
            </Text>
            <Text type="xs">
                {{ notification.formatted_created_at }}
            </Text>
        </div>
        <div class="relative z-50 hidden lg:block" v-if="onlyUnread">
            <Button
                size="sm"
                ghost
                @click="formService.handle('update', notification)"
            >
                Marquer comme lu
            </Button>
        </div>
    </div>
</template>

<style scoped></style>
