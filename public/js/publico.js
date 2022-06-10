//referencias HTML
const lblTikcet1 = document.querySelector('#lblTicket1');
const lblTikcet2 = document.querySelector('#lblTicket2');
const lblTikcet3 = document.querySelector('#lblTicket3');
const lblTikcet4 = document.querySelector('#lblTicket4');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');
const ProxTicket2 = document.querySelector('#ProxTicket2');
const ProxTicket3 = document.querySelector('#ProxTicket3');
const ProxTicket4 = document.querySelector('#ProxTicket4');
const socket = io();


socket.on('estado-actual', (payload, proximos)=>{
   const audo = new Audio('./audio/new-tickte.mp3')
   const[ ticket1, ticket2, ticket3, ticket4]= payload;
   const[ proximo1, proximo2, proximo3]= proximos;
   if( ticket1 ){
    lblTikcet1.innerText =  'Ticket ' + ticket1.numero;
    lblEscritorio1.innerText = ticket1.escritorio;
   }else{
        lblTikcet1.innerText =  'No hay clientes';  
   }
   if( ticket2 ){
    lblTikcet2.innerText =  'Ticket ' + ticket2.numero;
    lblEscritorio2.innerText = ticket2.escritorio;
   }else{
        lblTikcet2.innerText =  'No hay clientes';  
   }
   if( ticket3 ){
    lblTikcet3.innerText =  'Ticket ' + ticket3.numero;
    lblEscritorio3.innerText = ticket3.escritorio;
   }else{
    lblTikcet3.innerText =  'No hay clientes';  
    }
   if( ticket4 ){
    lblTikcet4.innerText =  'Ticket ' + ticket4.numero;
    lblEscritorio4.innerText = ticket4.escritorio;
   }else{
    lblTikcet3.innerText =  'No hay clientes';  
    }

    if(proximo1){
        ProxTicket2.innerText =  'Ticket ' + proximo3;
    }
    if(proximo2){
        ProxTicket3.innerText =  'Ticket ' + proximo2;
    }
    if(proximo3){
        ProxTicket4.innerText =  'Ticket ' + proximo1;
    }
   

})