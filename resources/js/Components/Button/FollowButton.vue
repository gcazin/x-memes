<script setup>
import Button from '@/Components/Button/Button.vue'
import { useForm, usePage } from '@inertiajs/vue3'

const props = defineProps({
    user: {
        type: Array,
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

const checkIfAuthIsFollowing = () => {
    return props.user?.followers
        .map((follower) => follower.username)
        .includes(page.props.auth.user?.username)
}

const form = useForm({})

const submit = () => {
    form.post(route('user.follow', props.user.id), {
        onSuccess: () => {
            checkIfAuthIsFollowing()
        },
    })
}
</script>

<template>
    <Button
        v-if="page.props.auth?.user && page.props.auth.user.id !== user.id"
        :size="size"
        :type="!inline ? 'secondary' : 'primary'"
        :outline="checkIfAuthIsFollowing()"
        @click="submit"
    >
        {{ checkIfAuthIsFollowing() ? 'Ne plus suivre' : 'Suivre' }}
    </Button>
</template>

<style scoped></style>
