<script setup>
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import { Link, useForm } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps({
    status: {
        type: String,
    },
})

const form = useForm({})

const submit = () => {
    form.post(route('verification.send'))
}

const verificationLinkSent = computed(
    () => props.status === 'verification-link-sent'
)
</script>

<template>
    <PageLayout title="Vérification email">
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Merci de vous être inscrit ! Avant de commencer, pourriez-vous
            vérifier votre adresse électronique en cliquant sur le lien que nous
            venons de vous envoyer par courrier électronique ? Si vous n'avez
            pas reçu l'e-mail, nous vous en enverrons un autre avec plaisir.
        </div>

        <div
            class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"
            v-if="verificationLinkSent"
        >
            Un nouveau lien de vérification a été envoyé à l'adresse
            électronique que vous avez fournie lors de votre inscription.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <LoadingButton :loading="form.processing">
                    {{ $t("Renvoyer l'e-mail de vérification") }}
                </LoadingButton>

                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >Déconnexion</Link
                >
            </div>
        </form>
    </PageLayout>
</template>
