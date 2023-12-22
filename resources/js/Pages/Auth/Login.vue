<script setup>
import Checkbox from '@/Components/Elements/Form/Checkbox.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Components/Layout/Section.vue'

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
})

const form = useForm({
    username: '',
    password: '',
    remember: false,
})

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    })
}
</script>

<template>
    <PageLayout title="Connexion">
        <Section>
            <form @submit.prevent="submit">
                <TextInput
                    label="Nom d'utilisateur / Adresse e-mail"
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
                    label="Mot de passe"
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />

                <div class="block mt-4">
                    <label class="flex items-center">
                        <Checkbox
                            name="remember"
                            v-model:checked="form.remember"
                        />
                        <span
                            class="ms-2 text-sm text-gray-600 dark:text-gray-400"
                            >Se souvenir de moi</span
                        >
                    </label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    <Link
                        v-if="canResetPassword"
                        :href="route('password.request')"
                        class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        Mot de passe oublié?
                    </Link>

                    <button
                        class="ms-4 btn btn-primary"
                        :disabled="form.processing"
                    >
                        Connexion
                    </button>
                </div>
            </form>
        </Section>
    </PageLayout>
</template>
