( function ( p5js_sketch, undefined )
{
    /************************************************************************
     * Sketch Param Data Type
     ***********************************************************************/

    let SketchParam = function ( display_name,
                                 value,
                                 html,
                                 update         )
    {
        //Text on the label
        this.display_name = display_name;

        //Data used as render parameter
        this.value = value;

        //Function that should be called to get the html for the
        //GUI item
        this.html = html;

        //Function that should be called to update the displayed value
        //for the parameters
        this.update = update;
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
     * Value Update Functions
     ***********************************************************************/

    let singleValueUpdate = function ( paramKey )
    {
        let domObject = document.getElementsByName ( paramKey ) [ 0 ];

        domObject.value = p5js_sketch.params [ paramKey ].value;
    };

    let listUpdate = function ( paramKey )
    {
        let paramValues = p5js_sketch.params [ paramKey ].value;

        paramValues.forEach ( ( val, idx ) =>
        {
            let fieldName = paramKey+"_"+idx;

            let domObject = document.getElementsByName ( fieldName ) [ 0 ];

            domObject.value = paramValues [ idx ];
        });
    };

    p5js_sketch.updateParamForm = function ()
    {
        Object.keys ( p5js_sketch.params ).forEach ( 
            ( key ) => 
            {
                p5js_sketch.params [ key ].update ( key );
            }
        );
    };

    /************************************************************************
     * Sketch Params and Inital Data
     ***********************************************************************/

    p5js_sketch.params =
    {
        numIter  : new SketchParam ( 
            "Iterations", 300, htmlNumberInput, singleValueUpdate ),

        target   : new SketchParam ( "Target", [ -0.7436, 0.1102 ],
                                     htmlListInput, listUpdate ),

        range    : new SketchParam ( 
            "Range", 3.5, htmlNumberInput, singleValueUpdate ),

        escape   : new SketchParam ( 
            "Escape", 300, htmlNumberInput, singleValueUpdate ),

        gridSize : new SketchParam ( 
            "GridSize", [ 1080, 1080 ], htmlListInput, listUpdate ),

        colors   : new SketchParam ( 
            "Colors", [ '#ff0000',
                        '#ffff00',
                        '#00ff00',
                        '#00ffff',
                        '#0000ff' ], htmlListInput, listUpdate )
    };

} ( window.p5js_sketch = window.p5js_sketch || {} ))
