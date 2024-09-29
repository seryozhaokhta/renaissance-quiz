// data/eras.ts

import type { Era } from '~/types/quiz';

export const eras: Era[] = [
    {
        id: 'renaissance',
        name: 'Эпоха Возрождения',
        periods: [
            { id: 'proto-renaissance', name: 'Проторенессанс' },
            { id: 'early-renaissance', name: 'Ранний Ренессанс' },
            { id: 'high-renaissance', name: 'Высокий Ренессанс' },
            { id: 'late-mannerism', name: 'Поздний Маньеризм' },
        ],
        artworks: [
            {
                id: '1',
                imageUrl: '/images/renaissance/proto/proto_1.png',
                correctPeriodId: 'proto-renaissance',
                title: 'Работа 1',
                artist: 'Художник 1',
            },
            {
                id: '2',
                imageUrl: '/images/renaissance/early/early_1.png',
                correctPeriodId: 'early-renaissance',
                title: 'Работа 2',
                artist: 'Художник 2',
            },
            {
                id: '3',
                imageUrl: '/images/renaissance/high/high_1.png',
                correctPeriodId: 'high-renaissance',
                title: 'Работа 3',
                artist: 'Художник 3',
            },
            {
                id: '4',
                imageUrl: '/images/renaissance/late/late_1.png',
                correctPeriodId: 'late-mannerism',
                title: 'Работа 4',
                artist: 'Художник 4',
            },
            {
                id: '5',
                imageUrl: '/images/renaissance/proto/proto_2.png',
                correctPeriodId: 'proto-renaissance',
                title: 'Работа 5',
                artist: 'Художник 5',
            },
            {
                id: '6',
                imageUrl: '/images/renaissance/early/early_2.png',
                correctPeriodId: 'early-renaissance',
                title: 'Работа 6',
                artist: 'Художник 6',
            },
            // Добавьте остальные произведения
        ],
    },
    // Добавьте другие эпохи по необходимости
];
