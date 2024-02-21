<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    size: {
        type: String,
        required: false,
        default: 'xl'
    }
})

const page = usePage()
const role = props.user.roles
const badgeColor = computed(() => {
    if (role.length) {
        return {
            'super-admin': 'text-secondary',
            admin: 'text-primary',
            moderator: 'text-accent',
        }[role[0].name]
    }
})

const tooltipText = computed(() => {
    if (role.length) {
        return {
            'super-admin':
                'Ce compte est certifié car il appartient à un super-administrateur.',
            admin: 'Ce compte est certifié car il appartient à un administrateur.',
            moderator:
                'Ce compte est certifié car il appartient à un modérateur.',
        }[role[0].name]
    }

    return null
})

const tooltipColor = computed(() => {
    if (role.length) {
        return {
            'super-admin': 'lg:tooltip-secondary',
            admin: 'lg:tooltip-primary',
            moderator: 'lg:tooltip-accent',
        }[role[0].name]
    }
})
</script>

<template>
    <div
        class="inline lg:tooltip"
        :class="[tooltipColor]"
        :data-tip="tooltipText"
    >
        <Icon
            v-if="role.length"
            :size="size"
            :class="[badgeColor]"
            name="check-circle"
        />
    </div>
</template>

<style scoped></style>
