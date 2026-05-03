function onFormSubmit(e) {
  try {
    // === KONFIGURASI ===
    const token = "8295826297:AAG7EzRNYtgKAr92K1ND1wVVbqkWqIwEXkw"; // Token Bot Telegram
    const chatId = "392836663"; // ID chat / grup tujuan

    // === AMBIL SHEET & DATA ===
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; // Baris header
    const lastRow = sheet.getLastRow();
    const rowData = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

    // === BUAT PESAN ===
    let message = "📩 *Form Baru Masuk!*\n\n";
    headers.forEach((header, index) => {
      message += `*${header}* ${rowData[index]}\n`;
    });

    // === KIRIM KE TELEGRAM ===
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown"
    };

    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    });

  } catch (err) {
    console.error("Gagal kirim ke Telegram:", err);
  }
}
