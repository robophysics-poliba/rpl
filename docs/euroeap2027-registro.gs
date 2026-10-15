/**
 * EuroEAP 2027 — Registro richieste (Google Sheets)
 *
 * Ogni richiesta inviata dal sito (poster, Society Challenge, sponsor) diventa
 * una riga nella scheda giusta di questo foglio. La scheda "Riepilogo" conta
 * tutto da sola. Lo stato di ogni richiesta si sceglie dal menu a tendina:
 * Nuova · Da ricontattare · Confermata · Annullata.
 *
 * INSTALLAZIONE (una volta sola, 5 minuti)
 *  1. Crea un Foglio Google vuoto, chiamalo "EuroEAP 2027 · Richieste".
 *  2. Estensioni > Apps Script. Cancella il codice di esempio e incolla tutto
 *     questo file. Salva (icona del dischetto).
 *  3. In alto scegli la funzione "setup" e premi Esegui. Google chiede
 *     l'autorizzazione: Rivedi autorizzazioni > il tuo account > Avanzate >
 *     Vai a ... (non sicuro) > Consenti. È il tuo script, sul tuo foglio.
 *     Il foglio ora ha le schede Riepilogo, Poster, Society Challenge, Sponsor.
 *  4. Esegui > Nuovo deployment > tipo "App web".
 *       Esegui come: Me
 *       Chi ha accesso: Chiunque
 *     Premi Esegui il deployment e copia l'URL che finisce con /exec.
 *  5. Incolla l'URL in public/euroeap2027/config.js (sheetsWebhookUrl) e
 *     pubblica il sito. Fatto.
 *  6. Condividi il foglio (pulsante Condividi) con Vito e Yu come Editor.
 *
 * L'URL /exec accetta solo nuove righe: non permette di leggere il foglio.
 * Se modifichi questo codice, per renderlo attivo serve
 * Esegui il deployment > Gestisci deployment > modifica > Nuova versione.
 */

var STATI = ['Nuova', 'Da ricontattare', 'Confermata', 'Annullata'];
var COLORI = { 'Nuova': '#E3ECFD', 'Da ricontattare': '#FCEFD9', 'Confermata': '#DEF3E5', 'Annullata': '#E7E9EC' };

var SCHEDE = {
  poster: {
    nome: 'Poster',
    colonne: ['Ricevuta', 'Stato', 'Note', 'Titolo del poster', 'Nome', 'Cognome', 'Affiliazione', 'Paese', 'Email', 'Coautori', 'Abstract'],
    campi:   [null, null, null, 'title', 'first_name', 'last_name', 'affiliation', 'country', 'email', 'co_authors', 'abstract']
  },
  challenge: {
    nome: 'Society Challenge',
    colonne: ['Ricevuta', 'Stato', 'Note', 'Titolo della demo', 'Nome', 'Cognome', 'Affiliazione', 'Paese', 'Email', 'Coautori', 'Descrizione'],
    campi:   [null, null, null, 'title', 'first_name', 'last_name', 'affiliation', 'country', 'email', 'co_authors', 'abstract']
  },
  sponsor: {
    nome: 'Sponsor',
    colonne: ['Ricevuta', 'Stato', 'Note', 'Pacchetto', 'Importo (€)', 'Azienda', 'Referente', 'Ruolo', 'Email', 'Telefono', 'Sito web', 'Messaggio'],
    campi:   [null, null, null, 'package', '_importo', 'organisation', 'contact_name', 'role', 'email', 'phone', 'website', 'message']
  }
};

