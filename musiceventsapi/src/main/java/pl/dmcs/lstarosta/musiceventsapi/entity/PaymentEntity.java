package pl.dmcs.lstarosta.musiceventsapi.entity;

import pl.dmcs.lstarosta.musiceventsapi.enums.PaymentStatusEnum;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "payment", schema = "public", catalog = "MusicEvents")
public class PaymentEntity {

    public PaymentEntity(String cardNumber, UserEntity user, List<TicketEntity> tickets) {
        this.setCardNumber(cardNumber);
        this.setUser(user);
        this.setTickets(tickets);
        this.setDate(new Date());
        this.setStatus(PaymentStatusEnum.valid);
    }

    public PaymentEntity() {}

    private int id;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private UserEntity user;

    @OneToOne
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    private List<TicketEntity> tickets;

    @OneToMany
    public List<TicketEntity> getTickets() {
        return tickets;
    }

    public void setTickets(List<TicketEntity> tickets) {
        this.tickets = tickets;
    }

    public float calculatePrice() {
        float sum = 0;
        for (TicketEntity ticket : getTickets()) {
            sum += ticket.getPrice();
        }
        return sum;
    }

    private PaymentStatusEnum status;

    @Basic
    public PaymentStatusEnum getStatus() {
        return status;
    }

    public void setStatus(PaymentStatusEnum status) {
        this.status = status;
    }

    private Date date;

    @Basic
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    private String cardNumber;

    @Basic
    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
}
