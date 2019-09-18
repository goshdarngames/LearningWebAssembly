
#include <stdint.h>

#define WIDTH 800
#define HEIGHT 800

#define SIZE 640000

void ca_update ();
void ca_write_rgb_buffer ( uint8_t * rgb_buffer );
int sim_get_neighbour_idx ( int, int, int, int );
