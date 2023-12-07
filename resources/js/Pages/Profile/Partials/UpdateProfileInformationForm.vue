<script setup>
import InputError from '@/Components/Elements/Form/InputError.vue';
import InputLabel from '@/Components/Elements/Form/InputLabel.vue';
import TextInput from '@/Components/Elements/Form/TextInput.vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import {ref} from "vue";
import Avatar from "@/Components/Misc/Avatar.vue";

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const user = usePage().props.auth.user;
const avatar = ref(null)

console.log(user)
const form = useForm({
    name: user.name,
    email: user.email,
    description: null,
    avatar: null,
});

const editProfile = () => {
    form.avatar = avatar.value
    form.post(route('profile.update'), {
        _method: 'put'
    })
}

const handleAvatar = (event) => {
    avatar.value = event.target.files[0]
}
</script>

<template>
    <header>
        <h2 class="text-lg font-medium">Informations du profil</h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Mettez à jour les informations de profil et l'adresse email de votre compte.
        </p>
    </header>

    <form @submit.prevent="editProfile" class="mt-6 space-y-6">
        <Avatar size="lg" />
        <InputLabel for="name" value="Avatar" />
        <input
            type="file"
            class="file-input file-input-bordered file-input w-full"
            id="avatar"
            @input="handleAvatar"
        />
        <InputError class="mt-2" :message="form.errors.avatar" />

        <TextInput
            label="Nom"
            type="text"
            v-model="form.name"
            required
            autofocus
            autocomplete="name"
        />
        <InputError class="mt-2" :message="form.errors.name" />
        {{ form.name }}

        <TextInput
            label="Adresse e-mail"
            type="email"
            v-model="form.email"
            required
            autocomplete="username"
        />
        <InputError class="mt-2" :message="form.errors.email" />
        {{ form.email }}

        <TextInput
            label="Description"
            type="text"
            v-model="form.description"
            autofocus
            autocomplete="description"
        />
        <InputError class="mt-2" :message="form.errors.description" />

        <div v-if="mustVerifyEmail && user.email_verified_at === null">
            <p class="text-sm mt-2 text-gray-800 dark:text-gray-200">
                Votre adresse email n'est pas vérifiée.
                <Link
                    :href="route('verification.send')"
                    method="post"
                    as="button"
                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                    Cliquez ici pour renvoyer l'e-mail de vérification.
                </Link>
            </p>

            <div
                v-show="status === 'verification-link-sent'"
                class="mt-2 font-medium text-sm text-green-600 dark:text-green-400"
            >
                Un nouveau lien de vérification a été envoyé à votre adresse email.
            </div>
        </div>

        <div class="flex items-center gap-4">
            <button class="btn btn-primary" :disabled="form.processing">Sauvegarder</button>

            <Transition
                enter-active-class="transition ease-in-out"
                enter-from-class="opacity-0"
                leave-active-class="transition ease-in-out"
                leave-to-class="opacity-0"
            >
                <p v-if="form.recentlySuccessful" class="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
            </Transition>
        </div>
    </form>
</template>
