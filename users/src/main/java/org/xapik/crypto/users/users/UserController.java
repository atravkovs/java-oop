package org.xapik.crypto.users.users;

import java.security.Principal;
import java.util.List;
import javax.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.xapik.crypto.users.users.model.GenericError;
import org.xapik.crypto.users.users.model.UserAlreadyExistsException;
import org.xapik.crypto.users.users.model.UserEntity;
import org.xapik.crypto.users.users.model.UserRegistrationRequest;
import org.xapik.crypto.users.users.model.UserRoleRequest;
import org.xapik.crypto.users.users.model.UserUpdateRequest;

@CrossOrigin
@RestController
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/user")
  public UserEntity getCurrentUser(Principal principal) {
    return this.userService.getUser(principal.getName());
  }

  @GetMapping("/users")
  @PreAuthorize("hasAuthority('admin')")
  public Page<UserEntity> getUsers(@RequestParam(defaultValue = "0") Integer page,
      @RequestParam(defaultValue = "5") Integer pageSize,
      @RequestParam(required = false) String search) {
    return this.userService.getUsers(page, pageSize, search);
  }

  @GetMapping("/users/emails")
  public List<UserEntity> getUsersByEmails(@RequestParam List<String> emails) {
    return this.userService.getUsersByEmails(emails);
  }

  @PostMapping("/register")
  public ResponseEntity<?> saveUser(@Valid @RequestBody UserRegistrationRequest user) {
    try {
      return ResponseEntity.ok(userService.save(user));
    } catch (UserAlreadyExistsException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
          .body(new GenericError(e.getLocalizedMessage()));
    }
  }

  @PutMapping("/user/{email}")
  @PreAuthorize("#email == authentication.principal.username")
  public ResponseEntity<UserEntity> updateUser(@Valid @RequestBody UserUpdateRequest user,
      @PathVariable String email) {
    return ResponseEntity.ok(userService.updateUser(user, email));
  }

  @PutMapping("/user/{email}/role")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<UserEntity> updateUserRole(@Valid @RequestBody UserRoleRequest roleF,
      @PathVariable String email) {
    return ResponseEntity.ok(userService.updateUserRole(roleF, email));
  }


  @DeleteMapping("/user/{email}")
  @PreAuthorize("hasAuthority('admin') or #email == authentication.principal.username")
  public ResponseEntity<?> deleteUser(@PathVariable String email) {
    userService.deleteUser(email);

    return ResponseEntity.ok().build();
  }

}
