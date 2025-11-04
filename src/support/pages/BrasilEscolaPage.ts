import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BrasilEscolaElements from '../elements/BrasilEscolaElements';
import BasePage from './BasePage';

export default class BrasilEscolaPage extends BasePage {
  readonly brasilEscolaElements: BrasilEscolaElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.brasilEscolaElements = new BrasilEscolaElements(page);
  }

  async preencherCamposValidos(): Promise<void> {
    await this.brasilEscolaElements.getCampoNome().fill(faker.person.fullName());
    await this.brasilEscolaElements.getCampoAssunto().fill(faker.lorem.sentence());
    await this.brasilEscolaElements.getCampoEmail().fill(faker.internet.email());
    await this.brasilEscolaElements.getCampoEnviarPara().selectOption('1');
    await this.brasilEscolaElements.getCampoMensagem().fill(faker.lorem.paragraph());
  }

  async preencherCampoNomeVazio(): Promise<void> {
    await this.brasilEscolaElements.getCampoNome().fill('');
  }

  async enviarFormulario(): Promise<void> {
    await this.brasilEscolaElements.getBotaoEnviar().click();
  }

  async validarCampoVazio(): Promise<void> {
    await this.brasilEscolaElements.getMensagemErro().waitFor({ state: 'visible' });
  }

  async validarEnvio(): Promise<void> {
    await this.brasilEscolaElements.getMensagemSucesso().waitFor({ state: 'visible' });
  }
}
