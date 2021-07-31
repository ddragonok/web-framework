import RatingPage from '../../src/pageObjects/RatingPage';
import allureReporter from "@wdio/allure-reporter";

describe('Проверка рейтинга котов', async() => {
    beforeEach("Открытие страницы рейтинга", async () => {
        await RatingPage.open();
    })

    it("Проверка сортировки лайков в рейтинге", async() => {
        const ratingLikes = await RatingPage.ratingLikes;

        const arrayLikes: number[] = [];

        for (let i = 0; i < ratingLikes.length; i++){
            const likes = await ratingLikes[i].getText();
            arrayLikes.push(+likes);
        }
        console.info(`Начальный рейтинг лайков: ${arrayLikes}`);

        const sortedLikes = arrayLikes.sort((a, b) => b - a);
        console.info(`Отсортированный по убыванию рейтинг лайков: ${sortedLikes}`);

        allureReporter.startStep('Проверка сортировки лайков в рейтинге');
        allureReporter.addAttachment('Ожидаемое значение', sortedLikes.join(', '), 'text/plain');
        allureReporter.addAttachment('Фактическое значение', arrayLikes.join(', '), 'text/plain');
        expect(arrayLikes).toEqual(sortedLikes);
        allureReporter.endStep();
    })

    it("Проверка сортировки дизлайков в рейтинге", async() => {
        const ratingDislikes = await RatingPage.ratingDislikes;

        const arrayDislikes: number[] = [];

        for (let i = 0; i < ratingDislikes.length; i++){
            const dislikes = await ratingDislikes[i].getText();
            arrayDislikes.push(+dislikes);
        }
        console.info(`Начальный рейтинг дизлайков: ${arrayDislikes}`);

        const sortedDislikes = arrayDislikes.sort((a, b) => b - a);
        console.info(`Отсортированный по убыванию рейтинг дизлайков: ${sortedDislikes}`);

        allureReporter.startStep('Проверка сортировки дизлайков в рейтинге');
        allureReporter.addAttachment('Ожидаемое значение', sortedDislikes.join(', '), 'text/plain');
        allureReporter.addAttachment('Фактическое значение', arrayDislikes.join(', '), 'text/plain');
        expect(arrayDislikes).toEqual(sortedDislikes);
        allureReporter.endStep();
    })
})