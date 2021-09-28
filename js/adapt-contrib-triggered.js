define([
  'coreJS/adapt',
  './triggeredView'
], function(Adapt, TriggeredView) {

  class Triggered extends Backbone.Controller {

    initialize() {
      this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
    }

    onDataReady() {
      if (!Adapt.course.get('_triggered') || !Adapt.course.get('_triggered')._isEnabled) {
        return;
      }

      this.listenTo(Adapt, {
        remove: this.remove,
        'componentView:postRender': this.onComponentViewPostRender
      });
    }

    onComponentViewPostRender(componentView) {
      new TriggeredView({ componentView });
    }
  }

  return new Triggered();

});
