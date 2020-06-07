package pl.dmcs.lstarosta.musiceventsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.dmcs.lstarosta.musiceventsapi.entity.TicketEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<TicketEntity, Long>, TicketRepositoryCustom {
}

@Repository
interface TicketRepositoryCustom {
    @Query("SELECT t FROM TicketEntity t WHERE t.event.id = :eventId")
    Optional<List<TicketEntity>> findByEventId(@Param("eventId") Long eventId);

    @Query("SELECT t FROM TicketEntity t WHERE t.user.id = :userId")
    Optional<List<TicketEntity>> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT t FROM TicketEntity t WHERE t.user.id = :userId AND t.event.date >= current_date ")
    Optional<List<TicketEntity>> findUpcomingTicketsForUser(@Param("userId") Integer userId);

    @Query("SELECT t FROM TicketEntity t WHERE t.event.id = :eventId AND t.row = :row AND t.col = :col")
    Optional<TicketEntity> isBooked(@Param("eventId") Long eventId, @Param("row") Integer row, @Param("col") Integer col);
}
