import { IaaProjectPage } from './app.po';

describe('iaa-project App', () => {
  let page: IaaProjectPage;

  beforeEach(() => {
    page = new IaaProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
