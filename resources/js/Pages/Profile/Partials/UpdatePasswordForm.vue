<script setup>
import InputError from '@/Components/Elements/Form/InputError.vue'
import InputLabel from '@/Components/Elements/Form/InputLabel.vue'
import PrimaryButton from '@/Components/Elements/Button/PrimaryButton.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import Section from '@/Components/Layout/Section.vue'

const passwordInput = ref(null)
const currentPasswordInput = ref(null)

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
})

const updatePassword = () => {
    form.put(route('password.update'), {
        preserveScroll: true,
        onSuccess: () => form.reset(),
        onError: () => {
            if (form.errors.password) {
                form.reset('password', 'password_confirmation')
                passwordInput.value.focus()
            }
            if (form.errors.current_password) {
                form.reset('current_password')
                currentPasswordInput.value.focus()
            }
        },
    })
}
</script>

<template>
    <header>
        <h2 class="text-lg font-medium">Mise à jour du mot de passe</h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Veillez à ce que votre compte utilise un mot de passe long et
            aléatoire pour rester sécurisé.
        </p>
    </header>

    <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
        <TextInput
            label="Mot de passe actuel"
            ref="currentPasswordInput"
            v-model="form.current_password"
            type="password"
            autocomplete="current-password"
        />
        <InputError :message="form.errors.current_password" class="mt-2" />

        <TextInput
            label="Nouveau mot de passe"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-full"
            autocomplete="new-password"
        />
        <InputError :message="form.errors.password" class="mt-2" />

        <TextInput
            label="Confirmation du mot de passe"
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            class="mt-1 block w-full"
            autocomplete="new-password"
        />

        <InputError :message="form.errors.password_confirmation" class="mt-2" />

        <div class="flex items-center gap-4">
            <button class="btn btn-primary" :disabled="form.processing">
                Sauvegarder
            </button>

            <Transition
                enter-active-class="transition ease-in-out"
                enter-from-class="opacity-0"
                leave-active-class="transition ease-in-out"
                leave-to-class="opacity-0"
            >
                <p
                    v-if="form.recentlySuccessful"
                    class="text-sm text-gray-600 dark:text-gray-400"
                >
                    Saved.
                </p>
            </Transition>
        </div>
    </form>
</template>
