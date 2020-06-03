package pl.dmcs.lstarosta.musiceventsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.lstarosta.musiceventsapi.entity.EventEntity;
import pl.dmcs.lstarosta.musiceventsapi.repository.EventRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/events")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping()
    public ResponseEntity<List<EventEntity>> getEvents() {
        return new ResponseEntity<List<EventEntity>>(eventRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventEntity> getEvent(@PathVariable Long id) {
        Optional<EventEntity> event = eventRepository.findById(id);
        if (!event.isPresent()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<EventEntity>(event.get(), HttpStatus.OK);
    }
}
