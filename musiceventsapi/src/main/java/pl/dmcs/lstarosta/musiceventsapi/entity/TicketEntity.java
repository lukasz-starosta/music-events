package pl.dmcs.lstarosta.musiceventsapi.entity;

import javax.persistence.*;

@Entity
@Table(name = "ticket", schema = "public", catalog = "MusicEvents")
public class TicketEntity {
    private int id;
    private int price;
    private boolean isBooked;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "price", nullable = false)
    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Basic
    @Column(name = "is_booked", nullable = false)
    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TicketEntity that = (TicketEntity) o;

        if (id != that.id) return false;
        if (price != that.price) return false;
        if (isBooked != that.isBooked) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + price;
        result = 31 * result + (isBooked ? 1 : 0);
        return result;
    }
}
