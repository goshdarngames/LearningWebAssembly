const sum = require ( './sketch' );

describe ( "sketch.canvasCoordToComplex", () =>
{
    let TestCase = function ( 
        currentTarget, canvasCoord, range, gridSize, output  )
    {
        this.currentTarget = currentTarget;
        this.canvasCoord   = canvasCoord;
        this.range         = range;
        this.gridSize      = gridSize;
        this.output        = output;
    };

    let test_cases = [
        new TestCase (   0,   0,  1,  100,  -0.5 ),
        new TestCase (   0, 100,  1,  100,   0.5 ),
        new TestCase (   1,  50,  3,  100,     1 ),
        new TestCase (  -1, 250,  4, 1000,    -2 ),
        new TestCase ( 1.5,  75,  2,  100,     2 )
    ];

    test ( "is defined", () =>
    {
        expect ( window.p5js_sketch.canvasCoordToComplex )
            .toBeDefined ();
    });

    test ( "passes test cases", () =>
    {
        test_cases.forEach ( ( tc ) =>
        {
            expect (
                window.p5js_sketch.canvasCoordToComplex  (
                    tc.canvasCoord, tc.currentTarget, 
                    tc.range, tc.gridSize ))

                .toEqual ( tc.output );
        });
    });

});

describe ( "p5js_sketch.computeColorDiffs", () =>
{
    test ( "is defined", () =>
    {
        expect ( window.p5js_sketch.computeColorDiffs )
            .toBeDefined ();
    });

    test ( "returns a list with computer color differences", () =>
    {
        //Decided not to implemented this test as it would involve mocking
        //calls to p5js ...
    });

});

describe ( "p5js_sketch.computeColor", () =>
{
    test ( "is defined", () =>
    {
        expect ( window.p5js_sketch.computeColor )
            .toBeDefined ();
    });

});

