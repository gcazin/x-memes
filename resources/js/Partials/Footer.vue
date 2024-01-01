<template>
    <footer
        class="footer mt-6 border-t border-t-primary/10 bg-base-200 p-4 text-neutral-content"
    >
        <div class="mx-auto flex items-center justify-between lg:w-9/12">
            <aside class="grid-flow-col items-center">
                <Stack spacing="2">
                    <img
                        src="/images/favicon.png"
                        class="w-12 rounded-full"
                        alt=""
                    />
                    <p>X-Memes © 2023 - Tous droits réservés</p>
                    <p>
                        Développé avec ❤️ par
                        <a
                            class="font-bold"
                            href="https://guillaume-cazin.fr"
                            target="_blank"
                            >Guillaume</a
                        >
                    </p>
                </Stack>
            </aside>
            <nav class="flex gap-4 md:place-self-center md:justify-self-end">
                <a
                    href="https://twitter.com/gcazinonx"
                    target="_blank"
                    aria-label="X de Guillaume"
                >
                    <img
                        class="w-6"
                        src="/images/misc/x.svg"
                        alt="X de Guillaume"
                    />
                </a>
                <!--                <a
                    href="https://github.com/gcazin/x-memes"
                    target="_blank"
                    aria-label="GitHub de Guillaume"
                >
                    <img
                        class="w-6"
                        src="/images/misc/github.svg"
                        alt="GitHub de X-Memes"
                    />
                </a>-->
            </nav>
        </div>
    </footer>
</template>
<script setup>
import Stack from '@/Components/Layout/Stack.vue'
</script>
