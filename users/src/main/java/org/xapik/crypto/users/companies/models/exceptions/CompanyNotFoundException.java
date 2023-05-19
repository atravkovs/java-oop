package org.xapik.crypto.users.companies.models.exceptions;

public final class CompanyNotFoundException extends RuntimeException {

    public CompanyNotFoundException(Long regcode) {
        super("Company with Registration Code " + regcode + " is not found");
    }

}
