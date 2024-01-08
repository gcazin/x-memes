<script setup>
import Card from '@/Components/Misc/Card.vue'
import Icon from '@/Components/Misc/Icon.vue'
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    BarElement
)

const props = defineProps({
    users: {
        type: Array,
    },
    medias: {
        type: Object,
    },
    tags: {
        type: Object,
    },
    stats: {
        type: Array,
    },
})

// Datasets
const mediasChartData = {
    datasets: [
        {
            label: 'Medias',
            backgroundColor: '#C28535',
            data: props.stats.mediasByMonth,
            tension: 0.1,
            fill: true,
        },
    ],
}
const usersChartData = {
    datasets: [
        {
            label: 'Utilisateurs',
            backgroundColor: '#C28535',
            data: props.stats.usersByMonth,
            tension: 0.1,
            fill: true,
        },
    ],
}
const tagsByUtilisation = {
    datasets: [
        {
            label: 'tag',
            backgroundColor: '#C28535',
            data: props.stats.tagsByUtilisation,
        },
    ],
}

const chartOptions = {
    responsive: true,
    colors: {
        enabled: true,
    },
}
</script>

<template>
    <AdminDashboardLayout title="Dashboard">
        <Stack>
            <div class="stats w-full bg-base-300 shadow">
                <div class="stat">
                    <div class="stat-figure text-primary">
                        <Icon name="people" size="3xl" />
                    </div>
                    <div class="stat-title">Utilisateurs</div>
                    <div class="stat-value">
                        {{ users.length }}
                    </div>
                    <!--                <div class="stat-desc">Jan 1st - Feb 1st</div>-->
                </div>

                <div class="stat">
                    <div class="stat-figure text-primary">
                        <Icon name="images" size="3xl" />
                    </div>
                    <div class="stat-title">Médias</div>
                    <div class="stat-value">
                        {{ medias.length }}
                    </div>
                    <!--                <div class="stat-desc">↗︎ 400 (22%)</div>-->
                </div>

                <div class="stat">
                    <div class="stat-figure text-primary">
                        <Icon name="images" size="3xl" />
                    </div>
                    <div class="stat-title">Médias publiés</div>
                    <div class="stat-value">
                        {{ medias.filter((media) => media.approved).length }}
                    </div>
                    <!--                <div class="stat-desc">↗︎ 400 (22%)</div>-->
                </div>

                <div class="stat">
                    <div class="stat-figure text-primary">
                        <Icon name="pricetags" size="3xl" />
                    </div>
                    <div class="stat-title">Tags</div>
                    <div class="stat-value">
                        {{ medias.filter((media) => !media.approved).length }}
                    </div>
                    <!--                <div class="stat-desc">↘︎ 90 (14%)</div>-->
                </div>
            </div>

            <div class="grid-cols grid gap-4 lg:grid-cols-2">
                <Card title="Nombres de médias par mois">
                    <Line :data="mediasChartData" :options="chartOptions" />
                </Card>
                <Card title="Nombres d'utilisateurs par mois">
                    <Line :data="usersChartData" :options="chartOptions" />
                </Card>
                <Card title="Utilisations par tag">
                    <Bar :data="tagsByUtilisation" :options="chartOptions" />
                </Card>
            </div>
        </Stack>
    </AdminDashboardLayout>
</template>
