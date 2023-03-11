package org.xapik.crypto.users.users.model;

public final class UserAlreadyExistsException extends RuntimeException {

  public UserAlreadyExistsException() {
    super("User with this email is already registered in a system");
  }

}
