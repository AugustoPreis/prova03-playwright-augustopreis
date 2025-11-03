import { Page } from '@playwright/test';
import BrasilEscolaElements from '../elements/BrasilEscolaElements';
import BasePage from './BasePage';

export default class BrasilEscolaPage extends BasePage {
  readonly brasilEscolaElements: BrasilEscolaElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.brasilEscolaElements = new BrasilEscolaElements(page);
  }

  async preencherCamposValidos(): Promise<void> {}

  async preencherCampoNomeVazio(): Promise<void> {}

  async enviarFormulario(): Promise<void> {}

  async validarCampoVazio(): Promise<void> {}

  async validarEmailInvalido(): Promise<void> {}

  async validarEnvio(): Promise<void> {}
}
