package org.xapik.crypto.users.companies.models.exceptions;

public final class CompanySetException extends RuntimeException {

    public static final String setDoesNotExistMsg = "Company set does not exist or is not owned by current user!";
    public static final String companyNotInSetMsg = "Company is not contained in specified set!";
    public static final String companyAlreadyInSetMsg = "Company is already contained in specified set!";

    public CompanySetException(String message) {
        super(message);
    }

}
