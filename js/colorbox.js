/**
 * ColorBox generator object
 *
 * @param color
 * @param steps
 * @constructor
 */
var ColorBox = function(color, steps) {
    this.color = color;
    this.step = steps;

    this.BLACK = 0;
    this.WHITE = parseInt('ffffff', 16);

    this.colors = [];

    this.$el = $('<div></div>');
};

ColorBox.prototype = {
    render: function() {
        this._generateColors();
        var that = this;

        // Render
        $.each(this.colors, function(i, e) {
            that._addTag(e.color, e.percent);
        });

        return this;
    },

    _addTag: function(color, percent) {
        var box = $('<div class="colorbox"><span>#' + color + '</span><span> ' + percent + '%</span> </div>');
        box.css({backgroundColor: '#' + color});

        this.$el.append(box);
    },

    _generateColors: function() {
        var currentColor,
            currentColorInt,
            i = 0,
            j  = 1;

        // Get whites
        do {
            currentColor = this._shadeColor(this.color, i * this.step);
            currentColorInt = parseInt(currentColor, 16);

            this.colors.unshift({color: currentColor, percent: i * this.step});
            i++;
        } while(currentColorInt < this.WHITE);

        // Get blacks
        do {
            currentColor = this._shadeColor(this.color, -1 * j * this.step);
            currentColorInt = parseInt(currentColor, 16);

            this.colors.push({color: currentColor, percent: -1 * j * this.step});
            j++;
        } while(currentColorInt > this.BLACK);
    },

    _shadeColor: function(color, percent) {
        var num = parseInt(color,16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            B = (num >> 8 & 0x00FF) + amt,
            G = (num & 0x0000FF) + amt;
        return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    }
};