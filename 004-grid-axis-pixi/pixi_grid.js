( function ( pixi_grid, undefined )
{
    pixi_grid.init = function ( pixi, app )
    {
        let grid_graphics = new pixi.Graphics ();

        app.stage.addChild ( grid_graphics );

        app.ticker.add ( () => grid_draw ( grid_graphics ) );
    };

    let grid_draw = function ( graphics )
    {
        graphics.clear ();

        graphics.beginFill ( 0xFF3300 );
        graphics.lineStyle ( 10, 0xffd900, 1 );

        graphics.drawRect ( 50, 200, 100, 100 );
    };

} ( window.pixi_grid = window.pixi_grid || {} ))
