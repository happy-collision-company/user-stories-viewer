import Component from '@glimmer/component';

export default class Story extends Component {
  a = this.roleBeginsWithVowel() ? 'an' : 'a';
  period = this.reasonEndingPunctuation();

  roleBeginsWithVowel(): boolean {
    return ['a','e','i','o','u']
      .indexOf(this.args.story.as_a.toLowerCase()[0]) > -1;
  }

  reasonEndingPunctuation() {
    if (this.args.story.so_that.match(/\W$/)) {
      return '';
    } else {
      return '.';
    }
  }
}
