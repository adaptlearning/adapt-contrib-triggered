import a11y from 'core/js/a11y';
import Adapt from 'coreJS/adapt';

export default class TriggeredView extends Backbone.View {

  get template() {
    return 'triggered-button';
  }

  initialize() {
    this.triggeredView = this.constructor.arguments[0].componentView;
    this.triggeredView.model.set('_isVisible', false, { pluginName: '_triggered' });
    this.listenTo(Adapt, 'remove', this.remove);
    this.render();
  }

  className() {
    return 'triggered__container';
  }

  events() {
    return {
      'click .triggered__button-show': 'show',
      'click .triggered__button-hide': 'hide'
    };
  }

  render() {
    const data = this.triggeredView.model.toJSON();
    const template = Handlebars.templates[this.template];
    const $container = $('.component__container', $('.' + this.triggeredView.model.get('_parentId')));
    $container
      .addClass('triggered__hidden')
      .append(this.$el.html(template(data)));
  }

  show(event) {
    event && event.preventDefault();
    const $currentTarget = $(event.currentTarget);
    const currentTriggeredId = this.triggeredView.model.get('_id');
    this.triggeredView.model.set('_isVisible', true, { pluginName: '_triggered' });
    $currentTarget.addClass('u-display-none');
    const $container = $('.component__container', $(`.${this.triggeredView.model.get('_parentId')}`));
    $container.removeClass('triggered__hidden');
    $(`.triggered__button-hide[data-triggered-id='${currentTriggeredId}']`)
      .removeClass('u-display-none');
    this.triggeredView.$el.data('inview', false);
    $(window).scroll();
    a11y.focusFirst(this.$el, { defer: true });
  }

  hide(event) {
    event && event.preventDefault();
    const $currentTarget = $(event.currentTarget);
    const currentTriggeredId = this.triggeredView.model.get('_id');
    this.triggeredView.model.set('_isVisible', false, { pluginName: '_triggered' });
    $currentTarget.addClass('u-display-none');
    const $container = $('.component__container', $(`.${this.triggeredView.model.get('_parentId')}`));
    $container.addClass('triggered__hidden');
    $(`.triggered__button-show[data-triggered-id='${currentTriggeredId}']`)
      .removeClass('u-display-none');
    a11y.focusFirst(this.$el, { defer: true });
  }
}
