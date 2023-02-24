#include <stdio.h>
#include <stdlib.h>

int main() {
	FILE* fp;
	char str[100];
	fp = fopen("test.txt", "r+");
	if (fp == NULL) {
		printf("file open error\n");
		exit(1);
	}

	while (1) {
		if (feof(fp))
			break;
		fgets(str, 100, fp);
		printf("%s\n", str);
	}

	return 0;
}