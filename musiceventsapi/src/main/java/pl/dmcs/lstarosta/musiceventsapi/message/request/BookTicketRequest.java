package pl.dmcs.lstarosta.musiceventsapi.message.request;

import pl.dmcs.lstarosta.musiceventsapi.entity.PaymentEntity;

import java.util.List;

public class BookTicketRequest {
    List<BookTicket> tickets;
    String cardNumber;

    public List<BookTicket> getTickets() {
        return tickets;
    }

    public void setTickets(List<BookTicket> tickets) {
        this.tickets = tickets;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
}
