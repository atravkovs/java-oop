package org.xapik.crypto.users.security.model;

import java.io.Serial;
import java.io.Serializable;
import lombok.Data;

@Data
public class JwtRequest implements Serializable {

  @Serial
  private static final long serialVersionUID = 5926468583005150707L;

  private String email;
  private String password;

}
