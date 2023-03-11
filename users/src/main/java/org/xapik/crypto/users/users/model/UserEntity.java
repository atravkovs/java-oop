package org.xapik.crypto.users.users.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class UserEntity {

  @Id
  @Column
  private String email;

  @Column
  private String name;

  @Column
  private String surname;

  @Column
  @JsonIgnore
  private String password;

  @Column
  private String role;

}
