<script setup>
import LoadingButton from '@/Components/Elements/Button/LoadingButton.vue'
import InputError from '@/Components/Elements/Form/InputError.vue'
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Section from '@/Components/Layout/Section.vue'
import Text from '@/Components/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import { useForm } from '@inertiajs/vue3'

defineProps({
    status: {
        type: String,
    },
})

const form = useForm({
    email: '',
})

const submit = () => {
    form.post(route('password.email'))
}
</script>

<template>
    <PageLayout title="Mot de passe oublié">
        <Section>
            <Text>
                Tu as oublié ton mot de passe ? Pas de problème. Indique-nous
                ton adresse mail et on t'enverra un email qui te permettra d'en
                choisir un nouveau.
            </Text>

            <div
                v-if="status"
                class="mb-4 text-sm font-medium text-green-600 dark:text-green-400"
            >
                {{ status }}
            </div>

            <form @submit.prevent="submit">
                <TextInput
                    label="Adresse mail"
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
                        Recevoir le mail
                    </LoadingButton>
                </div>
            </form>
        </Section>
    </PageLayout>
</template>
