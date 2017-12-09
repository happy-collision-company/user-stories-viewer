import Component from '@glimmer/component';

export default class Tags extends Component {
  private choose(tag) {
    this.args.action(tag)
  }
}
