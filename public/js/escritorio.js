//referencias html 
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblticket = document.querySelector('small');
const alert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if ( searchParams.has('Escritorio')){
    window.location = 'index.html';
    throw new Error(' El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio

const socket = io();
alert.style.display = "none";


socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled= false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled= true;

});




btnAtender.addEventListener( 'click', () => {
    
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg, pendientes})=>{
        if(!ok){
            lblticket.innerText = 'nadie';
            return  alert.style.display = "";
        }
        lblticket.innerText = 'Ticket'+ticket.numero;
        lblPendientes.innerText=pendientes;
       
    })
    // socket.emit( 'siguinte-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerHTML= ticket
    // });

});
socket.on('tickets-pendientes', (pendientes)=>{
    lblPendientes.innerText=pendientes;
})

socket.on('ultimo-ticket', ( ticket ) => {
   // lblNuevoTicket.innerHTML="Ticket " +ticket
});