package org.xapik.crypto.users.users.model;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class UserRegistrationRequest {

    @NotBlank
    @Length(min = 2, max = 40)
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Length(min = 2, max = 40)
    private String surname;

    @NotBlank
    @Length(min = 6, max = 120)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;

}
