<script setup>
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import InputError from '@/Components/Form/InputError.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Text from '@/Components/Misc/Text.vue'
import formService from '@/Services/form.service.js'
import { Link, useForm, usePage } from '@inertiajs/vue3'

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
})

const user = usePage().props.auth.user

const form = useForm({
    email: user.email,
})

formService.setForm(form).setRouteName('profile')
</script>

<template>
    <header>
        <Text class="font-bold">Informations du profil</Text>

        <Text type="xs"> Mettez à jour l'adresse email de votre compte. </Text>
    </header>

    <form @submit.prevent="formService.handle('update')" class="mt-6 space-y-6">
        <TextInput
            label="Adresse e-mail"
            type="email"
            v-model="form.email"
            required
            autocomplete="username"
        />
        <InputError :message="form.errors.email" />

        <div v-if="mustVerifyEmail && user.email_verified_at === null">
            <p class="mt-2 text-sm text-gray-800 dark:text-gray-200">
                Votre adresse email n'est pas vérifiée.
                <Link
                    :href="route('verification.send')"
                    method="post"
                    as="button"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                >
                    Cliquez ici pour renvoyer l'e-mail de vérification.
                </Link>
            </p>

            <div
                v-show="status === 'verification-link-sent'"
                class="mt-2 text-sm font-medium text-green-600 dark:text-green-400"
            >
                Un nouveau lien de vérification a été envoyé à votre adresse
                email.
            </div>
        </div>

        <div class="flex items-center gap-4">
            <LoadingButton :loading="form.processing">
                {{ $t('Sauvegarder') }}
            </LoadingButton>
        </div>
    </form>
</template>
