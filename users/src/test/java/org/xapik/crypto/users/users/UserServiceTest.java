package org.xapik.crypto.users.users;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.xapik.crypto.users.users.model.UserAlreadyExistsException;
import org.xapik.crypto.users.users.model.UserEntity;
import org.xapik.crypto.users.users.model.UserRegistrationRequest;
import org.xapik.crypto.users.users.model.UserRoleRequest;
import org.xapik.crypto.users.users.model.UserUpdateRequest;

import static org.mockito.BDDMockito.*;

@SpringBootTest
class UserServiceTest {

  @MockBean
  private UserRepository userRepository;

  @MockBean
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserService userService;

  @Test
  void getUsers() {
    given(userRepository.findAll(any(Pageable.class))).willReturn(Page.empty());

    var users = userService.getUsers(0, 5, null);

    assertEquals(0, users.getTotalElements());
  }

  @Test
  void getUsers_WithQuery() {
    given(userRepository.findAllByNameIsLikeOrSurnameIsLikeOrEmailIsLike(any(Pageable.class),
        anyString(), anyString(), anyString())).willReturn(Page.empty());

    var users = userService.getUsers(0, 5, "test");

    assertEquals(0, users.getTotalElements());
  }

  @Test
  void getUsersByEmails() {
    given(userRepository.findUserEntityByEmailIn(anyList())).willReturn(List.of(mockUserEntity()));

    var users = userService.getUsersByEmails(List.of("test@test.com"));

    assertIterableEquals(List.of(mockUserEntity()), users);
  }

  @Test
  void getUser() {
    given(userRepository.findUserEntityByEmail(anyString())).willReturn(mockUserEntity());

    var user = userService.getUser("test@test.com");

    assertEquals(mockUserEntity(), user);
  }

  @Test
  void updateUser() {
    given(userRepository.findUserEntityByEmail(anyString())).willReturn(mockUserEntity());
    given(userRepository.save(any(UserEntity.class))).willReturn(mockUserEntity());

    var userUpdateRequest = new UserUpdateRequest();
    userUpdateRequest.setName("Test");
    userUpdateRequest.setSurname("Test");

    var user = userService.updateUser(userUpdateRequest, "test@test.com");

    assertEquals(mockUserEntity(), user);
  }

  @Test
  void updateUserRole() {
    given(userRepository.findUserEntityByEmail(anyString())).willReturn(mockUserEntity());
    given(userRepository.save(any(UserEntity.class))).willReturn(mockUserEntity());

    var role = new UserRoleRequest();
    role.setRole("admin");

    var user = userService.updateUserRole(role, "test@test.com");

    assertEquals(mockUserEntity(), user);
  }

  @Test
  void save_existing() {
    given(userRepository.findUserEntityByEmail(anyString())).willReturn(mockUserEntity());

    assertThrows(UserAlreadyExistsException.class, () -> {
      userService.save(mockUserRegistrationRequest());
    });
  }

  @Test
  void save_new() {
    given(userRepository.findUserEntityByEmail(anyString())).willReturn(null);
    given(userRepository.save(any(UserEntity.class))).willReturn(mockUserEntity());
    given(passwordEncoder.encode(any(CharSequence.class))).willReturn("<encrypted>");

    var user = userService.save(mockUserRegistrationRequest());

    assertEquals(mockUserEntity(), user);
  }

  @Test
  void deleteUser() {
    given(userRepository.findUserEntityByEmail(anyString())).willReturn(mockUserEntity());

    userService.deleteUser("test@test.com");

    verify(userRepository, times(1)).delete(mockUserEntity());
  }

  private UserRegistrationRequest mockUserRegistrationRequest() {
    var user = new UserRegistrationRequest();
    user.setEmail("test@test.com");
    user.setPassword("abc123");
    user.setSurname("Test");
    user.setName("Test");

    return user;
  }

  private UserEntity mockUserEntity() {
    var userEntity = new UserEntity();
    userEntity.setPassword("abcd1234");
    userEntity.setEmail("test@test.com");
    userEntity.setName("Test");
    userEntity.setSurname("Test");
    userEntity.setRole("user");

    return userEntity;
  }
}