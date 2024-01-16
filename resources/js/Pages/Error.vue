<script setup>
import PageLayout from '@/Layouts/PageLayout.vue'
import { Head } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps({ status: Number })

const description = computed(() => {
    return {
        503: '🚀 Du nouveau code est en route ! Patiente quelques secondes.',
        500: 'Oups, un problème est survenu sur nos serveurs.',
        404: "Désolé, la page que vous recherchez n'a pu être trouvée.",
        403: "Désolé, l'accès à cette page vous est interdit.",
    }[props.status]
})

const isAServerError = () => props.status === 503 || props.status === 500
</script>

<template>
    <Head :title="status" />

    <PageLayout :has-navbar="!isAServerError()" :has-footer="!isAServerError()">
        <div class="mt-16 text-center lg:mt-32">
            <h1 class="text-9xl font-black">{{ status }}</h1>

            <p class="text-2xl font-bold tracking-tight sm:text-4xl">Oops!</p>

            <p class="mt-4">{{ description }}</p>

            <a
                v-if="!isAServerError()"
                :href="route('index')"
                class="btn btn-primary mt-4"
            >
                Retour à l'accueil
            </a>
        </div>
    </PageLayout>
</template>
