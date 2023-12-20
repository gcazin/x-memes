<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PageLayout from "@/Layouts/PageLayout.vue";
import Icon from "@/Components/Misc/Icon.vue";
import Stack from "@/Components/Layout/Stack.vue";
import Section from "@/Components/Layout/Section.vue";

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <Head title="Accueil" />
    <PageLayout :header="false" full-size>
        <div class="hero flex flex-col justify-center bg-primary/40">
            <div class="hero-content pt-40 text-center">
                <div class="flex flex-col">
                    <h1 class="text-5xl font-bold">Première plateforme permettant de retrouver tes memes préférés!</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div class="space-x-2">
                        <button class="btn btn-primary btn-lg">Découvrir</button>
                        <button class="btn btn-primary btn-outline btn-lg">Se connecter</button>
                    </div>
                </div>
            </div>
            <div class="w-full px-4">
                <div class="wow fadeInUp relative z-10 mx-auto max-w-[850px]" data-wow-delay=".25s" style="visibility: visible; animation-delay: 0.25s;">
                    <div class="mt-16">
                        <img src="/images/home.png" alt="hero" class="mx-auto max-w-full rounded-t-xl rounded-tr-xl">
                    </div>
                    <div class="absolute -left-9 bottom-0 z-[-1]">
                        <img src="/images/misc/blob.svg" alt="">
                    </div>
                    <div class="absolute -right-6 -top-6 z-[-1]">
                        <img src="/images/misc/blob.svg" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-20 pb-16 bg-base-200 text-center">
            <Stack>
                <p class="uppercase text-primary font-bold">Services</p>
                <h2 class="text-4xl">Fonctionnalités</h2>
                <p class="text-xl">
                    <a class="link-primary" :href="route('index')">X-Memes</a> t'offre une variété de fonctionnalités te permettant de poster, télécharger et suivre les personnes que tu aimes.
                </p>
                <div class="flex lg:w-9/12 mx-auto py-16 gap-16">
                    <div class="flex-1">
                        <Stack>
                            <Icon class="bg-primary rounded-lg p-4" size="5xl" name="add" />
                            <p class="text-xl">Poste tes mêmes préférés.</p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon class="bg-primary rounded-full p-4" size="5xl" name="image" />
                            <p class="text-xl">Retrouve tes mêmes préférés à un seul et même endroit.</p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon class="bg-primary rounded-full p-4" size="5xl" name="eye" />
                            <p class="text-xl">Suis les personnes que tu as envie.</p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon class="bg-primary rounded-lg p-4" size="5xl" name="diamond" />
                            <p class="text-xl">Des badges décernés en fonction de ton activité sur le site.</p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon class="bg-primary rounded-lg p-4" size="5xl" name="people" />
                            <p class="text-xl">Un classement des utilisateurs les plus actifs.</p>
                        </Stack>
                    </div>
                </div>
            </Stack>
        </div>

        <div class="pt-20 pb-16 bg-base-300 text-center">
            <Stack class="mb-16">
                <p class="uppercase text-primary font-bold">FAQ</p>
                <h2 class="text-4xl">Une question ?</h2>
                <p class="text-xl">
                    Si tu trouves pas la réponse à ta question, ou si tu as une suggestion,
                    tu peux me contacter sur X <a class="link-primary" href="https://twitter.com/gcazinonx">ici</a>.
                </p>
            </Stack>
            <div class="flex flex-wrap lg:w-9/12 mx-auto">
                <div class="w-full px-4 lg:w-1/2">
                    <div class="mb-12 flex lg:mb-[70px]">
                        <div class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]">
                            <Icon class="text-4xl" name="help-circle" />
                        </div>
                        <div class="w-full text-left">
                            <h3 class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                                J'ai rencontré un bug
                            </h3>
                            <p>
                                Tu peux me contacter sur X
                                <a class="link-primary" href="https://twitter.com/gcazinonx" target="_blank">ici</a>
                                si jamais tu as trouvé un bug.
                            </p>
                        </div>
                    </div>
                    <div class="mb-12 flex lg:mb-[70px]">
                        <div class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]">
                            <Icon class="text-4xl" name="help-circle" />
                        </div>
                        <div class="w-full text-left">
                            <h3 class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                                Le site est en alpha?
                            </h3>
                            <p>
                                Effectivement, le site est encore en alpha pour l'instant,
                                les fonctionnalités de base y sont présentes, mais encore de nombreuses nouveautés sont en préparation. 🤫
                            </p>
                        </div>
                    </div>
                </div>
                <div class="w-full px-4 lg:w-1/2">
                    <div class="mb-12 flex lg:mb-[70px]">
                        <div class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]">
                            <Icon class="text-4xl" name="help-circle" />
                        </div>
                        <div class="w-full text-left">
                            <h3 class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                                Comment je fais pour poster un même?
                            </h3>
                            <Stack spacing="2">
                                <p>
                                    C'est très simple !
                                </p>
                                <p>
                                    Tu t'inscris, tu cliques sur "Bibliothèque" en haut, tu auras un bouton "Ajouter un média",
                                    tu remplis le formulaire et c'est tout !
                                </p>
                                <p class="font-bold">
                                    (Pour éviter toutes dérives, tout les médias envoyés sont approuvés manuellement par un administrateur)
                                </p>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
