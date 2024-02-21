<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import UserCard from '@/Components/User/UserCard.vue'
import { Head } from '@inertiajs/vue3'
import Button from '@/Components/Button/Button.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'
import Avatar from '@/Components/User/Avatar.vue'
import Text from '@/Components/Misc/Text.vue'
import FollowButton from '@/Components/Button/FollowButton.vue'
import Section from '@/Layouts/Partials/Section.vue'
import UserDetail from '@/Pages/User/Partials/UserDetail.vue'
import Pagination from '@/Components/Table/Pagination.vue'

defineProps({
    user: {
        type: Object,
    },
    followers: {
        type: Object,
    }
})
</script>

<template>
    <Head title="Abonnés" />

    <UserLayout :user="user">
        <div class="flex flex-col">
            <Section
                v-if="followers.total > 0"
                v-for="(follower, index) in followers.data"
                :key="index"
            >
                <UserDetail :user="follower" />
            </Section>
            <Section v-else>
                <Text>{{ $t('Aucun abonné à afficher.') }}</Text>
            </Section>

            <Pagination :item="followers" />
        </div>
    </UserLayout>
</template>

<style scoped>

</style>
