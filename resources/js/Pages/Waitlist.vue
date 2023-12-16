<script setup>
import {Head, Link, useForm} from '@inertiajs/vue3';
import PageLayout from "@/Layouts/PageLayout.vue";
import TextInput from "@/Components/Elements/Form/TextInput.vue";
import Icon from "@/Components/Misc/Icon.vue";
import Toast from "@/Components/Misc/Toast.vue";
import InputError from "@/Components/Elements/Form/InputError.vue";

defineProps({
    stage: {
        type: String,
    },
});

const form = useForm({
    email: null,
})

const submit = () => {
    form.post(route('waitlist.store'), {
        preserveScroll: true,
        onFinish: () => {
            form.reset()
        },
    });
};
</script>

<template>
    <Head title="Accueil" />

    <div class="lg:grid h-screen place-content-center px-4 waitlist-section">
        <div class="flex flex-col lg:flex-row lg:gap-20 py-5 lg:py-10 lg:px-20">
            <div class="flex-1 mb-10">
                <div class="text-center">
                    <img class="mask mask-squircle w-32 inline me-2 shadow mb-8" src="images/favicon-with-background.jpg" alt="">

                    <h1 class="text-3xl lg:text-5xl uppercase font-black mb-8">
                        <span
                            class="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 inline-block text-transparent bg-clip-text"
                        >
                            X-Memes
                        </span>, lui qui n'oubliera jamais
                    </h1>

                    <p class="text-xl lg:text-2xl mb-8">
                        <span class="text-primary">
                            Une image ou une vidéo
                        </span> t'a fait (sou)rire sur X, et <span class="text-error-content">impossible de remettre la main dessus</span>?
                        Je comprends cette frustration, ça m'est arrivé aussi... j'ai donc décidé de créer un site web pour y remédier!
                    </p>

                    <p class="text-xl lg:text-2xl mb-8">
                        Je t'offre donc durant un temps limité la possibilité de t'inscrire et d'avoir un accès anticipé pour ma/notre futur plateforme.
                    </p>

                    <p class="text-base lg:text-lg mb-8 italic font-bold">
                        Les places sont très limitées et l'inscription sera fermée dans très peu de temps.
                    </p>

                    <form v-if="!form.wasSuccessful" class="flex flex-col gap-2 w-full" @submit.prevent="submit">
                        <TextInput
                            type="email"
                            v-model="form.email"
                            required
                            placeholder="Adresse email"
                            autocomplete="email"
                            autofocus
                        />

                        <InputError :message="form.errors.email" />

                        <button class="btn btn-primary text-lg" :disabled="form.processing">
                            Je rejoins la waitlist !
                        </button>
                    </form>
                    <div v-else>
                        <p class="text-xl mb-8 font-bold text-success">
                            Ton inscription a bien été prise en compte, tu recevras un mail sous peu !
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex-1">
                <p class="mb-2"><span class="font-bold">Aperçu de la plateforme</span> (en cours de développement)</p>
                <img class="w-full shadow border-2 border-primary/50 rounded mb-4" src="images/home.png" alt="">

                <p class="text-lg lg:text-xl mb-2">
                    En t'inscrivant, tu bénéficieras de ces
                    <span class="font-bold">avantages suivants</span> :
                </p>

                <div class="text-lg lg:text-xl space-y-1 mb-4">
                    <p><Icon class="text-success" name="checkbox" /> Un accès anticipé à la plateforme. 🚀</p>
                    <p><Icon class="text-success" name="checkbox" /> Un badge exclusif aux alpha/bêta testeurs. 👑</p>
                    <p><Icon class="text-success" name="checkbox" /> Un accès anticipés aux futurs fonctionnalités. 🤫</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.waitlist-section {
    background-color: #0c111e;
    background-size: contain;
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.003' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");}
</style>
