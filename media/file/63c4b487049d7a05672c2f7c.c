#include <stdio.h>

int main(){
	printf("imstdout");
	FILE *fp = fopen("a.txt", "r");
	FILE *fp2 = fopen("b.txt", "w");
	char apple[10];
	fscanf(fp, "%s", apple);
	printf(apple);
	fprintf(fp2, "%s", apple);
	fclose(fp);
	fclose(fp2);
	return 0;
}