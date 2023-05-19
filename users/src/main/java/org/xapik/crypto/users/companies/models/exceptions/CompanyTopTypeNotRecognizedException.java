package org.xapik.crypto.users.companies.models.exceptions;

public class CompanyTopTypeNotRecognizedException extends RuntimeException {

    public CompanyTopTypeNotRecognizedException(String type) {
        super("Company type " + type + " is not recognized");
    }

}
