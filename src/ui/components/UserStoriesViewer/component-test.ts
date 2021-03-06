import hbs from '@glimmer/inline-precompile';
import { setupRenderingTest } from '@glimmer/test-helpers';

const { module, test } = QUnit;

module('Component: UserStoriesViewer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await this.render(hbs`<UserStoriesViewer />`);
    assert.ok(this.containerElement.textContent.match('Welcome to Glimmer!\n'));
  });
});
