/* EuroEAP 2027 — site configuration.
   sheetsWebhookUrl: the Apps Script web app URL (ends with /exec) of the
   Google Sheet "EuroEAP 2027 · Richieste". Every request sent from the
   website is added there as a row. Leave empty to switch the register off. */
window.EUROEAP_CONFIG = {
  sheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbztFmnvggZW1t5spvM4k3VJSobDJ3qGtUfF_CQUiheWfJA1Y0ybiF5t_Bq375_7ykCN/exec"
};
