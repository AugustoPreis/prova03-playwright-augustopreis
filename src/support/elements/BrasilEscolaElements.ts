import { Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class BrasilEscolaElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }
}
