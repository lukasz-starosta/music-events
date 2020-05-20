package pl.dmcs.lstarosta.musiceventsapi.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import pl.dmcs.lstarosta.musiceventsapi.entity.UserEntity;

import java.util.*;

public class UserPrinciple implements UserDetails {

    private int id;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrinciple(int id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrinciple build(UserEntity user) {
        // TODO: change the roles here
        List<GrantedAuthority> authorities = new ArrayList<>(Collections.singleton(new SimpleGrantedAuthority("user")));

        return new UserPrinciple(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    public int getId() {
        return id;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;

        UserPrinciple user = (UserPrinciple) obj;
        return Objects.equals(id, user.id);
    }
}
