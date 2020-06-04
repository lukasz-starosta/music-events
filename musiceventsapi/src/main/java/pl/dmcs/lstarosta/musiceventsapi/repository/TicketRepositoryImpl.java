package pl.dmcs.lstarosta.musiceventsapi.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.dmcs.lstarosta.musiceventsapi.entity.TicketEntity;

import java.util.List;
import java.util.Optional;

public abstract class TicketRepositoryImpl implements TicketRepositoryCustom {
//    @Autowired
//    TicketRepository ticketRepository;
//
//    @Override
//    @Query("SELECT t FROM TicketEntity t WHERE t.event.id = :eventId")
//    public abstract Optional<List<TicketEntity>> findByEventId(@Param("eventId") Integer eventId);
//
//    @Override
//    public Optional<List<TicketEntity>> findByUserId(Integer eventId) {
//        return Optional.empty();
//    }
}
