import { test, expect } from '@playwright/test';

test.describe('Login Process', () => {
    test('User can access profile page after logging in', async ({ page }) => {
        // Przejdź na stronę logowania
        await page.goto('http://localhost:3000/user/signin');

        // Wypełnij formularz logowania
        await page.fill('input[name="email"]', 'solomamd17@gmail.com');
        await page.fill('input[name="password"]', 'solomamd17@gmail.com');
        await page.click('button[type="submit"]');

        // Oczekuj na przekierowanie do profilu
        await page.waitForURL('http://localhost:3000/user/profile');

        // Sprawdź, czy profil użytkownika jest widoczny
        const profileHeader = await page.locator('h1');
        await expect(profileHeader).toHaveText('Profile');
    });
});

test.describe('Unauthenticated Access', () => {
    test('Unauthenticated user is redirected to login page', async ({ page }) => {
        // Przejdź bezpośrednio na stronę profilu
        await page.goto('http://localhost:3000/user/profile');

        // Sprawdź, czy nastąpiło przekierowanie na stronę logowania
        await expect(page).toHaveURL('http://localhost:3000/user/signin');

        // Sprawdź, czy strona logowania jest widoczna
        const loginHeader = await page.locator('h1');
        await expect(loginHeader).toHaveText('Sign In');
    });
});
