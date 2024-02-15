<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Container from '@/Layouts/Partials/Container.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import { Head, usePage } from '@inertiajs/vue3'

defineProps({
    stage: {
        type: String,
    },
})

const page = usePage()
const auth = page.props.auth

const features = [
    {
        icon: 'plus',
        description: 'Poste, aime, et commente tes mèmes préférés.',
    },
    {
        icon: 'eye',
        description: 'Suis les personnes que tu as envie.',
    },
    {
        icon: 'award',
        description:
            'Des badges décernés en fonction de ton activité sur le site.',
    },
    {
        icon: 'chart-bar-alt',
        description:
            'Un classement des utilisateurs les plus actifs en fonction des points gagnés.',
    },
]
</script>

<template>
    <Head :title="page.props.seo.title" />
    <PageLayout is-full-size>
        <div
            class="hero relative flex flex-col justify-center dark:border-b dark:border-slate-100/5 dark:bg-bottom"
        >
            <Container>
                <div class="flex px-0 text-center text-center">
                    <a
                        class="mx-auto"
                        href="https://www.producthunt.com/posts/x-memes?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-x&#0045;memes"
                        target="_blank"
                    >
                        <img
                            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=439484&theme=light"
                            alt="X&#0045;Memes - Say&#0032;goodbye&#0032;to&#0032;forgotten&#0032;memes | Product Hunt"
                            style="width: 250px; height: 54px"
                            width="250"
                            height="54"
                        />
                    </a>
                </div>
                <div class="hero-content mx-auto px-0 pt-12 text-center">
                    <!-- lg:pt-24 -->
                    <div class="flex flex-col">
                        <img
                            class="mask mask-squircle mx-auto mb-8 w-32 text-center shadow"
                            src="/images/favicon-with-background.jpg"
                            alt="Logo du site X-Memes"
                        />
                        <h1 class="text-3xl font-bold lg:text-5xl">
                            {{
                                $t(
                                    'La plateforme qui te permet de retrouver tes mèmes préférés!'
                                )
                            }}
                        </h1>
                        <p class="py-6 lg:text-xl">
                            {{
                                $t(
                                    "X-Memes est une plateforme où tu peux t'inscrire, publier et voir les mèmes que la communauté a posté."
                                )
                            }}
                        </p>
                        <div class="space-x-2">
                            <a
                                :href="route('library')"
                                class="btn btn-primary btn-lg"
                            >
                                <Text type="sub">{{ $t('Découvrir') }}</Text>
                            </a>
                            <a
                                :href="
                                    auth.isConnected
                                        ? route('user.show', auth.user.username)
                                        : route('login')
                                "
                                class="btn btn-outline btn-secondary btn-lg"
                            >
                                <Text type="sub">{{
                                    $t(
                                        auth.isConnected
                                            ? 'Voir mon profil'
                                            : 'Se connecter'
                                    )
                                }}</Text>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
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
                        <img
                            src="/images/misc/blob.svg"
                            alt="Fond pointillé image d'accueil"
                        />
                    </div>
                    <div class="absolute -right-6 -top-6 z-[-1]">
                        <img
                            src="/images/misc/blob.svg"
                            alt="Fond pointillé image d'accueil"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-base-300 pb-16 pt-20">
            <Container>
                <Stack>
                    <p class="font-bold uppercase text-primary">
                        {{ $t('Services') }}
                    </p>
                    <h2 class="text-4xl">{{ $t('Fonctionnalités') }}</h2>
                    <p class="text-xl">
                        {{
                            $t(
                                "X-Memes t'offre une variété de fonctionnalités, " +
                                    'entre autres, te permettant de poster, ' +
                                    'télécharger et suivre les personnes que tu aimes.'
                            )
                        }}
                    </p>
                    <div
                        class="grid grid-cols-1 gap-8 py-16 text-center md:grid-cols-2 lg:grid-cols-3 lg:gap-16 xl:grid-cols-4"
                    >
                        <div
                            class="flex-1"
                            v-for="(feature, index) in features"
                            :key="index"
                        >
                            <Stack spacing="8">
                                <Icon
                                    class="rounded-full bg-primary px-5 py-4 text-white"
                                    size="4xl"
                                    :name="feature.icon"
                                />
                                <p class="text-xl">
                                    {{ $t(feature.description) }}
                                </p>
                            </Stack>
                        </div>
                    </div>
                </Stack>
            </Container>
        </div>

        <Container>
            <div class="pb-16 pt-20 text-center lg:px-0">
                <Stack class="mb-16">
                    <Text class="font-bold uppercase text-primary">FAQ</Text>
                    <h2 class="text-4xl">{{ $t('Une question ?') }}</h2>
                    <p class="text-xl">
                        {{
                            $t(
                                'Réponse aux questions les plus fréquemment posées.'
                            )
                        }}
                    </p>
                </Stack>
                <div class="flex flex-wrap">
                    <div class="flex flex-1 flex-col gap-12">
                        <div class="flex">
                            <div
                                class="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
                            >
                                <Icon class="text-4xl" name="bug" />
                            </div>
                            <div class="w-full text-left">
                                <h3
                                    class="mb-4 text-xl font-semibold sm:text-2xl lg:text-xl xl:text-2xl"
                                >
                                    {{ $t("J'ai rencontré un bug :(") }}
                                </h3>
                                <Text>
                                    {{
                                        $t(
                                            'Si tu as trouvé un bug, tu peux me contacter sur X'
                                        )
                                    }}
                                    (<a
                                        class="link-primary"
                                        href="https://twitter.com/gcazinonx"
                                        target="_blank"
                                        >@gcazinonx</a
                                    >).
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </PageLayout>
</template>

<style></style>
