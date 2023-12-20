<template>
    <footer class="footer p-4 bg-neutral text-neutral-content border-t border-t-primary/10">
        <div class="lg:w-9/12 mx-auto flex items-center justify-between">
            <aside class="items-center grid-flow-col">
                <Stack spacing="2">
                    <img src="/images/favicon.png" class="w-12" alt="">
                    <p>X-Memes © 2023 - Tous droits réservés</p>
                    <p>Développé avec ❤️ par <a class="font-bold" href="https://guillaume-cazin.fr">Guillaume</a></p>
                </Stack>
            </aside>
            <nav class="flex gap-4 md:place-self-center md:justify-self-end">
                <a href="https://twitter.com/gcazinonx" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                    </svg>
                </a>
            </nav>
        </div>
    </footer>
</template>
<script setup>
import Stack from "@/Components/Layout/Stack.vue";
</script>
