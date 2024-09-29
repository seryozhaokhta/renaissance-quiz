<!-- pages/index.vue -->

<template>
    <div class="home-page">
        <header class="home-page__header">
            <h1 class="home-page__title">
                Квиз по Итальянской Живописи Эпохи Возрождения
            </h1>
        </header>
        <main class="home-page__main">
            <QuizContainer />
        </main>
    </div>
</template>

<script setup lang="ts">
import QuizContainer from '~/components/QuizContainer.vue';
</script>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.home-page__header {
    background-color: hsla(220, 15%, 15%, 1);
    color: hsla(0, 0%, 90%, 1);
    padding: 20px 0;
    text-align: center;
}

.home-page__title {
    margin: 0;
}

.home-page__main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
</style>
