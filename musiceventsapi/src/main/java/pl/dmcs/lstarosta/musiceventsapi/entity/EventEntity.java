package pl.dmcs.lstarosta.musiceventsapi.entity;

import pl.dmcs.lstarosta.musiceventsapi.message.request.NewEvent;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "event", schema = "public", catalog = "MusicEvents")
public class EventEntity {
    private int id;
    private String name;
    private String city;
    private Date date;

    public EventEntity() {
    }

    public EventEntity(NewEvent newEvent) {
        this.setName(newEvent.getName());
        this.setCity(newEvent.getCity());
        this.setAddress(newEvent.getAddress());
        this.setDate(newEvent.getDate());
        this.setColumns(newEvent.getColumns());
        this.setRows(newEvent.getRows());
        this.setMusicType(newEvent.getMusicType());
        this.setTicketPrice(newEvent.getTicketPrice());
        this.setDescription(newEvent.getDescription());
    }

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
    @Column(name = "name", nullable = false, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "date", nullable = false)
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EventEntity that = (EventEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (date != null ? !date.equals(that.date) : that.date != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "city", nullable = false)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    private String musicType;

    @Basic
    @Column(name = "musicType")
    public String getMusicType() {
        return musicType;
    }

    public void setMusicType(String musicType) {
        this.musicType = musicType;
    }

    private String address;

    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    private String description;

    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    private int rows;

    @Basic
    @Column(name = "rows")
    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    private int columns;

    @Basic
    @Column(name = "columns")
    public int getColumns() {
        return columns;
    }

    public void setColumns(int columns) {
        this.columns = columns;
    }


    private int ticketPrice;

    @Basic
    @Column(name="ticketPrice")
    public int getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(int ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
