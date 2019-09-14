( function ( pixi_grid, undefined )
{
    let grid_rows = 10;
    let grid_cols = 10;

    let cell_size = 80;

    pixi_grid.init_webasm = function ( module )
    {
        let grid_init = module.cwrap ( 'grid_init' );

        grid_init ();

        let get_grid_data_ptr = module.cwrap ( 'get_grid_data', 'array' );

        pixi_grid.get_grid_buffer = () =>
        {
            let grid_data_ptr = get_grid_data_ptr ();

            let array_size = 800*800*3;

            let js_array = 
                module.HEAPU8.subarray ( grid_data_ptr, 
                                         grid_data_ptr + array_size );

            return js_array;
        };

    };

    pixi_grid.init_pixi = function ( pixi, document )
    {
        let type="WebGL";
        
        if ( !PIXI.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        PIXI.utils.sayHello ( type );

        let app = new PIXI.Application (
            {
                width  : 800,
                height : 800
            });

        document.body.appendChild ( app.view );

        let grid_buffer = pixi_grid.get_grid_buffer ();

        let grid_texture = pixi.Texture.fromBuffer ( 
            grid_buffer, 800, 800, { format : pixi.FORMATS.RGB } );

        let grid_sprite = new pixi.Sprite ( grid_texture );


        app.stage.addChild ( grid_sprite );
    };

} ( window.pixi_grid = window.pixi_grid || {} ))
