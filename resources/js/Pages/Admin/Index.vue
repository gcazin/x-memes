<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout.vue'

defineProps({
    users: {
        type: Array,
    },
    medias: {
        type: Object,
    },
    tags: {
        type: Object,
    },
})
</script>

<template>
    <AdminDashboardLayout title="Dashboard">
        <div class="stats w-full bg-base-300 shadow">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <Icon name="people" size="3xl" />
                </div>
                <div class="stat-title">Nombre d'utilisateurs inscrits</div>
                <div class="stat-value">
                    {{ users.length }}
                </div>
                <!--                <div class="stat-desc">Jan 1st - Feb 1st</div>-->
            </div>
            <div class="stat">
                <div class="stat-figure text-primary">
                    <Icon name="images" size="3xl" />
                </div>
                <div class="stat-title">
                    Nombre de medias uploadés approuvés
                </div>
                <div class="stat-value">
                    {{ medias.filter((media) => media.approved).length }}
                </div>
                <!--                <div class="stat-desc">↗︎ 400 (22%)</div>-->
            </div>

            <div class="stat">
                <div class="stat-figure text-primary">
                    <Icon name="pricetags" size="3xl" />
                </div>
                <div class="stat-title">Nombre de tags ajoutés</div>
                <div class="stat-value">
                    {{ medias.filter((media) => !media.approved).length }}
                </div>
                <!--                <div class="stat-desc">↘︎ 90 (14%)</div>-->
            </div>
        </div>
    </AdminDashboardLayout>
</template>
