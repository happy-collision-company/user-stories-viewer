import Component, { tracked, TemplateMeta } from '@glimmer/component';
import yaml from 'js-yaml';

function addUnique(value, array) {
  if (array.indexOf(value) === -1) {
    array.push(value)
  }
  return array;
}

type UserStory = {
  as_a: string,
  i_want: string,
  so_that: string,
  necessity: string,
  tags: string[]
}

export default class UserStoriesViewer extends Component {
  @tracked private allUserStories: UserStory[] = [];
  @tracked private userStories: UserStory[] = [];
  @tracked private tags = [];
  @tracked private priorities = [];

  constructor(things) {
    super(things);

    this.chooseTag = this.chooseTag.bind(this);
    this.choosePriority = this.choosePriority.bind(this);
  }

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
    this.allUserStories = this.userStories = this.convertYaml(rawYaml) as UserStory[];
  }

  private populateTagsAndPriority() {
    this.tags = this.userStories.map(s => s.tags)
      .reduce((a, b) => a.concat(b))
      .reduce((a, tag) => addUnique(tag, a), [])

    this.priorities = this.userStories.map(s => s.necessity)
      .reduce((a, priority) => addUnique(priority, a), [])

    this.priorities.unshift('all')
  }

  private chooseTag(tag: string) {
    this.userStories = this.allUserStories
      .filter(us => us.tags.indexOf(tag) > -1)
  }

  private choosePriority(priority: string) {
    if (priority === 'all') {
      this.userStories = [].concat(this.allUserStories)
      return;
    }
    this.userStories = this.allUserStories
      .filter(us => us.necessity === priority)
  }
}
