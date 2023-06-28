beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

//BONUS TASK: add visual tests for registration form 3

/*
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content OK
    * dropdown and dependencies between 2 dropdowns OK
    * checkboxes, their content and links
    * email format
 */

describe('Section 1: Visual tests', ()=> {
    it('Check for radio buttons and its contents', () => {
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')
    });

    it('Check for dropdown menu and dependencies between 2 dropdowns', () => {
        //check for options in dropdown menu
        cy.get('select').as('dropdown');
        //check for number of items and their contents in dropdown menu
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('option[value=""][selected="selected"]').should('exist')
        cy.get('option[value="object:3"]').should('have.text', 'Spain')
        cy.get('option[value="object:4"]').should('have.text', 'Estonia')
        cy.get('option[value="object:5"]').should('have.text', 'Austria')
        //Assertion for having second dropdown disabled
        cy.get('select#city').should('have.attr','disabled')
        //Selecting only one from the list
        cy.get('select#country').select('Estonia')
        //Validate if second dropdown is enabled
        cy.get('select#city').should('not.have.attr','disabled')

        //Validating list of cities
        cy.get('#city').find('option').should('have.length', 4)
        cy.get('option[value=""][class=""]').should('exist')
        cy.get('option[value="string:Tallinn"]').should('have.text', 'Tallinn')
        cy.get('option[value="string:Haapsalu"]').should('have.text', 'Haapsalu')
        cy.get('option[value="string:Tartu"]').should('have.text', 'Tartu')
        //Selecting only one from the list
        cy.get('select#city').select('Tartu')
        });

    it.only('Check for radio buttons', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')
    
        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it.only('Check for checkboxes, their content and links', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')
    
        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    });



//BONUS TASK: add functional tests for registration form 3

/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */