#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int mandelbrot ( int numIter, float targetX, float targetY, float range,
                 int gridSize, int x, int y )
{
	if ( x == y )
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
