<script setup>
import PageLayout from "@/Layouts/PageLayout.vue";
import MediaGallery from "@/Pages/Medias/Partials/MediaGallery.vue";
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Misc/Tag.vue";
import RoleBadge from "@/Components/Misc/RoleBadge.vue";
import Avatar from "@/Components/Misc/Avatar.vue";
import Section from "@/Components/Layout/Section.vue";
import Navbar from "@/Partials/Navbar.vue";
import {usePage} from "@inertiajs/vue3";
import Footer from "@/Partials/Footer.vue";
import Icon from "@/Components/Misc/Icon.vue";

const props = defineProps({
    user: {
        type: Object
    },
    medias: {
        type: Object
    }
})

const page = usePage()
const auth = page.props.auth ?? null

const downloadMediaCount = props.medias && props.medias.length ? props.medias
    .map((media) => media.download_count)
    .reduce((accumulator, media) => accumulator + media) : 0
</script>
<template>
    <Navbar />
    <section class="relative block h-96">
        <!-- style="background: url(https://trustmyscience.com/wp-content/uploads/2018/09/definition-galaxie.jpeg)" -->
        <div
            class="absolute top-0 w-full h-full bg-center cover"
        >
            <span class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style="transform: translateZ(0px)">
            <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
        </div>
    </section>

    <Section class="w-11/12 lg:w-9/12 text-center mx-auto mt-32 !p-0">
        <div class="container mx-auto">
            <div class="relative flex flex-col bg-base-300 shadow rounded-lg -mt-64">
                <div class="relative">
                    <Avatar size="lg" class="absolute -m-16" />
                </div>
                <div class="w-full flex lg:text-left lg:self-center">
                    <div class="flex-1 p-4">
                        <div class="flex gap-1">
                            <template
                                v-for="(badge, index) in user.badges"
                                :key="index"
                            >
                                <div class="tooltip tooltip-primary" :data-tip="badge.description">
                                    <img
                                        class="w-10"
                                        :src="`/storage/${badge.filename}`"
                                        :alt="badge.name"
                                    >
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="flex-1 text-right space-x-2 p-4">
                        <a
                            v-if="user.id === auth.user.id"
                            :href="route('profile.edit')"
                            class="btn btn-neutral btn-outline"
                        >
                            <Icon name="create" size="xl" />
                        </a>
                        <button v-else class="btn btn-primary" type="button">
                            Suivre
                        </button>
                    </div>
                </div>
                <h3 class="text-4xl py-2 font-semibold leading-normal">
                    {{ user.username }}
                </h3>
                <div class="flex gap-8 pt-4 pb-8 justify-center">
                    <div class="text-center">
                        <span
                            class="text-2xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {{ user.medias ? user.medias.length : 0 }}
                        </span>
                        <span class="text-sm text-blueGray-400">Médias postés</span>
                    </div>
                    <div class="text-center">
                        <span
                            class="text-2xl font-bold block uppercase tracking-wide text-blueGray-600"
                        >
                            {{ downloadMediaCount }}
                        </span>
                        <span class="text-sm text-blueGray-400">Téléchargements</span>
                    </div>
                    <div class="text-center">
                        <span
                            class="text-2xl font-bold block uppercase tracking-wide text-blueGray-600"
                        >
                            0
                        </span>
                        <span class="text-sm text-blueGray-400">followers</span>
                    </div>
                </div>
            </div>
        </div>
    </Section>

    <Section class="w-11/12 lg:w-9/12 text-center mx-auto mt-8 !p-0">
        <MediaGallery :medias="medias" number-of-cols="4" />
    </Section>

    <Footer />
</template>
