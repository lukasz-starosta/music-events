package pl.dmcs.lstarosta.musiceventsapi.entity;

import org.hibernate.annotations.NaturalId;
import pl.dmcs.lstarosta.musiceventsapi.enums.RoleEnum;

import javax.persistence.*;

@Entity
@Table(name = "role", schema = "public", catalog = "MusicEvents")
public class RoleEntity {
    private int id;
    private RoleEnum name;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Enumerated(EnumType.STRING)
    @NaturalId
    public RoleEnum getName() {
        return name;
    }

    public void setName(RoleEnum name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RoleEntity that = (RoleEntity) o;

        if (id != that.id) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
