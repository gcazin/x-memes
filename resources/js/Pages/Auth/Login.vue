<script setup>
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import Checkbox from '@/Components/Form/Checkbox.vue'
import InputError from '@/Components/Form/InputError.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Icon from '@/Components/Misc/Icon.vue'
import SocialLogin from '@/Components/Misc/SocialLogin.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
})

const page = usePage()
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
    <Head :title="page.props.seo.title" />
    <PageLayout>
        <Stack>
            <SocialLogin />

            <a
                :href="route('register')"
                class="btn btn-outline w-full"
            >
                <Icon name="user-plus" size="2xl" />
                {{ $t('Pas encore inscrit ?') }}
            </a>
            <Section>
                <form @submit.prevent="submit">
                    <Stack>
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
                                    >{{ $t('Se souvenir de moi') }}</span
                                >
                            </label>
                        </div>

                        <div class="mt-4 flex items-center justify-end gap-x-4">
                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                {{ $t('Mot de passe oublié?') }}
                            </Link>

                            <LoadingButton
                                class="ms-4"
                                :disabled="form.processing"
                                :loading="form.processing"
                            >
                                {{ $t('Connexion') }}
                            </LoadingButton>
                        </div>
                    </Stack>
                </form>
            </Section>
        </Stack>
    </PageLayout>
</template>
