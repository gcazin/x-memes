<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import UserCard from '@/Components/User/UserCard.vue'
import { Head } from '@inertiajs/vue3'
import Text from '@/Components/Misc/Text.vue'
import UserLayout from '@/Pages/User/UserLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Avatar from '@/Components/User/Avatar.vue'
import FollowButton from '@/Components/Button/FollowButton.vue'
import UserDetail from '@/Pages/User/Partials/UserDetail.vue'
import Pagination from '@/Components/Table/Pagination.vue'

defineProps({
    user: {
        type: Object,
    },
    followings: {
        type: Object,
    }
})
</script>

<template>
    <Head title="Abonnements" />

    <UserLayout :user="user">
        <div class="flex flex-col">
            <Section
                v-if="followings.total > 0"
                v-for="(following, index) in followings.data"
                :key="index"
            >
                <UserDetail :user="following" />
            </Section>
            <Section v-else>
                <Text>{{ $t('Aucun abonnement à afficher.') }}</Text>
            </Section>

            <Pagination :item="followings" />
        </div>
    </UserLayout>
</template>

<style scoped>
</style>
