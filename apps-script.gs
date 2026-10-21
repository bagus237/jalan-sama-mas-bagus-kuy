// Paste file ini ke Google Apps Script (Extensions > Apps Script) dari Google Sheet kamu.
// Lalu Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Waktu kirim", "Nama", "Tanggal", "Jam", "Catatan", "Device"]);
  }

  const p = e.parameter;
  sheet.appendRow([new Date(), p.nama, p.tanggal, p.jam, p.catatan, p.device]);

  return ContentService.createTextOutput("ok");
}
