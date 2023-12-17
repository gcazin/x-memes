<script setup>
import {useForm, usePage} from "@inertiajs/vue3";

const props = defineProps({
    user: {
        type: Array,
        required: true,
    }
})

const checkIfAuthIsFollowing = () => {
    return props.user.followers
        .map((follower) => follower.username)
        .includes(auth.username)
}

const page = usePage()
const auth = page.props.auth?.user

const form = useForm({
    user_id: auth.id
})

const submit = () => {
    form.post(route('user.follow', props.user.id), {
        onSuccess: () => {
            checkIfAuthIsFollowing()
        }
    });
};
</script>

<template>
    <div class="flex border-t border-base-100">
        <div role="tablist" class="flex-1 tabs tabs-lg tabs-bordered">
            <a
                :href="route('user.show', user.username)"
                role="tab"
                class="tab pb-4"
                :class="{'tab-active': route().current('user.show')}"
            >
                Fil
            </a>
            <a
                :href="route('user.badges', user.username)"
                role="tab"
                class="tab pb-4"
                :class="{'tab-active': route().current('user.badges')}"
            >
                Badges
            </a>
            <a role="tab" class="tab pb-4">Éditer le profil</a>
        </div>
        <div class="flex-1 text-right p-1">
            <template v-if="user.id !== auth.id">
                <form @submit.prevent="submit">
                    <button
                        class="btn btn-primary"
                        :class="{'btn-outline': checkIfAuthIsFollowing()}"
                    >
                        {{ checkIfAuthIsFollowing() ? 'Ne plus suivre' : 'Suivre' }}
                    </button>
                </form>
            </template>
        </div>
    </div>
</template>

<style scoped>

</style>
