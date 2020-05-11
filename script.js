$('.fa-microphone').click(function(){
    //Creo una variabile che contiene il testo dell'input
    var testo_messaggio = $('.invia_mes input').val()

    if (testo_messaggio != '') {
        //Inserisco il testo dell'input dentro al template da visualizzare
        $('.template .messaggio p:first-of-type').text(testo_messaggio)

        //Aggiungo il template con relativo messaggio in pagina
        $('.chat_page').append($('.template .messaggio').clone())
    }

})
