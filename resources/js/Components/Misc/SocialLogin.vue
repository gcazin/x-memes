<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'

const props = defineProps({
    isLogin: {
        type: Boolean,
        default: true,
    },
    isInAModal: {
        type: Boolean,
        default: false,
    },
})

const text = props.isLogin ? 'Se connecter' : "S'inscrire"
</script>

<template>
    <div
        class="flex flex-grow gap-4"
        :class="{ 'flex-col': isInAModal, 'flex-col lg:flex-row': !isInAModal }"
    >
        <a
            :href="route('socialite.redirect', 'google')"
            class="btn relative flex-1 focus"
            :class="{ 'btn-neutral': isInAModal, 'btn-light': !isInAModal }"
        >
            <div class="flex items-center justify-center gap-4">
                <div class="absolute left-3">
                    <svg
                        width="25"
                        height="25"
                        viewBox="0 0 256 262"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                    >
                        <path
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            fill="#4285F4"
                        />
                        <path
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            fill="#34A853"
                        />
                        <path
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            fill="#FBBC05"
                        />
                        <path
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            fill="#EB4335"
                        />
                    </svg>
                </div>
                <Text type="sub">{{ $t(`${text} avec Google`) }}</Text>
            </div>
        </a>
        <a
            :href="route('socialite.redirect', 'twitter')"
            class="btn relative flex-1"
            :class="{ 'btn-neutral': isInAModal, 'btn-light': !isInAModal }"
        >
            <div class="flex items-center justify-center gap-4">
                <div class="absolute left-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 1200 1227"
                    >
                        <path
                            fill="#fff"
                            d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                        />
                    </svg>
                </div>
                <Text type="sub">{{ $t(`${text} avec X`) }}</Text>
            </div>
        </a>
        <a
            :href="route('socialite.redirect', 'github')"
            class="btn relative flex-1"
            :class="{ 'btn-neutral': isInAModal, 'btn-light': !isInAModal }"
        >
            <div class="flex items-center justify-center gap-4">
                <div class="absolute left-2">
                    <Icon name="github" size="3xl" />
                </div>
                <Text type="sub">{{ $t(`${text} avec GitHub`) }}</Text>
            </div>
        </a>
        <a
            v-if="isInAModal"
            :href="route('register')"
            class="btn relative flex-1"
            :class="{ 'btn-neutral': isInAModal, 'btn-light': !isInAModal }"
        >
            <div class="flex items-center justify-between gap-4">
                <div class="flex-1">
                    <Text type="sub">{{ $t(`Utiliser une adresse email`) }}</Text>
                </div>
            </div>
        </a>
    </div>
    <div v-if="!isInAModal" class="divider">{{ $t('OU') }}</div>
</template>

<style scoped></style>
