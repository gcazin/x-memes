<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps({
    user: {
        type: Array,
        required: true,
    },
})

const page = usePage()
const role = props.user.roles
const badgeColor = computed(() => {
    if (role.length) {
        return {
            admin: 'text-primary',
            'super-admin': 'text-secondary',
        }[role[0].name]
    }

    return null
})
</script>

<template>
    <Icon
        v-if="role.length"
        class="align-top"
        :class="[badgeColor]"
        name="checkmark-circle"
        :outline="false"
    />
</template>

<style scoped></style>
