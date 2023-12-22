<script setup>
import { computed } from 'vue'
import { Head } from '@inertiajs/vue3'

const props = defineProps({ status: Number })

const description = computed(() => {
    return {
        503: 'Désolé, nous effectuons des travaux de maintenance. Veuillez revenir bientôt.',
        500: 'Oups, un problème est survenu sur nos serveurs.',
        404: "Désolé, la page que vous recherchez n'a pu être trouvée.",
        403: "Désolé, l'accès à cette page vous est interdit.",
    }[props.status]
})
</script>

<template>
    <Head :title="status" />

    <div class="grid h-screen place-content-center bg-base-300 px-4">
        <div class="text-center">
            <h1 class="text-9xl font-black">{{ status }}</h1>

            <p class="text-2xl font-bold tracking-tight sm:text-4xl">Oops!</p>

            <p class="mt-4">{{ description }}</p>

            <a :href="route('index')" class="btn btn-primary mt-4">
                Retour à l'accueil
            </a>
        </div>
    </div>
</template>
