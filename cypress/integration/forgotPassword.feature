Feature: Forgot password
Background: Land on the login page and click on the link
    Given Land on login page
    When Click on forgot password
    Then Go to forgot password page

Scenario: Forgot Password with invalid format email 
    And Enter the invalid format email
    Then See validation error
    And Go back to login
 
Scenario: Forgot Password with non-existed email
    And Enter not existed email
    And Click the restore button
    Then See failed api result

Scenario: Display Terms and Conditions
    When Click on Terms
    Then See Terms page and go back 
    And Click on Conditions
    Then See Conditions and go back 