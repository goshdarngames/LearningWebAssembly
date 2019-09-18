( function ( pixi_noise, undefined )
{
    let grid_rows = 10;
    let grid_cols = 10;

    let cell_size = 80;

    pixi_noise.init_webasm = function ( module )
    {
        pixi_noise.update_grid_noise = module.cwrap ( 'grid_noise' );


        let get_grid_data_ptr = module.cwrap ( 'get_grid_data', 'array' );

        pixi_noise.get_grid_buffer = () =>
        {
            let grid_data_ptr = get_grid_data_ptr ();

            let array_size = 800*800*3;

            let js_array = 
                module.HEAPU8.subarray ( grid_data_ptr, 
                                         grid_data_ptr + array_size );

            return js_array;
        };

    };

    pixi_noise.init_pixi = function ( pixi, document )
    {
        let type="WebGL";
        
        if ( !PIXI.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        PIXI.utils.sayHello ( type );

        pixi_noise.pixi_app = new PIXI.Application (
            {
                width  : 800,
                height : 800
            });

        document.body.appendChild ( pixi_noise.pixi_app.view );

        let get_noise_texture = () =>
        {
            pixi_noise.update_grid_noise ();

        };

            let grid_buffer = pixi_noise.get_grid_buffer ();

            let text =  pixi.Texture.fromBuffer ( 
                grid_buffer, 800, 800, { format : pixi.FORMATS.RGB } );

        let grid_sprite = new pixi.Sprite ( text );

        pixi_noise.pixi_app.stage.addChild ( grid_sprite );

        pixi_noise.pixi_app.ticker.add ( () =>
        {
            grid_sprite.texture = get_noise_texture ();
        });
    };

    pixi_noise.init_vue = function ( Vue )
    {
        let vm = new Vue ({
            el : "#app",
            data : 
            {
                fps : pixi_noise.pixi_app.ticker.FPS
            }
        });
    };

} ( window.pixi_noise = window.pixi_noise || {} ))
