( function ( p5js_sketch, undefined )
{
    let SketchParam = function ( display_name,
                                 value,
                                 html             )
    {
        //Text on the label
        this.display_name = display_name;

        //Data used as render parameter
        this.value = value;

        //Function that should be called to get the html for the
        //GUI item
        this.html = html;
    };

    p5js_sketch.params =
    {
        numIter  : new SketchParam ( "numIter", 300 ),
        targetX  : new SketchParam ( "name", -0.7436 ),
        targetY  : new SketchParam ( "name", 0.1102 ),
        range    : new SketchParam ( "name", 3.5 ),
        escape   : new SketchParam ( "name", 300 ),
        gridSize : new SketchParam ( "name", [ 1080, 1080 ] ),
        colors   : new SketchParam ( "name", [ '#ff0000',
                                               '#ffff00',
                                               '#00ff00',
                                               '#00ffff',
                                               '#0000ff' ] )
    };

    p5js_sketch.getHtmlParamForm = function ()
    {
        html = "<form>";

        html += "<p>";
        html += htmlNumberInput ( "numIter", p5js_sketch.params.numIter );
        html += "</p>";

        html += "<input type='submit' value='Render' />";

        html += "</form>";
        
        return html;
    };

    let htmlLabel = function ( text )
    {
        return "<label>"+text+"</label>";
    };

    let htmlNumberInput = function ( paramKey, paramData )
    {
        html = htmlLabel ( paramData.display_name );

        html += "<input type='text' name='paramKey'>";

        return html;
    };

    let listNumberInput = function ( paramKey, paramData )
    {
        return "";
    }
} ( window.p5js_sketch = window.p5js_sketch || {} ))
