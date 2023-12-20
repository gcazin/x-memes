<template>
    <footer class="footer mt-6 p-4 bg-neutral text-neutral-content border-t border-t-primary/10">
        <div class="lg:w-9/12 mx-auto flex items-center justify-between">
            <aside class="items-center grid-flow-col">
                <Stack spacing="2">
                    <img src="/images/favicon.png" class="w-12 rounded-full" alt="">
                    <p>X-Memes © 2023 - Tous droits réservés</p>
                    <p>Développé avec ❤️ par <a class="font-bold" href="https://guillaume-cazin.fr" target="_blank">Guillaume</a></p>
                </Stack>
            </aside>
            <nav class="flex gap-4 md:place-self-center md:justify-self-end">
                <a href="https://twitter.com/gcazinonx" target="_blank">
                    <img class="w-6" src="/images/misc/x.svg" alt="">
                </a>
                <a href="https://github.com/gcazin/x-memes" target="_blank">
                    <img class="w-6" src="/images/misc/github.svg" alt="">
                </a>
            </nav>
        </div>
    </footer>
</template>
<script setup>
import Stack from "@/Components/Layout/Stack.vue";
</script>
