/*
 * jQuery magic 8 ball generator!
 * Original author: xiankai.github.com
 */

;(function($) {
    var answers = [
        {
            'answer': "It is certain",
            'type': true
        },
        {
            'answer': "It is decidedly so",
            'type': true
        },
        {
            'answer': "Without a doubt",
            'type': true
        },
        {
            'answer': "Yes definitely",
            'type': true
        },
        {
            'answer': "You may rely on it",
            'type': true
        },
        {
            'answer': "As I see it yes",
            'type': true
        },
        {
            'answer': "Most likely",
            'type': true
        },
        {
            'answer': "Outlook good",
            'type': true
        },
        {
            'answer': "Yes",
            'type': true
        },
        {
            'answer': "Signs point to yes",
            'type': true
        },
        {
            'answer': "Reply hazy try again",
            'type': null
        },
        {
            'answer': "Ask again later",
            'type': null
        },
        {
            'answer': "Better not tell you now",
            'type': null
        },
        {
            'answer': "Cannot predict now",
            'type': null
        },
        {
            'answer': "Concentrate and ask again",
            'type': null
        },
        {
            'answer': "Don't count on it",
            'type': false
        },
        {
            'answer': "My reply is no",
            'type': false
        },
        {
            'answer': "My sources say no",
            'type': false
        },
        {
            'answer': "Outlook not so good",
            'type': false
        },
        {
            'answer': "Very doubtful",
            'type': false
        },
    ];

    var plugin_name = 'magic8ball',
        defaults = {
            button: $(),
            display: $(),
            timer: true,
            min: 2,
            max: 5
        };

    function Plugin ( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = plugin_name;

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;
            var button = this.options.button;
            var display = this.options.display;
            var timer = this.options.timer;

            button.on('click', function () {
                var answer = answers[that.getRandom(0, 19)];

                if (answer.type === null) {
                    button.prop('disabled', true);
                    display.attr('class', 'yellow');

                    if (timer) {
                        that.setTimer();
                    }
                } else {
                    display.attr('class', answer.type ? 'green' : 'red');
                }

                display.html(answer.answer);
            }).click();
        },
        getRandom: function ( min, max ) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        setTimer: function () {
            var button = this.options.button;
            var timeout = this.getRandom(this.options.min, this.options.max) * 1000;

            var timer = setInterval(function() {
                timeout -= 100;
                button.html('Ask again in...' + (timeout / 1000) + ' seconds.');

                if (timeout < 1) {
                    button.prop('disabled', false).html('Ask me!');
                    clearInterval(timer);
                }
            }, 100);
        }
    }

    $.fn[plugin_name] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + plugin_name)) {
                $.data(this, 'plugin_' + plugin_name, new Plugin( this, options ));
            }
        })
    }

})( jQuery );