/** Riceve una richiesta dal sito e la aggiunge in fondo alla scheda giusta. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var s = SCHEDE[d.type];
    if (!s) return risposta({ ok: false, error: 'tipo sconosciuto' });

    var foglio = SpreadsheetApp.getActive().getSheetByName(s.nome);
    var riga = s.campi.map(function (campo, i) {
      if (i === 0) return new Date();
      if (i === 1) return 'Nuova';
      if (i === 2) return '';
      if (campo === '_importo') return importo(d.package);
      return pulisci(d[campo]);
    });
    foglio.appendRow(riga);
    var n = foglio.getLastRow();
    foglio.getRange(n, 2).setDataValidation(regolaStati());
    foglio.getRange(n, 1).setNumberFormat('dd/mm/yyyy hh:mm');
    return risposta({ ok: true });
  } catch (err) {
    return risposta({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return risposta({ ok: true, info: 'EuroEAP 2027 registro richieste: attivo' });
}

/** Crea (o ricrea) intestazioni, menu degli stati, colori e riepilogo. Non cancella righe. */
function setup() {
  var ss = SpreadsheetApp.getActive();

  Object.keys(SCHEDE).forEach(function (k) {
    var s = SCHEDE[k];
    var f = ss.getSheetByName(s.nome) || ss.insertSheet(s.nome);
    var cols = s.colonne.length;
    f.getRange(1, 1, 1, cols).setValues([s.colonne])
      .setFontWeight('bold').setBackground('#0F1318').setFontColor('#FFFFFF');
    f.setFrozenRows(1);
    f.setFrozenColumns(1);
    f.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
    f.getRange(2, 2, Math.max(f.getMaxRows() - 1, 1), 1).setDataValidation(regolaStati());
    if (k === 'sponsor') f.getRange('E:E').setNumberFormat('#,##0 €');

    // Colore della riga secondo lo stato.
    var area = f.getRange(2, 1, Math.max(f.getMaxRows() - 1, 1), cols);
    f.setConditionalFormatRules(STATI.map(function (st) {
      return SpreadsheetApp.newConditionalFormatRule()
        .whenFormulaSatisfied('=$B2="' + st + '"')
        .setBackground(COLORI[st]).setRanges([area]).build();
    }));
    f.setColumnWidth(1, 130); f.setColumnWidth(2, 140); f.setColumnWidth(3, 220); f.setColumnWidth(4, 280);
  });

  // ------------------------------------------------------------ Riepilogo
  var r = ss.getSheetByName('Riepilogo') || ss.insertSheet('Riepilogo', 0);
  r.getCharts().forEach(function (c) { r.removeChart(c); });
  r.getRange('A1:J40').breakApart();
  r.clear();
  r.setHiddenGridlines(true);
  r.setColumnWidth(1, 190);
  for (var c = 2; c <= 7; c++) r.setColumnWidth(c, 150);
  r.setColumnWidth(8, 30); r.setColumnWidth(9, 130); r.setColumnWidth(10, 90);

  r.getRange('A1').setValue('EuroEAP 2027 · Richieste dal sito').setFontSize(18).setFontWeight('bold');
  r.getRange('A2').setValue('Si aggiorna da solo. Lo stato si cambia nelle schede Poster, Society Challenge e Sponsor (colonna B).')
    .setFontColor('#4B535E');

  // Contatori (righe 4-6): etichetta, numero grande, dettaglio.
  var tessere = [
    ['Tutte le richieste', '=B12', '=G12&" da gestire"', '#0F1318', '#FFFFFF'],
    ['Poster', '=B9', '=G9&" da gestire"', '#F1F3F5', '#0F1318'],
    ['Society Challenge', '=B10', '=G10&" da gestire"', '#F1F3F5', '#0F1318'],
    ['Sponsor', '=B11', '=G11&" da gestire"', '#F1F3F5', '#0F1318'],
    ['Confermate', '=E12', '="su "&B12&" totali"', '#DEF3E5', '#1E8449'],
    ['Sponsor confermati', "=SUMIF('Sponsor'!B2:B,\"Confermata\",'Sponsor'!E2:E)", '="+ "&B13&" € in trattativa"', '#D3241C', '#FFFFFF']
  ];
  tessere.forEach(function (t, i) {
    var col = i + 1;
    r.getRange(4, col).setValue(t[0]).setFontSize(9).setFontWeight('bold');
    r.getRange(5, col).setFormula(t[1]).setFontSize(30).setFontWeight('bold');
    r.getRange(6, col).setFormula(t[2]).setFontSize(9);
    r.getRange(4, col, 3, 1).setBackground(t[3]).setFontColor(t[4]).setHorizontalAlignment('left')
      .setBorder(true, true, true, true, false, false, '#FFFFFF', SpreadsheetApp.BorderStyle.SOLID_THICK);
  });
  r.getRange('F5').setNumberFormat('#,##0 "€"');
  r.setRowHeight(4, 26); r.setRowHeight(5, 56); r.setRowHeight(6, 26);

  // Tabella (righe 8-12).
  r.getRange('A8:G8').setValues([['Categoria', 'Totale', 'Nuove', 'Da ricontattare', 'Confermate', 'Annullate', 'Da gestire']])
    .setFontWeight('bold').setBackground('#0F1318').setFontColor('#FFFFFF');
  var righe = ['Poster', 'Society Challenge', 'Sponsor'];
  righe.forEach(function (nome, i) {
    var n = 9 + i, t = "'" + nome + "'!";
    r.getRange(n, 1, 1, 7).setFormulas([[
      '="' + nome + '"',
      '=COUNTA(' + t + 'A2:A)',
      '=COUNTIF(' + t + 'B2:B,"Nuova")',
      '=COUNTIF(' + t + 'B2:B,"Da ricontattare")',
      '=COUNTIF(' + t + 'B2:B,"Confermata")',
      '=COUNTIF(' + t + 'B2:B,"Annullata")',
      '=C' + n + '+D' + n
    ]]);
  });
  r.getRange('A12:G12').setFormulas([['="Totale"', '=SUM(B9:B11)', '=SUM(C9:C11)', '=SUM(D9:D11)', '=SUM(E9:E11)', '=SUM(F9:F11)', '=SUM(G9:G11)']])
    .setFontWeight('bold').setBorder(true, null, null, null, null, null, '#0F1318', SpreadsheetApp.BorderStyle.SOLID);
  r.getRange('B9:G12').setHorizontalAlignment('center');
  r.getRange('A13').setValue('Sponsor in trattativa (€)').setFontColor('#4B535E');
  r.getRange('B13').setFormula("=SUMIF('Sponsor'!B2:B,\"Nuova\",'Sponsor'!E2:E)+SUMIF('Sponsor'!B2:B,\"Da ricontattare\",'Sponsor'!E2:E)")
    .setNumberFormat('#,##0').setHorizontalAlignment('center').setFontColor('#4B535E');

  // Dati per la ciambella (colonne I-J).
  r.getRange('I8:J8').setValues([['Stato', 'Richieste']]).setFontWeight('bold').setFontColor('#9AA1AA');
  r.getRange('I9:J12').setFormulas([
    ['="Nuove"', '=C12'], ['="Da ricontattare"', '=D12'], ['="Confermate"', '=E12'], ['="Annullate"', '=F12']
  ]).setFontColor('#9AA1AA');

  var colori = ['#2F6FEB', '#E08A00', '#1E8449', '#9AA1AA'];
  r.insertChart(r.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(r.getRange('A8:A11')).addRange(r.getRange('C8:F11'))
    .setNumHeaders(1)
    .setOption('isStacked', true)
    .setOption('colors', colori)
    .setOption('title', 'Richieste per categoria e stato')
    .setOption('legend', { position: 'bottom' })
    .setOption('width', 640).setOption('height', 320)
    .setPosition(15, 1, 0, 0)
    .build());
  r.insertChart(r.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(r.getRange('I8:J12'))
    .setNumHeaders(1)
    .setOption('pieHole', 0.5)
    .setOption('colors', colori)
    .setOption('title', 'Tutte le richieste per stato')
    .setOption('legend', { position: 'right' })
    .setOption('width', 460).setOption('height', 320)
    .setPosition(15, 5, 20, 0)
    .build());

  var vuota = ss.getSheetByName('Foglio1') || ss.getSheetByName('Sheet1');
  if (vuota && vuota.getLastRow() === 0) ss.deleteSheet(vuota);
  ss.setActiveSheet(r);
}

/* ------------------------------------------------------------------ utilità */
function regolaStati() {
  return SpreadsheetApp.newDataValidation().requireValueInList(STATI, true).setAllowInvalid(false).build();
}
function importo(pacchetto) {
  var m = /^(Bronze|Silver|Gold)/.exec(pacchetto || '');
  return m ? { Bronze: 500, Silver: 1000, Gold: 2000 }[m[1]] : '';
}
/** Evita che un testo che inizia con = + - @ venga eseguito come formula. */
function pulisci(v) {
  v = v == null ? '' : String(v).slice(0, 2000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
function risposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
