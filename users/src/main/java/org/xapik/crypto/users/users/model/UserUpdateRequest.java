package org.xapik.crypto.users.users.model;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

@Data
public class UserUpdateRequest {

  @NotBlank
  @Length(min = 2, max = 40)
  private String name;

  @NotBlank
  @Length(min = 2, max = 40)
  private String surname;
}
