<script setup>
import LoadingButton from '@/Components/Button/LoadingButton.vue'
import InputError from '@/Components/Form/InputError.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import Text from '@/Components/Misc/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import { useForm, usePage } from '@inertiajs/vue3'

defineProps({
    status: {
        type: String,
    },
})

const page = usePage()
const form = useForm({
    email: '',
})

const submit = () => {
    form.post(route('password.email'))
}
</script>

<template>
    <PageLayout :title="page.props.seo.title">
        <Section>
            <Text>
                {{
                    $t(
                        "Tu as oublié ton mot de passe ? Pas de problème. Indique-nous ton adresse mail et on t'enverra un email qui te permettra d'en choisir un nouveau."
                    )
                }}
            </Text>

            <div
                v-if="status"
                class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"
            >
                {{ status }}
            </div>

            <form @submit.prevent="submit">
                <TextInput
                    label="Adresse e-mail"
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError :message="form.errors.email" />

                <div class="mt-4 flex items-center justify-end">
                    <LoadingButton
                        :loading="form.processing"
                        :disabled="form.processing"
                    >
                        {{ $t("Recevoir l'email") }}
                    </LoadingButton>
                </div>
            </form>
        </Section>
    </PageLayout>
</template>
