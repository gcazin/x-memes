<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import moment from 'moment'
</script>

<template>
    <footer
        class="footer footer-center rounded bg-base-200 py-8 text-base-content"
    >
        <nav class="grid grid-flow-col gap-4">
            <a :href="route('changelog')" class="link-hover link">
                <Text type="sub">{{ $t('Journal des modifications') }}</Text>
            </a>
            -
            <a :href="route('post.index')" class="link-hover link">
                <Text type="sub">{{ $t('Blog') }}</Text>
            </a>
            -
            <a href="mailto:contact@guillaume-cazin.fr" class="link-hover link">
                <Text type="sub">Contact</Text>
            </a>
        </nav>
        <nav>
            <div class="grid grid-flow-col items-center gap-4">
                <a
                    href="https://twitter.com/xmemesdotcom"
                    target="_blank"
                    aria-label="X de X-Memes"
                >
                    <img class="w-5" src="/images/misc/x.svg" alt="Logo de X" />
                </a>
                <a
                    href="https://github.com/gcazin/x-memes"
                    target="_blank"
                    aria-label="GitHub de X-Memes"
                >
                    <Icon name="github" size="3xl" />
                </a>
            </div>
        </nav>
        <aside>
            <Text type="sub">
                Copyright © {{ moment().year() }} -
                {{ $t('Tous droits réservés par X-Memes.') }}
            </Text>
            <Text type="sub">
                {{ $t('Développé avec ❤️ par') }}
                <a
                    class="link link-secondary font-bold"
                    href="https://www.guillaume-cazin.fr"
                    target="_blank"
                >
                    Guillaume
                </a>
            </Text>
        </aside>
    </footer>
</template>
