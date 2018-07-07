#include <stdio.h>
#include <stdlib.h>
#include <uv.h>

int main() {
	int i;
	for(i = 0; i < 10; ++i) {
		if (i % 2 == 0) {
			printf("i is: %d\n", i);
		} else {
			printf("i is odd!\n");
		}
	}
	return 0;
}
