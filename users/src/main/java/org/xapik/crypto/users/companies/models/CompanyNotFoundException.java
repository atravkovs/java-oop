package org.xapik.crypto.users.companies.models;

public final class CompanyNotFoundException extends RuntimeException {

    public CompanyNotFoundException(Long regcode) {
        super("Company with Registration Code " + regcode + " is not found");
    }

}
