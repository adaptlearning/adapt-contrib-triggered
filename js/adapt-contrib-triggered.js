/*
* adapt-contrib-triggered
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Daryl Hedley <darylhedley@hotmail.com>
*/
define(function(require) {

    var Adapt = require('coreJS/adapt');

    function setupTriggeredViews(componentView) {

        var TriggeredShowView = Backbone.View.extend({

            tagName: 'a',

            className: 'triggered-button-show',

            initialize: function() {
                this.listenTo(Adapt, 'remove', this.remove);
                this.$el.attr('data-triggered-id', this.model.get('_id')).attr('href', '#');
                this.triggeredView = componentView;
                this.render();
            },

            events: {
                'click': 'show'
            },

            render: function() {
                var data = this.model.toJSON();
                var template = Handlebars.templates['triggered-show-button'];
                this.$el.html(template(data)).css({
                    left:componentView.model.get('_triggered')._left + "%", 
                    top:componentView.model.get('_triggered')._top + "%"
                }).appendTo(componentView.options.$parent.addClass('triggered-container'));
                return this;
            },

            show: function(event) {
                event.preventDefault();
                var $currentTarget = $(event.currentTarget);
                var currentTriggeredId = $currentTarget.attr('data-triggered-id');

                $currentTarget.addClass('triggered-hidden');
                
                this.triggeredView.model.set('_isVisible', true, {pluginName:'_triggered'});
                console.log(this.triggeredView.model)
                $('.' + currentTriggeredId).removeClass('triggered-hidden');
                this.triggeredView.$el.data('inview', false);
                $(window).scroll();
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
                event.preventDefault();
                var currentTriggeredId = $(event.currentTarget).attr('data-triggered-id');
                this.model.set('_isVisible', false, {pluginName:'_triggered'});
                this.$el.addClass('triggered-hidden');
                $('.triggered-button-show[data-triggered-id="'+currentTriggeredId+'"]').removeClass('triggered-hidden');
            }

        });

        new TriggeredShowView({model: componentView.model});
        new TriggeredHideView({model: componentView.model});

    }

    Adapt.on('componentView:preRender', function(view) {
        if (view.model.get('_triggered') && view.model.get('_triggered')._isEnabled === true) {
            view.model.set('_isVisible', false, {pluginName:'_triggered'}); 
        }
    });

    Adapt.on('componentView:postRender', function(componentView) {
        if (componentView.model.get('_triggered') && componentView.model.get('_triggered')._isEnabled === true) {
            setupTriggeredViews(componentView);
        }
    });

});