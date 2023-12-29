<script setup>
import Checkbox from '@/Components/Elements/Form/Checkbox.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Section from '@/Components/Layout/Section.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import { Link, useForm } from '@inertiajs/vue3'

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
    remember: true,
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
                <InputError :message="form.errors.username" />

                <TextInput
                    label="Mot de passe"
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                />
                <InputError :message="form.errors.password" />

                <div class="mt-4 block">
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

                <div class="mt-4 flex items-center justify-end">
                    <Link
                        v-if="canResetPassword"
                        :href="route('password.request')"
                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Mot de passe oublié?
                    </Link>

                    <button
                        class="btn btn-primary ms-4"
                        :disabled="form.processing"
                    >
                        Connexion
                    </button>
                </div>
            </form>
        </Section>
    </PageLayout>
</template>
