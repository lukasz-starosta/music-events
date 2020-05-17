package pl.dmcs.lstarosta.musiceventsapi.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.dmcs.lstarosta.musiceventsapi.entity.UserEntity;
import pl.dmcs.lstarosta.musiceventsapi.repository.UserRepository;

@Service
public class UserDetailsServiceImpl  implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity user = userRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("User Not Found with -> username: " + username));
        return UserPrinciple.build(user);
    }

}
