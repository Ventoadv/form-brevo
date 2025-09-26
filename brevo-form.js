(function () {
  function ready(fn){ if(document.readyState!=='loading'){fn()} else {document.addEventListener('DOMContentLoaded',fn)} }

  ready(function(){
    var form       = document.getElementById('sib-form');
    var ricField   = document.getElementById('RICETTARIO_SCELTO');
    var successBox = document.getElementById('success-message');
    var errorBox   = document.getElementById('error-message');
    var container  = document.getElementById('sib-container');
    var submitBtn  = document.getElementById('submit-btn');

    if (!form || !ricField) return;

    // 1) Parametro ?ricettario=
    var params = new URLSearchParams(window.location.search);
    var raw = (params.get('ricettario') || '').trim().toLowerCase();

    // 2) Mappa slug -> etichetta
    var map = {
      'pecorino': 'Ricettario del Pecorino',
      'polpette': 'Ricettario delle Polpette',
      'natale': 'Ricettario di Natale',
      'estivo': 'Ricettario Estivo',
      'insalate': 'Ricettario Insalate',
      'carnevale': 'Ricettario del Carnevale',
      'tradizione-romana': 'Ricettario della Tradizione Romana',
      'friggitrice-ad-aria': 'Ricettario Friggitrice ad Aria',
      'panini-da-spiaggia': 'Ricettario Panini da Spiaggia'
    };

    var finalVal = Object.prototype.hasOwnProperty.call(map, raw) ? map[raw] : raw;

    // Campo visibile per TEST (poi metti type="hidden")
    ricField.value = finalVal;

    // 3) Submit handler
    var submitted = false;
    form.addEventListener('submit', function(e){
      if (!finalVal) {
        e.preventDefault();
        if (errorBox) errorBox.style.display = 'block';
        else alert('Seleziona prima un ricettario dalla pagina precedente.');
        return;
      }
      ricField.value = finalVal;
      submitted = true;

      // Crea iframe target al volo (evita “sparizione” al load iniziale)
      var iframe = document.getElementById('sib_hidden_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.name = 'sib_hidden_iframe';
        iframe.id   = 'sib_hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        iframe.addEventListener('load', function(){
          if (!submitted) return;
          if (successBox) successBox.style.display = 'block';
          if (container)  container.style.display  = 'none';
        });
      }
      form.setAttribute('target', 'sib_hidden_iframe');

      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = 0.7; }
    });
  });
})();
