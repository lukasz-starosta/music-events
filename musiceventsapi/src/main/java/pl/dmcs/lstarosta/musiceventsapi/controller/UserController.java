package pl.dmcs.lstarosta.musiceventsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.lstarosta.musiceventsapi.entity.UserEntity;
import pl.dmcs.lstarosta.musiceventsapi.repository.UserRepository;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/{email}")
    public ResponseEntity<Optional<UserEntity>> getUser(@PathVariable("email") String email) {
        Optional<UserEntity> user = userRepository.findByEmail(email);

        if (!user.isPresent()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Optional<UserEntity>>(user, HttpStatus.OK);
    }
}
