package pl.dmcs.lstarosta.musiceventsapi.message.request;

import pl.dmcs.lstarosta.musiceventsapi.entity.EventEntity;
import pl.dmcs.lstarosta.musiceventsapi.entity.PaymentEntity;
import pl.dmcs.lstarosta.musiceventsapi.entity.UserEntity;

public class BookTicket {

    private EventEntity event;
    private UserEntity user;
    private int row;
    private int col;

    public BookTicket() {
    }

    public EventEntity getEvent() {
        return event;
    }

    public void setEvent(EventEntity event) {
        this.event = event;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

}
