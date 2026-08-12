/**
 * Принимает заявки с лендинга и добавляет их в активную Google-таблицу.
 * Вставьте этот файл в Extensions → Apps Script внутри нужной таблицы.
 */
function doPost(event) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const payload = JSON.parse(event.postData.contents || '{}');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Дата', 'Имя', 'Телефон', 'Email', 'Страница']);
  }

  sheet.appendRow([
    new Date(),
    payload.name || '',
    payload.phone || '',
    payload.email || '',
    payload.source || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
