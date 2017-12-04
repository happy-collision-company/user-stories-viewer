import Component, {tracked} from '@glimmer/component';

export default class UserStoriesViewer extends Component {
  @tracked rawYaml = '';

  async didInsertElement() {
    this.rawYaml = await fetch('./user-stories.yml')
      .then(response => response.text())
  }
}
