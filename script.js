$('.invia').click(function(){
    //Creo una variabile che contiene il testo dell'input
    var testo_messaggio = $('.invia_mes input').val()

    if (testo_messaggio != '') {
        //Inserisco il testo dell'input dentro al template da visualizzare
        $('.template .messaggio p:first-of-type').text(testo_messaggio)

        //Aggiungo il template con relativo messaggio in pagina
        $('.chat_page').append($('.template .messaggio').clone())

        //Cancello il contenuto dell'input
        $('.invia_mes input').val('')
    }
})

$('.invia_mes input').on('keypress',function(e) {
    if(e.which == 13) {
        //Creo una variabile che contiene il testo dell'input
        var testo_messaggio = $('.invia_mes input').val()

        if (testo_messaggio != '') {
            //Inserisco il testo dell'input dentro al template da visualizzare
            $('.template .messaggio p:first-of-type').text(testo_messaggio)

            //Aggiungo il template con relativo messaggio in pagina
            $('.chat_page').append($('.template .messaggio').clone())

            //Cancello il contenuto dell'input
            $('.invia_mes input').val('')
        }
    }
});


//Creo una variabile che cambia se l'input è on focus o meno
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
