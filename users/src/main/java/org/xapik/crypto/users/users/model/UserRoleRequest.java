package org.xapik.crypto.users.users.model;

import javax.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRoleRequest {

  @NotBlank
  String role;

}
