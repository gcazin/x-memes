<template>
    <footer
        class="footer footer-center rounded bg-base-200 py-8 text-base-content"
    >
        <nav class="grid grid-flow-col gap-4">
            <a :href="route('changelog')" class="link-hover link"
                >Journal des modifications</a
            >
            <a href="mailto:contact@guillaume-cazin.fr" class="link-hover link"
                >Contact</a
            >
        </nav>
        <nav>
            <div class="grid grid-flow-col gap-4">
                <a
                    href="https://twitter.com/gcazinonx"
                    target="_blank"
                    aria-label="X de Guillaume"
                >
                    <img
                        class="w-5"
                        src="/images/misc/x.svg"
                        alt="X de Guillaume"
                    />
                </a>
                <a
                    href="https://github.com/gcazin"
                    target="_blank"
                    aria-label="GitHub de Guillaume"
                >
                    <img
                        class="w-6"
                        src="/images/misc/github.svg"
                        alt="GitHub de X-Memes"
                    />
                </a>
            </div>
        </nav>
        <aside>
            <p>Copyright © 2024 - Tous droits réservés par X-Memes.</p>
            <p>
                Développé avec ❤️ par
                <a
                    class="font-bold"
                    href="https://guillaume-cazin.fr"
                    target="_blank"
                >
                    Guillaume
                </a>
            </p>
        </aside>
    </footer>
</template>
<script setup></script>
