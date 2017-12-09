import Component, { tracked } from '@glimmer/component';
import yaml from 'js-yaml';

function addUnique(value, array) {
  if (array.indexOf(value) === -1) {
    array.push(value)
  }
  return array;
}

export default class UserStoriesViewer extends Component {
  @tracked private allUserStories = [];
  @tracked private userStories = [];
  @tracked private tags = [];
  @tracked private priorities = [];

  public async didInsertElement() {
    await this.populateStories();
    this.populateTagsAndPriority();
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
    this.allUserStories = this.userStories = this.convertYaml(rawYaml);
  }

  private populateTagsAndPriority() {
    this.tags = this.userStories.map(s => s.tags)
      .reduce((a, tag) => addUnique(tag, a), [])
    this.priorities = this.userStories.map(s => s.necessity)
      .reduce((a, priority) => addUnique(priority, a), [])
  }
}
