<script setup>
import InputError from '@/Components/Form/InputError.vue'
import TextInput from '@/Components/Form/TextInput.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import { useForm } from '@inertiajs/vue3'

const form = useForm({
    password: '',
})

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    })
}
</script>

<template>
    <PageLayout title="Confirmation du mot de passe">
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            This is a secure area of the application. Please confirm your
            password before continuing.
        </div>

        <form @submit.prevent="submit">
            <div>
                <TextInput
                    label="Mot de passe"
                    type="password"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                    autofocus
                />
                <InputError :message="form.errors.password" />
            </div>

            <div class="mt-4 flex justify-end">
                <button
                    class="btn btn-primary ms-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Confirm
                </button>
            </div>
        </form>
    </PageLayout>
</template>
