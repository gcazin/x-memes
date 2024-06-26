<script setup>
import MediaItem from '@/Components/Media/MediaItem.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import Avatar from '@/Components/User/Avatar.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Container from '@/Layouts/Partials/Container.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import BlogLayout from '@/Pages/Post/Partials/BlogLayout.vue'
import Post from '@/Pages/Post/Partials/Post.vue'
import { Head, usePage } from '@inertiajs/vue3'

defineProps({
    users: {
        type: Array,
    },
    totalUsers: {
        type: Number,
    },
    medias: {
        type: Array,
    },
    posts: {
        type: Array,
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
                <div
                    class="hero-content mx-auto px-0 pt-12 text-center lg:pt-16"
                >
                    <div class="flex flex-col">
                        <Stack spacing="2">
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
                                        "X-Memes est une plateforme où tu peux t'inscrire, publier et voir les mèmes que la communauté a postés."
                                    )
                                }}
                            </p>
                            <div class="pb-6">
                                <Text class="mb-1 font-bold"
                                    >Déjà plus de
                                    {{ totalUsers }} inscrits!</Text
                                >

                                <div
                                    class="avatar-group justify-center -space-x-6 rtl:space-x-reverse"
                                >
                                    <Avatar
                                        v-for="(user, index) in users"
                                        :key="index"
                                        :user="user"
                                        custom-size="w-12"
                                    />
                                    <div class="avatar placeholder">
                                        <div
                                            class="w-12 bg-neutral text-neutral-content"
                                        >
                                            <a :href="route('leaderboard')"
                                                >+{{
                                                    totalUsers - users.length
                                                }}</a
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="space-x-2">
                                <a
                                    :href="route('library')"
                                    class="btn btn-primary btn-lg"
                                >
                                    <Text type="sub">{{
                                        $t('Découvrir')
                                    }}</Text>
                                </a>
                                <a
                                    :href="
                                        auth.isConnected
                                            ? route(
                                                  'user.show',
                                                  auth.user.username
                                              )
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
                        </Stack>
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

        <div class="bg-base-300 py-14">
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
                        class="grid grid-cols-1 gap-8 pt-16 text-center md:grid-cols-2 lg:grid-cols-3 lg:gap-16 xl:grid-cols-4"
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

        <div class="py-14">
            <Container>
                <Stack>
                    <p class="font-bold uppercase text-primary">
                        {{ $t('Blog') }}
                    </p>
                    <h2 class="text-4xl">{{ $t('Articles') }}</h2>
                    <BlogLayout>
                        <Post
                            v-if="posts.length"
                            v-for="(post, index) in posts"
                            :key="index"
                            :post
                        />
                        <template v-else>
                            <Text>Aucun articles de blog n'a été publié.</Text>
                        </template>
                    </BlogLayout>
                    <div class="text-center">
                        <a
                            :href="route('post.index')"
                            class="btn btn-outline btn-primary"
                        >
                            {{ $t('Voir tout') }}
                        </a>
                    </div>
                </Stack>
            </Container>
        </div>

        <div class="bg-base-300 py-14">
            <Container>
                <Stack>
                    <p class="font-bold uppercase text-primary">
                        {{ $t('Nouveautés') }}
                    </p>
                    <h2 class="text-4xl">
                        {{ $t('Dernières mèmes publiés') }}
                    </h2>
                    <div
                        v-if="medias.length"
                        class="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3"
                    >
                        <div
                            v-for="(media, index) in medias"
                            :key="index"
                            class="animate-[pulse_0.5s_ease-in-out]"
                        >
                            <MediaItem :media="media" />
                        </div>
                    </div>
                    <template v-else>
                        <Text>{{ $t("Aucun mèmes n'a été publié.") }}</Text>
                    </template>
                    <div class="text-center">
                        <a
                            :href="route('library')"
                            class="btn btn-outline btn-primary"
                        >
                            {{ $t('Voir tout') }}
                        </a>
                    </div>
                </Stack>
            </Container>
        </div>

        <div class="py-14 text-center lg:px-0">
            <Container>
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
            </Container>
        </div>
    </PageLayout>
</template>

<style></style>
