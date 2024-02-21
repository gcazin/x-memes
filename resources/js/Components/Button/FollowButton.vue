<script setup>
import Button from '@/Components/Button/Button.vue'
import { useForm, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    inline: {
        type: Boolean,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
})

const page = usePage()

const checkIfAuthIsFollowing = computed(() => {
    return page.props.auth.followings
        .map((follower) => follower.followable_id)
        .includes(props.user.id)
})

const form = useForm({})

const submit = () => {
    form.post(route('user.follow', props.user.id), {
        preserveState: false,
    })
}
</script>

<template>
    <Button
        v-if="page.props.auth.isConnected && page.props.auth.user.id !== user.id"
        :size="size"
        :type="!inline ? 'secondary' : 'primary'"
        :outline="checkIfAuthIsFollowing"
        @click="submit"
    >
        {{ $t(checkIfAuthIsFollowing ? 'Ne plus suivre' : 'Suivre') }}
    </Button>
</template>

<style scoped></style>
