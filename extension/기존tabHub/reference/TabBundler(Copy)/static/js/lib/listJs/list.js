var KeysRequiredException = {
    name:        "Keys Required", 
    level:       "Pretty Bad", 
    message:     "If Twitter's typeahead is used, then keys are required.", 
    htmlMessage: "If Twitter's typeahead is used, then keys are required.", 
    toString:    function(){return this.name + ": " + this.message;} 
};

var ListJS = function($element, $repeater, $container, options) {
    options = options || {};
    options.typeahead = options.typeahead || {};

    options = {
        starting_count: options.starting_count || 2,
        delete_class: options.delete_class || '.delete',
        value_class: options.value_class || '.value',
        maximum: options.maximum || 0,
        auto_add: options.auto_add || true,
        prevent_auto_add: options.prevent_auto_add || [],
        typeahead: {
            suggestions: options.typeahead.suggestions || [],
            suggestion: options.typeahead.suggestion || false,
            keys: options.typeahead.keys || [],
            displayKey: options.typeahead.displayKey || "",
            name: options.typeahead.name || ""
        }
    }

    if (options.suggestion && !options.keys.length === 0) {
        throw KeysRequiredException;
    }

    return {
        html: $element.html(),
        count: 0,
        suggestions: options.typeahead.suggestions,

        _substringMatcher: function(entries, keys) {
            var _this = this;
            return function findMatches(q, cb) {
                var matches, substrRegex;

                matches = [];
                substrRegex = new RegExp(q, 'i');

                $.each(_this.suggestions, function(i, entry) {
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        if (substrRegex.test(entry[key])) {
                            matches.push(entry);
                            return;
                        }
                    }
                });

                cb(matches);
            };
        },

        addSuggestions: function(suggestions) {
            this.suggestions = this.suggestions.concat(suggestions);
        },

        setupTypeahead: function($element) {
            var _this = this;
            $element.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: options.typeahead.name,
                displayKey: options.typeahead.displayKey,
                templates: { 
                    suggestion: function(entry) {
                        return options.typeahead.suggestion(entry);
                    }
                },
                source: _this._substringMatcher(_this.suggestions, options.typeahead.keys)
            });
        },

        addElement: function() {
            var _this = this;
            var $element = $(this.html).attr("element", this.count);
            $container.append($element);
            if (options.auto_add) {
                var $lastClicked = undefined;
                $(document).mousedown(function(e) {
                    $lastClicked = $(e.target);
                });
                $element.blur(function() {
                    setTimeout(function(){
                        var id = $lastClicked? $lastClicked.attr('id') : "";
                        if (options.prevent_auto_add.indexOf(id) === -1 && $element.val() && $element.attr('element') === "{0}".format(_this.count - 1)) {
                            $repeater.click();
                        }
                    }, 150);
                });
            }

            if (options.suggestion !== false) {
                _this.setupTypeahead($element);
            }
            $element.focus();
            this.count++;
        },

        getResults: function() {
            var array = $(options.value_class).map(function(index, $element) {
                var value = $($element).val();
                if (value) return value;
            });
            array.join = [].join;
            return array;
        },

        reset: function() {
            $container.html("");
            this.setup();
            this.count = 0;
        },

        setup: function() {
            for (var i = 0; i < options.starting_count; i++) $repeater.click();
        },

        start: function() {
            var _this = this;
            $repeater.click(function() {
                if (!options.maximum || _this.count < options.maximum) {
                    _this.addElement();
                }
            });
            $element.remove();
            this.setup();
        }
    }
}
