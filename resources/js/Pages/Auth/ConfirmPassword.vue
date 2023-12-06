<script setup>
import InputError from '@/Components/Elements/Form/InputError.vue';
import TextInput from '@/Components/Elements/Form/TextInput.vue';
import { Head, useForm } from '@inertiajs/vue3';
import PageLayout from "@/Layouts/PageLayout.vue";

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <PageLayout title="Confirmation du mot de passe">
        <Head title="Confirmation du mot de passe" />

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            This is a secure area of the application. Please confirm your password before continuing.
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
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="flex justify-end mt-4">
                <button class="btn btn-primary ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Confirm
                </button>
            </div>
        </form>
    </PageLayout>
</template>
