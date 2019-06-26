( function ( p5js_sketch, undefined )
{
    p5js_sketch.grid_p5 = ( p ) =>
    {
        let imageBuffer = undefined;

        let get_render_data =  function ()
        {
            //load render data into this struct
            let r_data = {};
            
            //copy across the 'value' fields from each SketchParam
            Object.keys ( p5js_sketch.params ).forEach (
                ( key ) => 
                {
                    r_data [ key ] = p5js_sketch.params [ key ].value;
                }
            );
            
            return r_data;
        }

        let renderMandelbrot = function ()
        {
            let r_data = get_render_data ();

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
                        imageBuffer.set ( i, j, p.color ( 0 ) );
                    }
                    else
                    {
                        let setIdx = 
                            Math.floor ( n % r_data.colors.length );

                        let setC = r_data.colors [ setIdx ];

                        imageBuffer.set ( i, j, p.color ( setC ) );
                    }

                }
            }

            imageBuffer.updatePixels ();
        };

        p.setup = function ()
        {
            let r_data = get_render_data ();

            let canvas = p.createCanvas ( r_data.gridSize [ 0 ],
                                          r_data.gridSize [ 1 ] );

            canvas.parent ( 'canvasDiv' );

            imageBuffer = p.createImage ( r_data.gridSize [ 0 ],
                                           r_data.gridSize [ 1 ] );
            renderMandelbrot ();
        }

        p.draw = function ()
        {
            let r_data = get_render_data ();

            p.image ( imageBuffer, 0, 0 );
        }

        
    };
} ( window.p5js_sketch = window.p5js_sketch || {} ))
