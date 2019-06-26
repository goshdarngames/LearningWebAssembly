( function ( p5js_sketch, undefined )
{
    /************************************************************************
     * Sketch Param Data Type
     ***********************************************************************/

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

    /************************************************************************
     * HTML generation
     ***********************************************************************/

    p5js_sketch.getHtmlParamForm = function ()
    {
        html = "<form>";

        Object.keys ( p5js_sketch.params ).forEach (
            ( key ) => 
            {
                paramData = p5js_sketch.params [ key ];

                html += "<p>";

                html += paramData.html ( key, paramData );

                html += "</p>";
            }
        );
        
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

        html += "<input type='text' name='"+paramKey+"'>";

        return html;
    };

    let htmlListInput = function ( paramKey, paramData )
    {
        html = htmlLabel ( paramData.display_name );

        paramData.value.forEach ( ( val, idx ) =>
        {
            html += "<input type='text' name='"+paramKey+"_"+idx+"'>";
        });

        return html;
    }

    /************************************************************************
     * Sketch Params and Inital Data
     ***********************************************************************/

    p5js_sketch.params =
    {
        numIter  : new SketchParam ( "Iterations", 300, htmlNumberInput ),

        target   : new SketchParam ( "Target", [ -0.7436, 0.1102 ],
                                     htmlListInput ),

        range    : new SketchParam ( "Range", 3.5, htmlNumberInput ),

        escape   : new SketchParam ( "Escape", 300, htmlNumberInput ),

        gridSize : new SketchParam ( "GridSize", [ 1080, 1080 ], htmlListInput ),

        colors   : new SketchParam ( "Colors", [ '#ff0000',
                                               '#ffff00',
                                               '#00ff00',
                                               '#00ffff',
                                               '#0000ff' ], htmlListInput )
    };

} ( window.p5js_sketch = window.p5js_sketch || {} ))
