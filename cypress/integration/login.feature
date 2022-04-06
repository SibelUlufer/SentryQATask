Feature: Login
Background: Land on the login page
    Given Land on login page

Scenario: Unsuccessful login with non-existed data
    When Enter not existed email
    And Enter the valid format password
    Then Click the login button
    And Should not login

Scenario: Unsuccessful login with invalid format data
    When Enter the invalid format email
    And Enter the invalid format password
    And See validation errors
    
Scenario: Display Terms and Conditions
    When Click on Terms
    Then See Terms page and go back 
    And Click on Conditions
    Then See Conditions and go back 

Scenario: E2E Unsuccessful login flow
    When Enter the invalid format email
    And Enter the invalid format password
    Then Enter not existed email
    And Enter the valid format password
    Then Click the login button
    And Should not login




