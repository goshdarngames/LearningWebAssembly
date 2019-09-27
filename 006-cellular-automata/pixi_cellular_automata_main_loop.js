( function ( pixi_cellular_automata, undefined )
{
    pixi_cellular_automata.mainLoop = function ()
    {
        pixi_cellular_automata.sim_update ();

        pixi_cellular_automata.sim_write_rgb_buffer ();

        pixi_cellular_automata.grid_sprite.texture = 
            pixi_cellular_automata.get_sim_texture ();
    }

} ( window.pixi_cellular_automata = window.pixi_cellular_automata || {} ))
