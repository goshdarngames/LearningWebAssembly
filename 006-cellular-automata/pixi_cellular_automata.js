( function ( pixi_cellular_automata, undefined )
{
    let grid_rows = 10;
    let grid_cols = 10;

    let cell_size = 80;

    pixi_cellular_automata.init_webasm = function ( module )
    {
        pixi_cellular_automata.sim_update = module.cwrap ( 'sim_update' );


        let get_rgb_buffer_ptr = 
            module.cwrap ( 'get_rgb_buffer_ptr', 'array' );

        pixi_cellular_automata.get_rgb_buffer_ptr  = () =>
        {
            let rgb_buffer_ptr = get_rgb_buffer_ptr ();

            let array_size = 800*800*3;

            let js_array = 
                module.HEAPU8.subarray ( rgb_buffer_ptr, 
                                         rgb_buffer_ptr + array_size );

            return js_array;
        };

    };

    pixi_cellular_automata.init_pixi = function ( pixi, document )
    {
        let type="WebGL";
        
        if ( !PIXI.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        PIXI.utils.sayHello ( type );

        pixi_cellular_automata.pixi_app = new PIXI.Application (
            {
                width  : 800,
                height : 800
            });

        document.body.appendChild ( pixi_cellular_automata.pixi_app.view );

        let get_noise_texture = () =>
        {
            let grid_buffer = pixi_cellular_automata.get_rgb_buffer_ptr  ();

            return pixi.Texture.fromBuffer ( 
                grid_buffer, 800, 800, { format : pixi.FORMATS.RGB } );

        };

        let grid_sprite = new pixi.Sprite ( get_noise_texture () );

        pixi_cellular_automata.pixi_app.stage.addChild ( grid_sprite );

        pixi_cellular_automata.pixi_app.ticker.add ( () =>
        {
            pixi_cellular_automata.sim_update ();
            grid_sprite.texture = get_noise_texture ();
        });
    };

    pixi_cellular_automata.init_vue = function ( Vue )
    {
        let vm = new Vue ({
            el : "#app",
            data : 
            {
                fps : pixi_cellular_automata.pixi_app.ticker.FPS
            }
        });
    };

} ( window.pixi_cellular_automata = window.pixi_cellular_automata || {} ))