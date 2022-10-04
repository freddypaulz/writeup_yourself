export const validEmail = new RegExp(
   '^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*.[a-z]{2,})$'
);
export const validFullName = new RegExp('[ A-Za-z]{4,20}$');
export const validPassword = new RegExp('^[ A-Za-z0-9_@./!#&+,-]{8,30}$');
export const validWriteUpTitle = new RegExp('^[ A-Za-z0-9_@./!#&+,-]{10,100}$');
export const validWriteUpContent = new RegExp(
   '^[ A-Za-z0-9_@./!#&+,-]{50,1000}$'
);
