import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import { ai } from '@zerostep/playwright';
import BrasilEscolaPage from '../support/pages/BrasilEscolaPage';

test.describe('Testes no site do Brasil Escola', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.brasil_escola')
    .retrieveData();

  let brasilEscolaPage: BrasilEscolaPage;

  test.beforeEach(async ({ page }) => {
    brasilEscolaPage = new BrasilEscolaPage(page);

    await page.goto(BASE_URL);
  });

  test('Deve enviar o formulário corretamente', async () => {
    await brasilEscolaPage.preencherCamposValidos();
    await brasilEscolaPage.enviarFormulario();
    await brasilEscolaPage.validarEnvio();
  });

  test('Não deve enviar o formulário com campo obrigatório "Nome" vazio', async () => {
    await brasilEscolaPage.preencherCamposValidos();
    await brasilEscolaPage.preencherCampoNomeVazio();
    await brasilEscolaPage.enviarFormulario();
    await brasilEscolaPage.validarCampoVazio();
  });

  test('Não deve enviar o formulário com os campos vazios (zerostep)', async ({
    page
  }) => {
    const options = { page, test };

    await page.goto('https://brasilescola.uol.com.br/contato');

    await ai('Click in the "Enviar" button', options);
    await ai('Check that there is no success message displayed on the screen', options);
  });
});
