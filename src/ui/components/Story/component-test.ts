import hbs from '@glimmer/inline-precompile';
import { setupRenderingTest } from '@glimmer/test-helpers';

const { module, test, skip } = QUnit;

module('Component: Story', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<Story />`);
    assert.ok(this.containerElement.querySelector('div'));
  });

  skip('it displays args', async function(assert) {
    const story = {as_a: 'person', i_want: 'happiness', so_that: 'I can be happy'};
    await this.render(hbs`<Story @story={{story}} />`);
    assert.equal(this.containerElement.textContent.trim(), 'As a person, I want happiness so that I can be happy.');
  });

});
