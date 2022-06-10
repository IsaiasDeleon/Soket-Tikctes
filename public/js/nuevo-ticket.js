//referencias html 
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button")

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled= false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled= true;

});




btnCrear.addEventListener( 'click', () => {
    socket.emit( 'siguinte-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerHTML= ticket
    });

});

socket.on('ultimo-ticket', ( ticket ) => {
    lblNuevoTicket.innerHTML="Ticket " +ticket;
});