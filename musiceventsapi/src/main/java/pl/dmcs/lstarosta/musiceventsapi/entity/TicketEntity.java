package pl.dmcs.lstarosta.musiceventsapi.entity;

import javax.persistence.*;

@Entity
@Table(name = "ticket", schema = "public", catalog = "MusicEvents")
public class TicketEntity {
    private int id;
    private float price;

    public TicketEntity(EventEntity event, UserEntity user, int col, int row, int price) {
        this.event = event;
        this.user = user;
        this.col = col;
        this.row = row;
        this.price = price;
    }

    public TicketEntity() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "price", nullable = false)
    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TicketEntity that = (TicketEntity) o;

        if (id != that.id) return false;
        if (price != that.price) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (int)price;
        return result;
    }

    private int row;

    @Basic
    @Column(name = "row")
    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    private int col;

    @Basic
    @Column(name = "col")
    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    private UserEntity user;

    @OneToOne
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    private EventEntity event;

    @OneToOne
    public EventEntity getEvent() {
        return event;
    }

    public void setEvent(EventEntity event) {
        this.event = event;
    }
}
