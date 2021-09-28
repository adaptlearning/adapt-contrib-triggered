define([
  'coreJS/adapt'
], function(Adapt) {

  class TriggeredShowView extends Backbone.View {

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
      var data = this.triggeredView.model.toJSON();
      var template = Handlebars.templates[this.template];
      var $container = $('.component__container', $('.' + this.triggeredView.model.get('_parentId')));
      $container
        .addClass('triggered__hidden')
        .append(this.$el.html(template(data)));
    }

    show(event) {
      event && event.preventDefault();
      var $currentTarget = $(event.currentTarget);
      var currentTriggeredId = this.triggeredView.model.get('_id');
      this.triggeredView.model.set('_isVisible', true, { pluginName: '_triggered' });
      $currentTarget.addClass('u-display-none');
      var $container = $('.component__container', $('.' + this.triggeredView.model.get('_parentId')));
      $container.removeClass('triggered__hidden');
      $(`.triggered__button-hide[data-triggered-id='${currentTriggeredId}']`)
        .removeClass('u-display-none');
      this.triggeredView.$el.data('inview', false);
      $(window).scroll();
      Adapt.a11y.focusFirst(this.$el, { defer: true });
    }

    hide(event) {
      event && event.preventDefault();
      var $currentTarget = $(event.currentTarget);
      const currentTriggeredId = this.triggeredView.model.get('_id');
      this.triggeredView.model.set('_isVisible', false, { pluginName: '_triggered' });
      $currentTarget.addClass('u-display-none');
      var $container = $('.component__container', $('.' + this.triggeredView.model.get('_parentId')));
      $container.addClass('triggered__hidden');
      $(`.triggered__button-show[data-triggered-id='${currentTriggeredId}']`)
        .removeClass('u-display-none');
      Adapt.a11y.focusFirst(this.$el, { defer: true });
    }
  }

  return TriggeredShowView;

});