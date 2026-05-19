'use server'

import { INITIAL_GAMES } from "./data/data";
import { revalidatePath } from 'next/cache';

export async function getGames() {
    // Робимо повну глибоку копію даних. 
    // Тепер кожен об'єкт гри отримає ТРЕНЕ НОВЕ посилання в пам'яті Node.js
    return JSON.parse(JSON.stringify(INITIAL_GAMES));
}

export async function likeGame(id: number) {
    // Тут ти міг би зробити запит до БД: await prisma.game.update(...)
    console.log(`Сервер: Отримав лайк для гри з ID: ${id}`);

    // Імітуємо оновлення
    const game = INITIAL_GAMES.find(g => g.id === id);
    if (game) {
        // Імітуємо зміну даних
        game.isFavorite = !game.isFavorite;

        // МАГІЯ ТУТ:
        // Ми говоримо Next.js оновити кеш для сторінки гри та головної сторінки
        revalidatePath(`/game/${id}`);
        revalidatePath('/');
        // У реальному проекті тут буде запит до бази даних
        return { success: true, message: `Гра ${game.title} тепер вподобана!` };
    }

    return { success: false, message: 'Гра не знайдена' };
}
