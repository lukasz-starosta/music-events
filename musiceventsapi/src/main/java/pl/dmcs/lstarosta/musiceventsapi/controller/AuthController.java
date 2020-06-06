package pl.dmcs.lstarosta.musiceventsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.lstarosta.musiceventsapi.entity.RoleEntity;
import pl.dmcs.lstarosta.musiceventsapi.entity.UserEntity;
import pl.dmcs.lstarosta.musiceventsapi.enums.RoleEnum;
import pl.dmcs.lstarosta.musiceventsapi.message.request.LoginForm;
import pl.dmcs.lstarosta.musiceventsapi.message.request.SignUpForm;
import pl.dmcs.lstarosta.musiceventsapi.message.response.JwtResponse;
import pl.dmcs.lstarosta.musiceventsapi.message.response.ResponseMessage;
import pl.dmcs.lstarosta.musiceventsapi.repository.RoleRepository;
import pl.dmcs.lstarosta.musiceventsapi.repository.UserRepository;
import pl.dmcs.lstarosta.musiceventsapi.security.jwt.JwtProvider;

import javax.validation.Valid;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (!Pattern.matches("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$", signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Wrong email"), HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Email is already taken."), HttpStatus.BAD_REQUEST);
        }


        RoleEntity userRole = roleRepository.findByName(RoleEnum.user)
                .orElseThrow(() -> new RuntimeException("Fail -> Cause: User Role not found."));

        UserEntity user = new UserEntity(signUpRequest.getEmail(), passwordEncoder.encode(signUpRequest.getPassword()), signUpRequest.getFirstName(), signUpRequest.getLastName(), userRole);

        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("Registered user."), HttpStatus.OK);
    }

}
