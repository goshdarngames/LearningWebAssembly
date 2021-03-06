/****************************************************************************
 * sketch_params.js
 *---------------------------------------------------------------------------
 * The sketch parameters is a data structure that holds all the values
 * that the user may want to tweak  when rendering the fractal.
 *
 * The SketchParam struct defines the data for each parameter.  It contains
 * things like the value and label as well as functions that can be used
 * to generate a html form element for the parameter and functions for
 * updating the form element with the latest value and submitting new values
 * from the form.
 *
 * The structure is a little unwieldy at present and should be refactored
 * to more transparently handle different data types.  The underlying
 * values need to be translated between the form and the renderer.
 ***************************************************************************/

( function ( p5js_sketch, undefined )
{
    /************************************************************************
     * Sketch Param Data Type
     ***********************************************************************/

    let SketchParam = function ( display_name,
                                 value,
                                 html,
                                 update,
                                 submit         )
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


        //Function that should be called to write the value from the form
        //to the render parameters
        this.submit = submit;
    };

    /************************************************************************
     * HTML generation
     ***********************************************************************/

    p5js_sketch.getHtmlParamForm = function ()
    {
        //Note: onsubmit=return false prevents the page being reloaded
        html = "<form onsubmit='return false' >";

        html += "<div id='renderButtonRow' >";

        html += "<input type='button' class='zoomButton' value='-10x' "+
                "onclick='p5js_sketch.zoomButtonCallback ( 10 )' />";

        html += "<input type='button' class='zoomButton' value='-5x' "+
                "onclick='p5js_sketch.zoomButtonCallback ( 5 )' />";

        html += "<input type='button' class='zoomButton' value='-2x' "+
                "onclick='p5js_sketch.zoomButtonCallback ( 2 )' />";

        html += "<input type='submit' id='renderButton' value='Render' "+
                "onclick='p5js_sketch.renderButtonCallback ()' />";

        html += "<input type='button' class='zoomButton' value='+2x' "+
                "onclick='p5js_sketch.zoomButtonCallback ( 0.5 )' />";

        html += "<input type='button' class='zoomButton' value='+5x' "+
                "onclick='p5js_sketch.zoomButtonCallback ( 0.2 )' />";

        html += "<input type='button' class='zoomButton' value='+10x' "+
                "onclick='p5js_sketch.zoomButtonCallback ( 0.1 )' />";

        html += "</div>";

        html += "<div id='paramDiv' >";

        Object.keys ( p5js_sketch.params ).forEach (
            ( key ) => 
            {
                paramData = p5js_sketch.params [ key ];

                html += "<div class='paramRow'>";

                html += paramData.html ( key, paramData );

                html += "</div>";
            }
        );

        html += "</div>";

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

    let singleValueSubmit = function ( paramKey )
    {
        let domObject = document.getElementsByName ( paramKey ) [ 0 ];

        p5js_sketch.params [ paramKey ].value =  domObject.value;
    };

    let listValueSubmit = function ( paramKey )
    {
        let paramValues = p5js_sketch.params [ paramKey ].value;

        let formValues = paramValues.map ( ( val, idx ) =>
        {
            let fieldName = paramKey+"_"+idx;

            let domObject = document.getElementsByName ( fieldName ) [ 0 ];

            return domObject.value;
        });

        formValues.forEach( ( val, idx ) =>
        {
            p5js_sketch.params [ paramKey ].value [ idx ] = val;
        });

    };

    p5js_sketch.submitParamForm = function ()
    {
        Object.keys ( p5js_sketch.params ).forEach ( 
            ( key ) => 
            {
                p5js_sketch.params [ key ].submit ( key );
            }
        );
    };

    /************************************************************************
     * Button Callbacks
     ***********************************************************************/

    p5js_sketch.renderButtonCallback = function ()
    {
        p5js_sketch.submitParamForm ();

        p5js_sketch.renderMandelbrot ();
    };

    p5js_sketch.zoomButtonCallback = function ( factor )
    {
        p5js_sketch.params.range.value *= factor;

        p5js_sketch.params.range.update ( "range" );

        p5js_sketch.submitParamForm ();

        p5js_sketch.renderMandelbrot ();
    };

    /************************************************************************
     * Sketch Params and Inital Data
     ***********************************************************************/

    p5js_sketch.params =
    {
        gridSize : new SketchParam ( 
            "Canvas Size", 800, 
            htmlNumberInput, singleValueUpdate, singleValueSubmit ),

        range    : new SketchParam ( 
            "Range", 5, 
            htmlNumberInput, singleValueUpdate, singleValueSubmit ),

        numIter  : new SketchParam ( 
            "Iterations", 3000, 
            htmlNumberInput, singleValueUpdate, singleValueSubmit ),

        target   : new SketchParam (
            "Target", [ -0.14348441833165027, -1.0189366179221557 ],
            htmlListInput, listUpdate, listValueSubmit ),

        cycles    : new SketchParam ( 
            "Color Cycles", 500000, 
            htmlNumberInput, singleValueUpdate, singleValueSubmit ),

        escape   : new SketchParam ( 
            "Escape", 500000000, 
            htmlNumberInput, singleValueUpdate, singleValueSubmit ),

        //https://www.colourlovers.com/palette/726411/fire_within

        colors   : new SketchParam ( 
            "Colors", [ 
                        '#750D0D',
                        '#A5A5A5',
                        '#974E01',
                        '#A5A5A5',
                        '#0A5F15',
                        '#A5A5A5',
                        '#0A2B5F',
                        '#A5A5A5',
                        '#5F0A53',
                        '#A5A5A5',
                      ], 
            htmlListInput, listUpdate, listValueSubmit )
    };

} ( window.p5js_sketch = window.p5js_sketch || {} ))
