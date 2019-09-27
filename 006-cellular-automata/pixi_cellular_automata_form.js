( function ( pixi_cellular_automata, undefined )
{
    let v_spont = 78;

    window.addEventListener ( 'load', () =>
    {
        new Vue ({
            el : "#ca_control",
            data : 
            {
                spont : v_spont
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
                }
            },
        });
    });
    

} ( window.pixi_cellular_automata = window.pixi_cellular_automata || {} ))
