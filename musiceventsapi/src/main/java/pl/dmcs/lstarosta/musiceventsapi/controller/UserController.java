package pl.dmcs.lstarosta.musiceventsapi.controller;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.lstarosta.musiceventsapi.entity.UserEntity;
import pl.dmcs.lstarosta.musiceventsapi.repository.UserRepository;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping(value = "/{email}")
    public ResponseEntity<Optional<UserEntity>> getUser(@PathVariable("email") String email) {
        Optional<UserEntity> user = userRepository.findByEmail(email);

        if (!user.isPresent()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Optional<UserEntity>>(user, HttpStatus.OK);
    }

    @PatchMapping(value = "/{email}")
    public ResponseEntity<UserEntity> patchUser(@PathVariable("email") String email, @RequestBody Map<String, Object> newUser) {
        Optional<UserEntity> user = userRepository.findByEmail(email);

        if (!user.isPresent()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        partialUpdate(user.get(), newUser);
        return new ResponseEntity<UserEntity>(user.get(), HttpStatus.OK);
    }

    private void partialUpdate(UserEntity user, Map<String, Object> newUser) {
        if (newUser.containsKey("firstName")) {
            user.setFirstName((String) newUser.get("firstName"));
        }
        if (newUser.containsKey("lastName")) {
            user.setLastName((String) newUser.get("lastName"));
        }
        if (newUser.containsKey("password") && newUser.get("password") != "") {
            user.setPassword(passwordEncoder.encode((String) newUser.get("password")));
        }
        userRepository.save(user);
    }
}
