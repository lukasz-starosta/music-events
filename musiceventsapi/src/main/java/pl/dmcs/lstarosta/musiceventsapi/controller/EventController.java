package pl.dmcs.lstarosta.musiceventsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.lstarosta.musiceventsapi.entity.EventEntity;
import pl.dmcs.lstarosta.musiceventsapi.repository.EventRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/events")
public class EventController {

    @Autowired
    EventRepository eventRepository;

    @GetMapping()
    public List<EventEntity> getEvents() {
        return eventRepository.findAll();
    }
}
