<script setup>
import PageLayout from "@/Layouts/PageLayout.vue";
import MediaGallery from "@/Pages/Medias/Partials/MediaGallery.vue";
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Misc/Tag.vue";
import RoleBadge from "@/Components/Misc/RoleBadge.vue";
import Avatar from "@/Components/Misc/Avatar.vue";
import Section from "@/Components/Layout/Section.vue";
import Navbar from "@/Partials/Navbar.vue";
import {useForm, usePage} from "@inertiajs/vue3";
import Footer from "@/Partials/Footer.vue";
import Icon from "@/Components/Misc/Icon.vue";
import UserLayout from "@/Pages/User/UserLayout.vue";

const props = defineProps({
    user: {
        type: Array
    },
    medias: {
        type: Array
    },
})

const page = usePage()
const auth = page.props.auth?.user

console.log(auth)

const downloadMediaCount = props.user.medias && props.user.medias.length
    ? props.user.medias
        .map((media) => media.download_count)
        .reduce((accumulator, media) => accumulator + media)
    : 0
const checkIfAuthIsFollowing = () => {
    return props.user.followers
        .map((follower) => follower.username)
        .includes(auth.username)
}

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
    <UserLayout :user="user" :medias="medias">
        <MediaGallery :medias="medias" number-of-cols="4" />
    </UserLayout>
</template>
