package pl.dmcs.lstarosta.musiceventsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.lstarosta.musiceventsapi.entity.TicketEntity;
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
}
