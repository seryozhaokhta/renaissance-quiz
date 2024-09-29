<!-- components/ResultModal.vue -->

<template>
    <div class="result-modal__overlay">
        <div class="result-modal" ref="modalRef">
            <h2 class="result-modal__title">Результаты Квиза</h2>
            <ul class="result-modal__list">
                <li class="result-modal__item" v-for="result in results" :key="result.artwork.id">
                    <strong>{{ result.artwork.title }}</strong> - Ваш ответ:
                    {{ getPeriodName(result.selectedPeriodId) }}
                    <span v-if="result.isCorrect" class="result-modal__status result-modal__status--correct">✔️</span>
                    <span v-else class="result-modal__status result-modal__status--incorrect">❌</span>
                </li>
            </ul>
            <button class="result-modal__button" @click="restart">
                Начать заново
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import type { Result, Era } from '~/types/quiz';

const props = defineProps<{
    results: Result[];
    eras: Record<string, Era>;
}>();

const emit = defineEmits<{
    (e: 'restart'): void;
}>();

const modalRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (modalRef.value) {
        gsap.fromTo(
            modalRef.value,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out' }
        );
    }
});

const restart = () => {
    if (modalRef.value) {
        gsap.to(modalRef.value, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power1.in',
            onComplete: () => {
                emit('restart');
            },
        });
    } else {
        emit('restart');
    }
};

const getPeriodName = (periodId: string | null): string => {
    if (!periodId) return 'Не выбрано';
    for (const eraKey in props.eras) {
        const era = props.eras[eraKey];
        const period = era.periods.find((p) => p.id === periodId);
        if (period) return period.name;
    }
    return 'Неизвестный период';
};
</script>

<style scoped>
.result-modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.result-modal {
    background-color: hsla(220, 15%, 15%, 1);
    color: hsla(0, 0%, 90%, 1);
    padding: 30px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
}

.result-modal__title {
    margin-bottom: 20px;
    text-align: center;
}

.result-modal__list {
    list-style: none;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
}

.result-modal__item {
    padding: 10px 0;
    border-bottom: 1px solid hsla(220, 10%, 25%, 1);
    display: flex;
    flex-direction: column;
}

.result-modal__status {
    font-size: 1.2em;
    margin-top: 5px;
}

.result-modal__status--correct {
    color: green;
}

.result-modal__status--incorrect {
    color: red;
}

.result-modal__button {
    width: 100%;
    padding: 10px;
    background-color: hsla(200, 100%, 50%, 1);
    color: hsla(0, 0%, 100%, 1);
    border: none;
    border-radius: 4px;
    margin-top: 20px;
    transition: background-color 0.3s;
}

.result-modal__button:hover {
    background-color: hsla(200, 100%, 60%, 1);
}
</style>
