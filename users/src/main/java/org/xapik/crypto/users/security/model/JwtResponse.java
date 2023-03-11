package org.xapik.crypto.users.security.model;

import java.io.Serial;
import java.io.Serializable;
import lombok.Data;

@Data
public class JwtResponse implements Serializable {

  @Serial
  private static final long serialVersionUID = 5609903064141944262L;

  private final String jwtToken;

}
