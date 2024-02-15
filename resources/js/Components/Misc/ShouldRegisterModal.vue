<script setup>
import Text from '@/Components/Misc/Text.vue'
import Modal from '@/Components/Modal/Modal.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'
import SocialLogin from '@/Components/Misc/SocialLogin.vue'

defineProps({
    isClosable: {
        type: Boolean,
        default: true,
    }
})
</script>

<template>
    <Modal id="shouldRegisterModal" :is-closable max-width="xl">
        <Stack class="text-center">
            <Text type="subtitle">
                <slot name="title"></slot>
            </Text>

            <div class="carousel w-full mb-2">
                <div id="slide1" class="carousel-item relative w-full">
                    <div class="flex flex-col gap-4 items-center justify-center mx-auto w-full">
                        <Icon name="import" size="5xl" class="text-primary" />
                        <Text class="uppercase font-bold">{{ $t('Télécharge tes mèmes favoris')}}</Text>
                    </div>
                    <div class="absolute flex justify-between transform -translate-y-1/2 inset-x-0 top-1/2">
                        <a href="#slide4" class="btn btn-ghost">❮</a>
                        <a href="#slide2" class="btn btn-ghost">❯</a>
                    </div>
                </div>
                <div id="slide2" class="carousel-item relative w-full">
                    <div class="flex flex-col gap-4 items-center justify-center mx-auto">
                        <Icon name="heart" size="5xl" class="text-error" />
                        <Text class="uppercase font-bold">{{ $t('Ne les perds plus jamais')}}</Text>
                    </div>
                    <div class="absolute flex justify-between transform -translate-y-1/2 inset-x-0 top-1/2">
                        <a href="#slide1" class="btn btn-ghost">❮</a>
                        <a href="#slide3" class="btn btn-ghost">❯</a>
                    </div>
                </div>
                <div id="slide3" class="carousel-item relative w-full">
                    <div class="flex flex-col gap-4 items-center justify-center mx-auto">
                        <Icon name="comment-alt-lines" size="5xl" class="text-warning" />
                        <Text class="uppercase font-bold">{{ $t('Commente et discute')}}</Text>
                    </div>
                    <div class="absolute flex justify-between transform -translate-y-1/2 inset-x-0 top-1/2">
                        <a href="#slide2" class="btn btn-ghost">❮</a>
                        <a href="#slide4" class="btn btn-ghost">❯</a>
                    </div>
                </div>
                <div id="slide4" class="carousel-item relative w-full">
                    <div class="flex flex-col gap-4 items-center justify-center mx-auto">
                        <Icon name="chart-bar" size="5xl" class="text-secondary" />
                        <Text class="uppercase font-bold">{{ $t('Monte dans le classement')}}</Text>
                    </div>
                    <div class="absolute flex justify-between transform -translate-y-1/2 inset-x-0 top-1/2">
                        <a href="#slide3" class="btn btn-ghost">❮</a>
                        <a href="#slide1" class="btn btn-ghost">❯</a>
                    </div>
                </div>
            </div>

            <Text>
                <slot name="description"></slot>
            </Text>

            <SocialLogin is-in-a-modal />

            <div>
                <Text type="sub">
                    {{ $t('Déjà inscrit?') }}
                    <a class="font-bold" :href="route('login')">
                        {{ $t('Se connecter') }}
                    </a>
                </Text>
            </div>
        </Stack>
    </Modal>
</template>

<style scoped></style>
