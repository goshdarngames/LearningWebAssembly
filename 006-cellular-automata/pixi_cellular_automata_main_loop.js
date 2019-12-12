( function ( pixi_cellular_automata, undefined )
{
    //inputs to be sent from page to the sim
    let sim_inputs = [];

    pixi_cellular_automata.mainLoop = function ( pixi_app )
    {
        poll_mouse ( pixi_app.renderer.plugins.interaction.mouse );

        //check for input from form

        sim_inputs.forEach ( ( sim_input ) =>
        {
            sim_input.submit ();
            sim_input.read   ();
        });

        sim_inputs = [];

        //update the simulation
        pixi_cellular_automata.sim_update ();

        //write sim state to rgb buffer
        pixi_cellular_automata.sim_write_rgb_buffer ();

        //set grid_sprite texture to buffer
        pixi_cellular_automata.grid_sprite.texture = 
            pixi_cellular_automata.get_sim_texture (
                pixi_cellular_automata.grid_sprite.texture 
            );

    };

    pixi_cellular_automata.fill_all = function ( s )
    {
        for ( let x=0; x<800; x++ )
        {
            for ( let y=0; y<800; y++ )
            {
                pixi_cellular_automata.sim_set_cell ( x, y, s );
            }
        }
    };

    //When this function is called it adds a sim_input to the queue that
    //will set the spontaneity of the sim
    pixi_cellular_automata.sim_input_spont = function ( val, read_handler )
    {
        sim_input =
        {
            submit : () =>
            {
                pixi_cellular_automata.sim_set_spont ( val );
            },
            read : () =>
            {
                read_handler ( pixi_cellular_automata.sim_get_spont () );
            }
        };

        sim_inputs.push ( sim_input );
    }

    let poll_mouse = function ( mouse )
    {
        //exit it mouse main button not down
        if ( mouse.buttons != 1 )
        {
            return;
        }

        let grid_x = Math.floor ( mouse.global.x );
        let grid_y = Math.floor ( mouse.global.y );

        draw_cells ( grid_x, grid_y, pixi_cellular_automata.pen_state, 50 );
    }

    let draw_cells = function ( x, y, s, r )
    {

        for ( let o_x = (r*-1); o_x++; o_x < r )
        {
            let b_x = x+o_x;

            for ( let o_y = (r*-1); o_y++; o_y < r )
            {
                let b_y = y+o_y;

                // 'magic_mode' - needs to have a cooldown for same cell
                //let curr = pixi_cellular_automata.sim_get_cell ( b_x, b_y );
                //let next = (curr+1)%3;

                next = s;

                if ( b_x >= 0 && b_y >= 0 && b_x < 800 && b_y < 800 ) 
                {
                    pixi_cellular_automata.sim_set_cell ( b_x, b_y, next );
                }
            };
        }
        
    }

} ( window.pixi_cellular_automata = window.pixi_cellular_automata || {} ))
