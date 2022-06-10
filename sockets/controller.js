const TicketControl = require("../models/ticket-control");

const ticketsControl = new TicketControl;

const socketController = (socket) => {
    // socket.on('disconnect', () => {    
    // });
    socket.emit('ultimo-ticket',ticketsControl.ultimo);
    const Proximos3 =[ticketsControl.tickets[0].numero,ticketsControl.tickets[1].numero,ticketsControl.tickets[2].numero]
    socket.emit('estado-actual', ticketsControl.ultimos4,Proximos3);
   
    // total de pendientes
    socket.emit('tickets-pendientes',ticketsControl.tickets.length)


    socket.on('siguinte-ticket', ( payload, callback ) => {
        
       const siguiente = ticketsControl.siguiente();
       callback( siguiente );
       

       //notificar que hay un nuevo cliente
       socket.broadcast.emit('tickets-pendientes',ticketsControl.tickets.length)
    });

    socket.on('atender-ticket',( {escritorio}, callback)=>{
        if( !escritorio ){
            return callback({
                ok:false,
                msg: "el escritorio es necesario",
                
            })
        }

        const   ticket = ticketsControl.atenderTicket(escritorio)
        //Todo: notificar cambio en los ultimos 4
        const Proximos3 =[ticketsControl.tickets[0].numero,ticketsControl.tickets[1].numero,ticketsControl.tickets[2].numero]
        socket.broadcast.emit('estado-actual', ticketsControl.ultimos4,Proximos3)
        socket.broadcast.emit('tickets-pendientes',ticketsControl.tickets.length)
        if(!ticket){
            callback({
                ok:false,
                
            })
        }else{
            callback({
                ok: true,
                ticket,
                msg:"Ya no hay tickets",
                pendientes:ticketsControl.tickets.length
            })
        }
        
    })

}



module.exports = {
    socketController
}

