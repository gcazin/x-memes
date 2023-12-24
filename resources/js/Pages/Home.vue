<script setup>
import TextInput from '@/Components/Elements/Form/TextInput.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import formService from '@/Services/form.service.js'
import { Head, useForm } from '@inertiajs/vue3'

defineProps({
    stage: {
        type: String,
    },
    waitlist: {
        type: Array,
    },
})

const form = useForm({
    email: null,
})
const numberOfPlaces = 10

formService.setForm(form).setRouteName('waitlist')
</script>

<template>
    <Head title="Waitlist" />
    <PageLayout :has-header="false" :has-navbar="false" is-full-size>
        <div
            class="hero relative flex flex-col justify-center dark:border-b dark:border-slate-100/5 dark:bg-bottom"
        >
            <div class="hero-content pt-12 text-center lg:pt-24">
                <div class="flex flex-col">
                    <img
                        class="mask mask-squircle mx-auto mb-8 w-32 shadow"
                        src="images/favicon-with-background.jpg"
                        alt=""
                    />
                    <h1 class="text-3xl font-bold lg:text-5xl">
                        La plateforme qui te permet de retrouver tes mèmes
                        préférés!
                    </h1>
                    <p class="py-6 lg:text-xl">
                        X-Memes est une plateforme où tu peux t'inscrire,
                        publier et voir les mèmes que la communauté a posté.
                    </p>
                    <div v-if="stage !== 'alpha'" class="space-x-2">
                        <button class="btn btn-primary btn-lg">
                            Découvrir
                        </button>
                        <button class="btn btn-outline btn-primary btn-lg">
                            Se connecter
                        </button>
                    </div>
                    <template v-else>
                        <div class="mb-8 flex-1">
                            <Stack>
                                <p class="text-lg lg:text-xl">
                                    En t'inscrivant à la waitlist, tu
                                    bénéficieras de ces
                                    <span class="font-bold"
                                        >avantages suivants</span
                                    >
                                    :
                                </p>

                                <div class="space-y-1 text-lg lg:text-xl">
                                    <p>
                                        <Icon
                                            class="text-success"
                                            name="checkbox"
                                        />
                                        Un accès anticipé à la plateforme.
                                    </p>
                                    <p>
                                        <Icon
                                            class="text-success"
                                            name="checkbox"
                                        />
                                        Un badge exclusif aux alpha/bêta
                                        testeurs.
                                    </p>
                                    <p>
                                        <Icon
                                            class="text-success"
                                            name="checkbox"
                                        />
                                        Un accès anticipés aux futurs
                                        fonctionnalités.
                                    </p>
                                </div>
                            </Stack>
                        </div>
                        <div
                            v-if="waitlist.length < numberOfPlaces"
                            class="w-full lg:mx-auto lg:w-7/12"
                        >
                            <form
                                v-if="!form.wasSuccessful"
                                class="flex w-full flex-col gap-2"
                                @submit.prevent="formService.handle('store')"
                            >
                                <TextInput
                                    type="email"
                                    v-model="form.email"
                                    required
                                    placeholder="xmemes@example.com"
                                    autocomplete="email"
                                    autofocus
                                />

                                <button
                                    class="btn btn-primary text-lg"
                                    :disabled="form.processing"
                                >
                                    Je rejoins la waitlist ! ({{
                                        numberOfPlaces - waitlist.length
                                    }}
                                    places restantes)
                                </button>
                            </form>
                        </div>
                        <div
                            v-if="form.wasSuccessful"
                            class="w-full lg:mx-auto lg:w-7/12"
                        >
                            <div
                                class="alert alert-success mt-8 justify-center"
                            >
                                Ton inscription a bien été prise en compte, tu
                                recevras un mail sous peu !
                            </div>
                        </div>
                        <div
                            v-if="waitlist.length === numberOfPlaces"
                            class="mt-6 w-full text-xl text-info lg:mx-auto lg:w-7/12"
                        >
                            L'inscription est malheureusement terminée. :/
                            <p>
                                Toutes les places d'alpha testeurs ont été
                                distribué.
                            </p>
                            <p>
                                Tu peux toujours me
                                <a
                                    class="link-secondary"
                                    href="https://twitter.com/gcazinonx"
                                    target="_blank"
                                    >suivre</a
                                >
                                sur X pour être au courant des prochaines
                                sessions !
                            </p>
                        </div>
                    </template>
                </div>
            </div>
            <div class="w-full px-4">
                <div
                    class="wow fadeInUp relative z-10 mx-auto max-w-[850px]"
                    data-wow-delay=".25s"
                    style="visibility: visible; animation-delay: 0.25s"
                >
                    <div class="mt-16">
                        <img
                            src="/images/home.png"
                            alt="hero"
                            class="mx-auto max-w-full"
                        />
                    </div>
                    <div class="absolute -left-9 bottom-0 z-[-1]">
                        <img src="/images/misc/blob.svg" alt="" />
                    </div>
                    <div class="absolute -right-6 -top-6 z-[-1]">
                        <img src="/images/misc/blob.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>

        <div class="relative bg-base-300 px-8 pb-16 pt-20 text-center lg:px-0">
            <Stack>
                <p class="font-bold uppercase text-primary">Services</p>
                <h2 class="text-4xl">Fonctionnalités</h2>
                <p class="text-xl">
                    X-Memes t'offre une variété de fonctionnalités te permettant
                    de poster, télécharger et suivre les personnes que tu aimes.
                </p>
                <div
                    class="mx-auto grid grid-cols-1 gap-16 py-16 lg:w-9/12 lg:grid-cols-5"
                >
                    <div class="flex-1">
                        <Stack>
                            <Icon
                                class="rounded-full bg-primary p-4"
                                size="5xl"
                                name="add"
                            />
                            <p class="text-xl">Poste tes mèmes préférés.</p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon
                                class="rounded-full bg-primary p-4"
                                size="5xl"
                                name="image"
                            />
                            <p class="text-xl">
                                Retrouve tes mèmes préférés à un seul et même
                                endroit.
                            </p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon
                                class="rounded-full bg-primary p-4"
                                size="5xl"
                                name="eye"
                            />
                            <p class="text-xl">
                                Suis les personnes que tu as envie.
                            </p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon
                                class="rounded-full bg-primary p-4"
                                size="5xl"
                                name="diamond"
                            />
                            <p class="text-xl">
                                Des badges décernés en fonction de ton activité
                                sur le site.
                            </p>
                        </Stack>
                    </div>
                    <div class="flex-1">
                        <Stack>
                            <Icon
                                class="rounded-full bg-primary p-4"
                                size="5xl"
                                name="people"
                            />
                            <p class="text-xl">
                                Un classement des utilisateurs les plus actifs.
                            </p>
                        </Stack>
                    </div>
                </div>
            </Stack>
        </div>

        <div class="relative px-8 pb-16 pt-20 text-center lg:px-0">
            <div class="relative">
                <Stack class="mb-16">
                    <p class="font-bold uppercase text-primary">FAQ</p>
                    <h2 class="text-4xl">Une question ?</h2>
                    <p class="text-xl">
                        Si tu trouves pas la réponse à ta question, ou si tu as
                        une suggestion, tu peux me contacter sur X
                        <a
                            class="link-primary"
                            href="https://twitter.com/gcazinonx"
                            >ici</a
                        >.
                    </p>
                </Stack>
                <div class="mx-auto flex flex-wrap lg:w-9/12">
                    <div class="w-full px-4">
                        <div class="mb-12 flex lg:mb-[70px]">
                            <div
                                class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
                            >
                                <Icon class="text-4xl" name="help-circle" />
                            </div>
                            <div class="w-full text-left">
                                <h3
                                    class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                                >
                                    J'ai rencontré un bug
                                </h3>
                                <p>
                                    Tu peux me contacter sur X
                                    <a
                                        class="link-primary"
                                        href="https://twitter.com/gcazinonx"
                                        target="_blank"
                                        >ici</a
                                    >
                                    si jamais tu as trouvé un bug.
                                </p>
                            </div>
                        </div>
                        <div class="mb-12 flex lg:mb-[70px]">
                            <div
                                class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
                            >
                                <Icon class="text-4xl" name="help-circle" />
                            </div>
                            <div class="w-full text-left">
                                <h3
                                    class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                                >
                                    Le site est en alpha?
                                </h3>
                                <p>
                                    Effectivement, le site est encore en alpha
                                    pour l'instant, les fonctionnalités de base
                                    y sont présentes, mais encore de nombreuses
                                    nouveautés sont en préparation. 🤫
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--                <div class="w-full px-4 lg:w-1/2">
                                        <div class="mb-12 flex lg:mb-[70px]">
                                            <div class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]">
                                                <Icon class="text-4xl" name="help-circle" />
                                            </div>
                                            <div class="w-full text-left">
                                                <h3 class="mb-6 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl">
                                                    Comment faire pour poster un mème?
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
                                                        (Pour éviter toutes dérives, tout les mèmes envoyés sont approuvés manuellement par un administrateur)
                                                    </p>
                                                </Stack>
                                            </div>
                                        </div>
                                    </div>-->
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<style></style>
