import Component, { tracked } from '@glimmer/component'
import yaml from 'js-yaml'

export default class UserStoriesViewer extends Component {
  @tracked userStories = []

  didInsertElement() {
    this.populateStories()
  }

  async getYaml() {
    return await fetch('./user-stories.yml')
      .then(response => response.text())
  }

  convertYaml(text) {
    return yaml.safeLoad(text)
  }

  async populateStories() {
    const rawYaml = await this.getYaml()
    this.userStories = this.convertYaml(rawYaml)
  }
}
