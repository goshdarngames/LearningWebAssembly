#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int f ( int x, int y )
{
	if ( x == 200 || y == 200 )
	{
		return 1;
	}
	else
	{
		return 0;
	}
}
