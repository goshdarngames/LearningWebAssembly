( function ( p5js_sketch, undefined )
{

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


    p5js_sketch.canvasCoordToComplex = function (
        canvasCoord, currentTarget, range, gridSize    ) 
    {
        return currentTarget - ( range/2 ) + 
               range * ( canvasCoord / gridSize );
    };

    p5js_sketch.computeColor = function ( band, adj )
    {
        return 0;
    };

    p5js_sketch.grid_p5 = ( p ) =>
    {
        let imageBuffer = undefined;

        let drawing       = true;
        let drawPos       = undefined;

        let maxDelta = 16;

        
        let get_mandelbrot = function ( x, y )
        {
            let r_data = get_render_data ();

            return  window.mandelbrot ( 
                r_data.numIter, 
                r_data.target [ 0 ],
                r_data.target [ 1 ],
                r_data.range,
                r_data.escape,
                r_data.gridSize,
                x, y                  );

        };

        p.draw = function ()
        {
            let r_data = get_render_data ();

            if ( drawing )
            {
                let drawStartTime = window.performance.now ();
                
                if ( drawPos == undefined )
                {
                    drawPos = 0;
                }
                
                let delta = () => window.performance.now () - drawStartTime;

                while ( delta () < maxDelta )
                {
                    let x = drawPos % r_data.gridSize;
                    let y = Math.floor ( drawPos / r_data.gridSize );

                    let n = get_mandelbrot ( x, y );

                    if ( n == 0 )
                    {
                        imageBuffer.set ( x, y, p.color ( 0 ) );
                    }
                    else
                    {
                        let colorBand = Math.floor ( n );
                        
                        let colorAdj = n - colorBand; 

                        let pixelColor =
                             p5js_sketch.computeColor ( 
                                   colorBand, colorAdj );

                        imageBuffer.set ( x, y, pixelColor );
                    }
                    
                    drawPos += 1;

                    if ( drawPos > Math.pow ( r_data.gridSize, 2 ) )
                    {
                        drawing       = false;
                        drawStartTime = undefined;
                        drawPos       = undefined;
                    }
                }

                imageBuffer.updatePixels ();
            }

            p.image ( imageBuffer, 0, 0 );
        };

        p5js_sketch.renderMandelbrot = function ()
        {
            drawing = true;
            drawPos = undefined;
        };

        p.setup = function ()
        {
            let r_data = get_render_data ();

            let canvas = p.createCanvas ( r_data.gridSize,
                                          r_data.gridSize );

            canvas.parent ( 'canvasDiv' );

            imageBuffer = p.createImage ( r_data.gridSize, 
                                          r_data.gridSize );

            p5js_sketch.renderMandelbrot ();
        };

        p.mouseClicked = function ()
        {
            if ( p.mouseX < 0       || p.mouseY < 0
              || p.mouseX > p.width || p.mouseY > p.height )
            {
                return;
            }

            let r_data = get_render_data ();

            new_target = [
                p5js_sketch.canvasCoordToComplex ( 
                    p.mouseX, r_data.target [ 0 ],
                    r_data.range, r_data.gridSize ),

                p5js_sketch.canvasCoordToComplex ( 
                    p.mouseY, r_data.target [ 1 ], 
                    r_data.range, r_data.gridSize )
            ];

            p5js_sketch.params.target.value = new_target;

            //update the form value to refelct the new target
            p5js_sketch.params.target.update ( "target" );
        };
    };

} ( window.p5js_sketch = window.p5js_sketch || {} ))
