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
  @tracked private roles = [];
  @tracked private priorities = [];

  constructor(things) {
    super(things);

    this.chooseTag = this.chooseTag.bind(this);
    this.chooseRole = this.chooseRole.bind(this);
    this.choosePriority = this.choosePriority.bind(this);
  }

  public async didInsertElement() {
    await this.populateStories();
    this.populateFilterables();
  }

  private getYaml(altPath?: string) {
    let path = altPath || '../user_stories.yml';
    return fetch(path)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        const match = path.match(/^\.\.\/(.*)/);
        if (match) {
          return this.getYaml(match[1]);
        } else {
          throw new Error('No Yaml.');
        }
      }
    });
  }

  private convertYaml(text) {
    return yaml.safeLoad(text);
  }

  private async populateStories() {
    const rawYaml = await this.getYaml();
    this.allUserStories = this.userStories = this.convertYaml(rawYaml) as UserStory[];
  }

  private populateFilterables() {
    this.tags = this.userStories.map(s => s.tags)
      .reduce((a, b) => a.concat(b))
      .reduce((a, tag) => addUnique(tag, a), [])

    this.priorities = this.userStories.map(s => s.necessity)
      .reduce((a, priority) => addUnique(priority, a), [])

    this.priorities.unshift('all')

    this.roles = this.userStories.map(s => s.as_a)
      .reduce((a, role) => addUnique(role, a), [])
  }

  private chooseTag(tag: string) {
    this.userStories = this.allUserStories
      .filter(us => us.tags.indexOf(tag) > -1)
  }

  private chooseRole(role: string) {
    this.userStories = this.allUserStories
      .filter(us => us.as_a.indexOf(role) > -1)
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
