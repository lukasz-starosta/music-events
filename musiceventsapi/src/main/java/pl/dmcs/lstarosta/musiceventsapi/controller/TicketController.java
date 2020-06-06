package pl.dmcs.lstarosta.musiceventsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.lstarosta.musiceventsapi.entity.PaymentEntity;
import pl.dmcs.lstarosta.musiceventsapi.entity.TicketEntity;
import pl.dmcs.lstarosta.musiceventsapi.message.request.BookTicket;
import pl.dmcs.lstarosta.musiceventsapi.message.request.BookTicketRequest;
import pl.dmcs.lstarosta.musiceventsapi.repository.PaymentRepository;
import pl.dmcs.lstarosta.musiceventsapi.repository.TicketRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/tickets")
public class TicketController {
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @GetMapping()
    public ResponseEntity<List<TicketEntity>> getTickets(@RequestParam(required = false) Optional<Integer> eventId, @RequestParam(required = false) Optional<Integer> userId) {

        Optional<List<TicketEntity>> tickets = Optional.of(new ArrayList<TicketEntity>());

        if (eventId.isPresent()) {
            tickets = ticketRepository.findByEventId(eventId.get());
        } else if (userId.isPresent()) {
            tickets = ticketRepository.findByUserId(userId.get());
        }

        if (!tickets.isPresent()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<TicketEntity>>(tickets.get(), HttpStatus.OK);
    }

    @PostMapping("/book")
    @Transactional
    public ResponseEntity<TicketEntity> bookTicket(@RequestBody BookTicketRequest bookTicketRequest) {
        List<BookTicket> bookTickets = bookTicketRequest.getTickets();
        List<TicketEntity> tickets = new ArrayList<>();

        if (bookTickets.size() == 0) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        for (BookTicket ticket : bookTickets) {
            if (!userDetails.getUsername().equals(ticket.getUser().getEmail())) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Optional<TicketEntity> existingTicket = ticketRepository.isBooked(ticket.getEvent().getId(), ticket.getRow(), ticket.getCol());
            if (!existingTicket.isPresent()) {
                TicketEntity newTicket = new TicketEntity(ticket.getEvent(), ticket.getUser(), ticket.getCol(), ticket.getRow(), ticket.getEvent().getTicketPrice());
                tickets.add(newTicket);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }

        PaymentEntity payment = new PaymentEntity(bookTicketRequest.getCardNumber(), bookTicketRequest.getTickets().get(0).getUser(), tickets);
        paymentRepository.save(payment);
        ticketRepository.saveAll(tickets);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
