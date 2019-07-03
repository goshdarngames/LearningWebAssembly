const sum = require ( './sketch' );

describe ( "sketch.canvasCoordToComplex", () =>
{
    test ( "is defined", () =>
    {
        expect ( window.p5js_sketch.canvasCoordToComplex )
            .toBeDefined ();
    });
});
