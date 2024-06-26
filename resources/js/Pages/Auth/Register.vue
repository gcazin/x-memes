<script setup>
import InputError from '@/Components/Form/InputError.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Icon from '@/Components/Misc/Icon.vue'
import SocialLogin from '@/Components/Misc/SocialLogin.vue'
import Text from '@/Components/Misc/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import { Head, Link, useForm, usePage } from '@inertiajs/vue3'

const page = usePage()
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
    <Head :title="page.props.seo.title" />

    <PageLayout>
        <div class="flex w-full flex-col gap-4 lg:flex-row lg:gap-x-16">
            <div class="order-1 w-full lg:w-1/3">
                <Stack spacing="4">
                    <Text type="subtitle">{{
                        $t('Principales fonctionnalités')
                    }}</Text>
                    <Stack spacing="2">
                        <Text class="space-x-2">
                            <Icon name="images" size="xl" />
                            <span>{{
                                $t(
                                    'Avoir accès à la totalité des mèmes présent sur le site.'
                                )
                            }}</span>
                        </Text>
                        <Text class="space-x-2">
                            <Icon name="search" size="xl" />
                            <span>{{
                                $t(
                                    'Enfin trouver les mèmes que tu mets si longtemps à retrouver.'
                                )
                            }}</span>
                        </Text>
                        <Text class="space-x-2">
                            <Icon name="heart" size="xl" />
                            <span>{{
                                $t(
                                    'Pouvoir aimer tes mèmes préférés pour ne plus jamais les perdre.'
                                )
                            }}</span>
                        </Text>
                        <Text class="space-x-2">
                            <Icon name="user-plus" size="xl" />
                            <span>{{
                                $t('Suivre les utilisateurs que tu as envies.')
                            }}</span>
                        </Text>
                        <Text class="space-x-2">
                            <Icon name="chart-bar" size="xl" />
                            <span>{{
                                $t(
                                    'Un classement des personnes les plus actives.'
                                )
                            }}</span>
                        </Text>
                    </Stack>
                </Stack>
            </div>
            <div class="w-full lg:order-1 lg:flex-1">
                <Stack>
                    <SocialLogin :is-login="false" />

                    <Section>
                        <form @submit.prevent="submit">
                            <Stack>
                                <TextInput
                                    label="Nom d'utilisateur"
                                    id="username"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.username"
                                    required
                                    autofocus
                                    autocomplete="username"
                                    help-text="25 caractères maximum, sans caractères spéciaux, en minuscule."
                                />

                                <InputError :message="form.errors.username" />

                                <TextInput
                                    label="Adresse e-mail"
                                    id="email"
                                    type="email"
                                    class="mt-1 block w-full"
                                    v-model="form.email"
                                    required
                                    autocomplete="email"
                                />
                                <InputError :message="form.errors.email" />

                                <TextInput
                                    label="Mot de passe"
                                    type="password"
                                    class="mt-1 block w-full"
                                    v-model="form.password"
                                    required
                                    autocomplete="new-password"
                                />
                                <InputError :message="form.errors.password" />

                                <TextInput
                                    label="Confirmation du mot de passe"
                                    type="password"
                                    class="mt-1 block w-full"
                                    v-model="form.password_confirmation"
                                    required
                                    autocomplete="new-password"
                                />
                                <InputError
                                    :message="form.errors.password_confirmation"
                                />

                                <div class="mt-4 flex items-center justify-end">
                                    <Link
                                        :href="route('login')"
                                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                    >
                                        {{ $t('Déjà inscrit?') }}
                                    </Link>

                                    <button
                                        class="btn btn-primary ms-4"
                                        :class="{
                                            'opacity-25': form.processing,
                                        }"
                                        :disabled="form.processing"
                                    >
                                        {{ $t("S'inscrire") }}
                                    </button>
                                </div>
                            </Stack>
                        </form>
                    </Section>
                </Stack>
            </div>
        </div>
    </PageLayout>
</template>
