<script setup>
import { useForm, usePage } from '@inertiajs/vue3'

const props = defineProps({
    user: {
        type: Array,
        required: true,
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
    <form @submit.prevent="submit">
        <button
            class="btn btn-secondary"
            :class="{ 'btn-outline': checkIfAuthIsFollowing() }"
        >
            {{ checkIfAuthIsFollowing() ? 'Ne plus suivre' : 'Suivre' }}
        </button>
    </form>
</template>

<style scoped></style>
