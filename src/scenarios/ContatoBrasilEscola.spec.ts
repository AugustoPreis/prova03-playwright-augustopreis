import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import { ai } from '@zerostep/playwright';
import BrasilEscolaPage from '../support/pages/BrasilEscolaPage';

test.describe('Testes funcionais no site do Brasil Escola', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.brasil_escola')
    .retrieveData();

  let brasilEscolaPage: BrasilEscolaPage;

  test.beforeEach(async ({ page }) => {
    brasilEscolaPage = new BrasilEscolaPage(page);

    await page.goto(BASE_URL);
  });

  test('Validar funcionalidade de formulário Fale Conosco', async () => {
    await brasilEscolaPage.preencherCamposValidos();
    await brasilEscolaPage.enviarFormulario();
    await brasilEscolaPage.validarEnvio();
  });

  test('Não deve enviar com campo obrigatório "Nome" vazio', async () => {
    await brasilEscolaPage.preencherCampoNomeVazio();
    await brasilEscolaPage.enviarFormulario();
    await brasilEscolaPage.validarCampoVazio();
  });

  test('Não deve enviar com campo "E-mail" inválido usando zerostep', async ({
    page
  }) => {
    const aiArgs = { page, test };

    await page.goto('https://brasilescola.uol.com.br/contato');

    await ai('fill "E-mail*" with "email invalido"', aiArgs);
    await ai('click the "ENVIAR" button', aiArgs);

    await brasilEscolaPage.validarEmailInvalido();
  });
});
