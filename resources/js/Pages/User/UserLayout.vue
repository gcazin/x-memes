<script setup>
import Avatar from '@/Components/Misc/Avatar.vue'
import Section from '@/Components/Layout/Section.vue'
import Navbar from '@/Partials/Navbar.vue'
import { usePage } from '@inertiajs/vue3'
import Footer from '@/Partials/Footer.vue'
import SubMenu from '@/Pages/User/Partials/SubMenu.vue'

const props = defineProps({
    user: {
        type: Array,
    },
    medias: {
        type: Array,
    },
})

const page = usePage()
const auth = page.props.auth?.user

const downloadMediaCount =
    props.user.medias && props.user.medias.length
        ? props.user.medias
              .map((media) => media.download_count)
              .reduce((accumulator, media) => accumulator + media)
        : 0
</script>

<template>
    <Navbar />

    <section class="relative block h-96">
        <!-- style="background: url(https://trustmyscience.com/wp-content/uploads/2018/09/definition-galaxie.jpeg)" -->
        <div class="absolute top-0 w-full h-full bg-center cover">
            <span class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <!--        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style="transform: translateZ(0px)">
                    <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>-->
    </section>

    <Section class="w-11/12 lg:w-9/12 text-center mx-auto mt-32 !p-0">
        <div class="container mx-auto">
            <div
                class="relative flex flex-col bg-base-300 shadow border border-base-100 rounded-lg -mt-64"
            >
                <div class="relative">
                    <Avatar :user="user" size="lg" class="absolute -m-16" />
                </div>
                <div class="w-full flex lg:text-left lg:self-center">
                    <div class="flex-1 p-4">
                        <div class="flex gap-1"></div>
                    </div>
                </div>
                <h3 class="text-4xl mt-10 py-2 font-semibold leading-normal">
                    {{ user.username }}
                </h3>
                <div class="flex gap-8 pt-4 pb-8 justify-center">
                    <div class="text-center">
                        <span
                            class="text-2xl font-bold block uppercase tracking-wide text-blueGray-600"
                        >
                            {{
                                'total' in medias ? medias.total : medias.length
                            }}
                        </span>
                        <span class="text-sm text-blueGray-400"
                            >Médias postés</span
                        >
                    </div>
                    <div class="text-center">
                        <span
                            class="text-2xl font-bold block uppercase tracking-wide text-blueGray-600"
                        >
                            {{ downloadMediaCount }}
                        </span>
                        <span class="text-sm text-blueGray-400"
                            >Téléchargements</span
                        >
                    </div>
                    <div class="text-center">
                        <span
                            class="text-2xl font-bold block uppercase tracking-wide text-blueGray-600"
                        >
                            {{ user.followers.length }}
                        </span>
                        <span class="text-sm text-blueGray-400">Followers</span>
                    </div>
                </div>

                <SubMenu :user="user" />
            </div>
        </div>
    </Section>

    <Section class="w-11/12 lg:w-9/12 mx-auto mt-8 !p-0">
        <slot />
    </Section>

    <Footer />
</template>

<style scoped></style>
