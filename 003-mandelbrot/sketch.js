( function ( p5js_sketch, undefined )
{
    /**
     * Stores data for the render process in a public field so that it
     * may be displayed on the GUI.
     */
    p5js_sketch.render_data =
    {
        numIter  : 300,
        targetX  : -0.7436,
        targetY  : 0.1102,
        range    : 3.5,
        escape   : 300,
        gridSize : [ 1080, 1080 ],
        image    : undefined,
        colors  : [ '#ff0000',
                    '#ffff00',
                    '#00ff00',
                    '#00ffff',
                    '#0000ff' ]
    };

    p5js_sketch.grid_p5 = ( p ) =>
    {
        //Shorter name for slightly more readable code
        let r_data = p5js_sketch.render_data;

        let renderMandelbrot = function ()
        {
            for ( i = 0; i < r_data.gridSize[0]; i++ )
            {
                for ( j = 0; j < r_data.gridSize[1]; j++ )
                {
                    let n = window.mandelbrot ( 
                        r_data.numIter, 
                        r_data.targetX,
                        r_data.targetY,
                        r_data.range,
                        r_data.escape,
                        r_data.gridSize[0],
                        i, j                  );

                    if ( n == 0 )
                    {
                        r_data.image.set ( i, j, p.color ( 0 ) );
                    }
                    else
                    {
                        let setIdx = 
                            Math.floor ( n % r_data.colors.length );

                        let setC = r_data.colors [ setIdx ];

                        r_data.image.set ( i, j, p.color ( setC ) );
                    }

                }
            }

            r_data.image.updatePixels ();
        };

        p.setup = function ()
        {
            let canvas = p.createCanvas ( r_data.gridSize [ 0 ],
                                          r_data.gridSize [ 1 ] );

            canvas.parent ( 'canvasDiv' );

            r_data.image = p.createImage ( r_data.gridSize [ 0 ],
                                           r_data.gridSize [ 1 ] );
            renderMandelbrot ();
        }

        p.draw = function ()
        {
            p.image ( r_data.image, 0, 0 );
        }

        
    };
} ( window.p5js_sketch = window.p5js_sketch || {} ))
