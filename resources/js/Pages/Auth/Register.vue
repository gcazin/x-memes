<script setup>
import InputError from '@/Components/Elements/Form/InputError.vue'
import InputLabel from '@/Components/Elements/Form/InputLabel.vue'
import PrimaryButton from '@/Components/Elements/Button/PrimaryButton.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Components/Layout/Section.vue'

const form = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
    <PageLayout title="Inscription">
        <Section>
            <form @submit.prevent="submit">
                <TextInput
                    label="Nom d'utilisateur"
                    id="username"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.username"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.username" />

                <TextInput
                    label="Adresse email"
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="email"
                />
                <InputError class="mt-2" :message="form.errors.email" />

                <TextInput
                    label="Mot de passe"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />

                <TextInput
                    label="Confirmation du mot de passe"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />
                <InputError
                    class="mt-2"
                    :message="form.errors.password_confirmation"
                />

                <div class="flex items-center justify-end mt-4">
                    <Link
                        :href="route('login')"
                        class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Déjà inscrit?
                    </Link>

                    <button
                        class="ms-4 btn btn-primary"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        S'inscrire
                    </button>
                </div>
            </form>
        </Section>
    </PageLayout>
</template>
