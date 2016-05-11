define([
  'coreJS/adapt'
], function(Adapt) {

    function setupTriggeredViews(componentView) {

        var TriggeredShowView = Backbone.View.extend({

            tagName: 'button',

            className: 'base triggered-button-show',

            initialize: function() {
                this.listenTo(Adapt, 'remove', this.remove);
                this.$el.attr({
                    'data-triggered-id': this.model.get('_id'),
                    'tabindex': 0
                });
                this.triggeredView = componentView;
                this.render();
            },

            events: {
                'click': 'show'
            },

            render: function() {
                var data = this.model.toJSON();
                var template = Handlebars.templates['triggered-show-button'];
                var $container = $(".component-container", $("." + this.model.get("_parentId")));
                $container.addClass('triggered-container');

                var showButton = this.triggeredView.model.get('_triggered').showButton;
                this.$el.html(template(data)).css({
                    top:showButton._top,
                    right: showButton._right,
                    bottom: showButton._bottom,
                    left:showButton._left,
                }).appendTo($container);
                return this;
            },

            show: function(event) {
                event && event.preventDefault();
                var $currentTarget = $(event.currentTarget);
                var currentTriggeredId = $currentTarget.attr('data-triggered-id');

                $currentTarget.addClass('triggered-hidden');

                this.triggeredView.model.set('_isVisible', true, {pluginName:'_triggered'});
                $('.' + currentTriggeredId).removeClass('triggered-hidden');
                this.triggeredView.$el.data('inview', false);
                $(window).scroll();
                this.triggeredView.$el.a11y_focus();
            }

        });

        var TriggeredHideView = Backbone.View.extend({

            el: function() {
                return componentView.el;
            },

            initialize: function() {
                this.listenTo(Adapt, 'remove', this.remove);
                this.render();
            },

            events: {
                'click .triggered-button-hide': 'hide'
            },

            render: function() {
                var data = this.model.toJSON();
                var template = Handlebars.templates['triggered-hide-button'];
                this.$el.addClass('triggered-component triggered-hidden').append(template(data));
                return this;
            },

            hide: function(event) {
                event && event.preventDefault();
                var currentTriggeredId = this.model.get('_id');
                this.model.set('_isVisible', false, {pluginName:'_triggered'});
                this.$el.addClass('triggered-hidden');
                $('.triggered-button-show[data-triggered-id="'+currentTriggeredId+'"]').removeClass('triggered-hidden').a11y_focus();
            }

        });

        new TriggeredShowView({model: componentView.model});
        new TriggeredHideView({model: componentView.model});

    }

    function onComponentViewPreRender(view) {
        if (view.model.get('_triggered') && view.model.get('_triggered')._isEnabled === true) {
            view.model.set('_isVisible', false, {pluginName:'_triggered'});
        }
    }

    function onComponentViewPostRender(componentView) {
        if (componentView.model.get('_triggered') && componentView.model.get('_triggered')._isEnabled === true) {
            setupTriggeredViews(componentView);
        }
    }

    function onDataReady() {
        // do not proceed until triggered enabled on course.json
        if (!Adapt.course.get('_triggered') || !Adapt.course.get('_triggered')._isEnabled) {
            return;
        }

        Adapt.on('componentView:preRender', onComponentViewPreRender);
        Adapt.on('componentView:postRender', onComponentViewPostRender);
    }

    Adapt.once('app:dataReady', onDataReady);

});
