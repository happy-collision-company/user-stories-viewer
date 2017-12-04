import Component, { tracked } from '@glimmer/component';
import yaml from 'js-yaml';

export default class UserStoriesViewer extends Component {
  @tracked
  private userStories = [];

  public didInsertElement() {
    this.populateStories();
  }

  private async getYaml() {
    return await fetch('./user-stories.yml')
      .then((response) => response.text());
  }

  private convertYaml(text) {
    return yaml.safeLoad(text);
  }

  private async populateStories() {
    const rawYaml = await this.getYaml();
    this.userStories = this.convertYaml(rawYaml);
  }
}
