/*
* adapt-contrib-triggered
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Daryl Hedley <darylhedley@hotmail.com>
*/
define(function(require) {

    var Adapt = require('coreJS/adapt');

    function setupTriggeredView (view) {

        var TriggeredView = Backbone.View.extend({

            el: function() {
                return view.options.$parent;
            },

            initialize: function() {
                this.listenTo(Adapt, 'remove', this.remove);
                this.render();
            },

            events: {
                'click .triggered-button-show': 'show',
                'click .triggered-button-hide': 'hide'
            },

            render: function() {
                var data = this.model.toJSON();
                var hideTemplate = Handlebars.templates['triggered-hide-button'];
                var showTemplate = Handlebars.templates['triggered-show-button'];

                view.$el.addClass('triggered-hidden triggered-component').append(hideTemplate(data));
                $(showTemplate(data)).css({
                    left:view.model.get('triggered').left, 
                    top:view.model.get('triggered').top
                }).appendTo(this.$el.addClass('triggered-container'));
                return this;
            },

            show: function(event) {
                event.preventDefault();
                $('.' + $(event.currentTarget).attr('data-id')).removeClass('triggered-hidden');
            },

            hide: function(event) {
                event.preventDefault();
                view.$el.addClass('triggered-hidden');
            }

        });

        new TriggeredView({model: view.model});

    }

    Adapt.on('componentView:postRender', function(view) {
        if (view.model.get('triggered')) {
            setupTriggeredView(view);
        }
    });

});