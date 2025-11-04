import { Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class BrasilEscolaElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoNome() {
    return this.page.locator('input[name="name"]');
  }

  getCampoAssunto() {
    return this.page.locator('input[id="assunto"]');
  }

  getCampoEmail() {
    return this.page.locator('input[id="email"]');
  }

  getCampoEnviarPara() {
    return this.page.locator('select[name="recipient"]');
  }

  getCampoMensagem() {
    return this.page.locator('textarea[id="mensagem"]');
  }

  getBotaoEnviar() {
    return this.page.locator('input[type="submit"]');
  }

  getMensagemErro() {
    return this.page.locator('text=The given data was invalid');
  }

  getMensagemSucesso() {
    return this.page.locator('text=Contato enviado com sucesso');
  }
}
