<script setup>
import PageLayout from "@/Layouts/PageLayout.vue";
import MediaGallery from "@/Pages/Medias/Partials/MediaGallery.vue";
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Misc/Tag.vue";
import RoleBadge from "@/Components/Misc/RoleBadge.vue";
import Avatar from "@/Components/Misc/Avatar.vue";
import Section from "@/Components/Layout/Section.vue";
import Navbar from "@/Partials/Navbar.vue";

const props = defineProps({
    user: {
        type: Object
    },
})

const downloadMediaCount = props.user.medias
    .map((media) => media.download_count)
    .reduce((accumulator, media) => accumulator + media)
</script>
<template>
    <Navbar />
    <section class="relative block h-96">
        <div class="absolute top-0 w-full h-full bg-center cover" style="background: url(https://trustmyscience.com/wp-content/uploads/2018/09/definition-galaxie.jpeg)">
            <span class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style="transform: translateZ(0px)">
            <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
        </div>
    </section>

    <Section class="w-9/12 text-center mx-auto mt-32 !p-0">
        <div class="container mx-auto">
            <div class="relative flex flex-col bg-base-300 shadow rounded-lg -mt-64">
                <div class="relative">
                    <Avatar size="lg" class="absolute -m-16" />
                </div>
                <div class="w-full lg:text-right lg:self-center">
                    <div class="p-4">
                        <button class="btn btn-primary" type="button">
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
                            {{ user.medias.length }}
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
    <!--        <template #subtitle>
                <Tag v-for="(badge, index) in user.badges" :key="index">
                    {{ badge.name }}
                </Tag>
            </template>-->

    <Section class="w-9/12 mx-auto mt-8 !p-0">
        <MediaGallery :medias="user.medias" number-of-cols="4" />
    </Section>
</template>
