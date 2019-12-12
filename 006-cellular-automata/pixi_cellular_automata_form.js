//This file provides the logic that the HTML input form that controls
//the simulation uses.  - Logic defined using Vue.js
( function ( pixi_cellular_automata, undefined )
{
    let v_spont = 50;
    let vue = undefined;

    window.addEventListener ( 'load', () =>
    {
        vue = new Vue 
        ({
            el : "#ca_control",
            data : 
            {
                spont             : v_spont,
                pause_button_text : "Pause"
            },
            computed :
            {
                scaled_spont : function ()
                {
                    read_handler = ( x ) =>
                    {
                        v_spont = x*100;
                    };

                    let s_spont = this.spont/100;

                    pixi_cellular_automata.
                        sim_input_spont ( s_spont, read_handler  );


                    return s_spont;
                },
            },
            methods : 
            {
                pause : function ( event )
                {
                    pause_button_handler ();
                }
            }
        });

    });

    let pause_button_handler = function ()
    {
        try 
        {
            let s = pixi_cellular_automata.sim_get_state ();

            switch ( s )
            {
                case 1 :
                {
                    pixi_cellular_automata.sim_set_state ( 2 );
                    break;
                }

                case 2 :
                {
                    pixi_cellular_automata.sim_set_state ( 1 );
                    break;
                }

            }
        }
        catch ( err )
        {
            console.log ( err );
        }
        finally
        {
            delayed_pause_text_update ();
        }
    };
    
    let get_pause_text = function ()
    {
        let text = "...";
        try 
        {
            switch ( pixi_cellular_automata.sim_get_state () )
            {
                case 1 :
                {
                    text = "Pause";
                    break;
                }

                case 2 :
                {
                    text = "Play";
                    break;
                }

            }
        }
        catch ( err )
        {
            console.log ( err );
        }
        finally 
        {
            return text;
        }
    };

    let delayed_pause_text_update = function ()
    {
        window.setTimeout ( () =>
        {
            vue.pause_button_text = get_pause_text ();
        }, 100 );
    }

} ( window.pixi_cellular_automata = window.pixi_cellular_automata || {} ))
