package org.xapik.crypto.users.security;


import java.util.Objects;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.xapik.crypto.users.security.authentication.JwtTokenUtil;
import org.xapik.crypto.users.security.model.JwtRequest;
import org.xapik.crypto.users.security.model.JwtResponse;

@CrossOrigin
@RestController
public class SecurityController {

  private final AuthenticationManager authenticationManager;
  private final JwtTokenUtil jwtTokenUtil;
  private final UserDetailsService userDetailsService;


  public SecurityController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
      UserDetailsService userDetailsService) {
    this.authenticationManager = authenticationManager;
    this.jwtTokenUtil = jwtTokenUtil;
    this.userDetailsService = userDetailsService;
  }

  @PostMapping("/authenticate")
  public ResponseEntity<JwtResponse> createAuthenticationToken(
      @RequestBody JwtRequest authenticationRequest) throws Exception {

    authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

    final UserDetails userDetails = userDetailsService.loadUserByUsername(
        authenticationRequest.getEmail());

    final String token = jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new JwtResponse(token));
  }

  private void authenticate(String username, String password) throws Exception {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new Exception("USER_DISABLED", e);
    } catch (BadCredentialsException e) {
      throw new Exception("INVALID_CREDENTIALS", e);
    }
  }

}
