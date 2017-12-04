import Component, { tracked } from '@glimmer/component'
import yaml from 'js-yaml'

export default class UserStoriesViewer extends Component {
  @tracked userStories = []

  async didInsertElement() {
    const rawYaml = await fetch('./user-stories.yml')
      .then(response => response.text())

    this.userStories = yaml.safeLoad(rawYaml);
    console.log(this.userStories)
  }
}
