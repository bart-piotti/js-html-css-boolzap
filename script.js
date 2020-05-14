function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


// ---------------- VISUALIZZA L'ULTIMO MESSAGGIO SOTTO AL CONTATTO ----------------
function aggiornaUltimo(){
    $('.chat').each(function(){
        var data_chat = $(this).attr('data-chat')
        var ultimo_messaggio = $('.chat_page[data-chat="' + data_chat +'"] .messaggio:last-child p:first-of-type').text()
        var ora_ultimo_messaggio = $('.chat_page[data-chat="' + data_chat +'"] .messaggio:last-child p:last-of-type').text()
        $(this).find('.ultimo_messaggio').text(ultimo_messaggio)
        $(this).find('.ora_ultimo_mess').text(ora_ultimo_messaggio)
    })
}
// ---------------- VISUALIZZA L'ULTIMO MESSAGGIO SOTTO AL CONTATTO ----------------


// ---------------- INVIA MESSAGGIO ----------------
function inviaMess() {
    //Creo delle variabili per ore e minuti
    d = new Date();
    ora = d.getHours().toString();
    minuti = d.getMinutes().toString();
    if (minuti.length < 2) {
        minuti = '0' + minuti;
    }

    //Creo una variabile che contiene il testo dell'input
    var testo_messaggio = $('.invia_mes input').val()

    if (testo_messaggio.trim() != '') {
        //Inserisco il testo dell'input dentro al template da visualizzare
        $('.template .messaggio:first-child p:first-of-type').text(testo_messaggio)

        //Aggiunge l'ora al messaggio
        $('.template .messaggio:first-child p:last-of-type').text(ora + ':' + minuti)

        //Aggiungo il template con relativo messaggio in pagina
        $('.chat_page.active').append($('.template .messaggio:first-child').clone())

        aggiornaUltimo()

        //Cancello il contenuto dell'input
        $('.invia_mes input').val('')

        //Auto scroll-down
        $('.chat_page').scrollTop($('.chat_page').height());

        inviaRisposta()
    }
}

//Cliccando sull'icona "invia" viene inviato il messaggio
$('.invia').click(inviaMess)

//Cliccando ENTER viene inviato il messaggio
$('.invia_mes input').on('keypress',function(e) {
    if(e.which == 13) {
        inviaMess()
    }
});
// ---------------- /INVIA MESSAGGIO ----------------


// ---------------- RISPONDI AD OGNI MESSAGGIO ----------------
//Funzione per rispondere "Ok"
function inviaRisposta() {
    //Aggiunge l'ora al messaggio di risposta, aggiunge lo 0 davanti ai minuti se hanno una sola cifra
    $('.template .risposta p:last-of-type').text(ora + ':' + minuti)

    //Dopo 3 secondi da quando è stata chiamata manda una risposta
    setTimeout(function(){
        $('.chat_page.active').append($('.template .risposta').clone())
        aggiornaUltimo()
        //Auto scroll-down
        $('.chat_page').scrollTop($('.chat_page').height());
    }, 1000)
}
// ---------------- /RISPONDI AD OGNI MESSAGGIO ----------------


// ---------------- SWITCH ICONA MICROFONO/TASTO INVIA ----------------
//Creo una variabile che cambia se l'input è on focus o meno per visualizzare l'icona corretta
var focus;
$('.invia_mes input').focus(function(){
    $('.fa-microphone').hide()
    $('.invia').show()
    focus = true;
})
$('.invia_mes input').blur(function(){
    focus = false;
})

//Ad ogni click verifica se l'input del messaggio abbia il focus o meno e mostra l'icona adatta
$(document).click(function()
{
    if(focus != true) {
          $('.fa-microphone').show()
          $('.invia').hide()
    }
    else {
        $('.fa-microphone').hide()
        $('.invia').show()
    }
});
// ---------------- /SWITCH ICONA MICROFONO/TASTO INVIA ----------------


// ---------------- RICERCA CONTATTI ----------------
//Reagise ad ogni tasto premuto quando si è in input sulla barra di ricerca
$('.ricerca input').keyup(function(event){
        //Al primo tasto che premi nasconde le chat senza corrispondenza
        $('.chat').hide()
        //Scorre tra tutti i nomi dei contatti ed esegue la funzione su ognuno
        $('.nome_contatto').each(function(){
            //Se il testo di ".nome contatto"(this) contiene ciò che ha cercato l'utente ==>
            if ($(this).text().toLowerCase().trim().includes($('.ricerca input').val().toLowerCase().trim())) {
                // ==> Mostra quel contatto
                $(this).closest('.chat').show()
            }
        })
})
// ---------------- /RICERCA CONTATTI ----------------


// ---------------- OPZIONI MESSAGGIO ----------------
$(document).on('click', '.info', function(){
    //(this) corrisponde a .info
    $(this).siblings('.opzioni_messaggio').toggle()
})

$('body').click(function(event){
    if(event.target.className != 'messaggio_info') {
        $('.opzioni_messaggio').hide()
    }
})
// ---------------- /OPZIONI MESSAGGIO ----------------


// ---------------- CANCELLA MESSAGGIO ----------------
$(document).on('click', '.canc_mess', function(){
    //(this) corrisponde a .canc_mess
    $(this).closest('.messaggio').hide()
})
// ---------------- /CANCELLA MESSAGGIO ----------------


// ---------------- CAMBIA CHAT CON CLICK SU CONTATTO ----------------
$('.elenco_chat .chat').click(function(){
    //Recuper il data del contatto su chui ho cliccato
    var data_chat = $(this).attr('data-chat')
    console.log(data_chat);
    //Rimuovo la classe active da tutte le chat (le nascondo tutte)
    $('.chat_page').removeClass('active')
    //Aggiungo la classe active alla chat con lo stesso data del contatto su cui ho cliccato
    $('.chat_page[data-chat="' + data_chat +'"]').addClass('active')
    //Metto nell'header della chat il nome e la foto del contatto su cui ho cliccato
    $('.nome_foto p').text($(this).find('.nome_contatto').text())
    $('.nome_foto img').attr('src', $(this).find('img').attr('src'))

    //Rimuovo la classe active (sfondo grigio) a tutti i contatti
    $('.chat').removeClass('active')
    //Aggiungo la classe active al contatto su cui ho cliccato
    $(this).addClass('active')
})
// ---------------- /CAMBIA CHAT CON CLICK SU CONTATTO ----------------
