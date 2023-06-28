beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        cy.get('[data-testid="user"]').type('ErlendAndersonIsThereAWayToMakeAutomaticTestingSlower')
        cy.get('[name="email"]').type('erlendanderson@hotmailveryhot.com')
        cy.get('[data-cy="name"]').type('Erlend')
        cy.get('[data-testid="lastNameTestId"]').type('Anderson')
        cy.get('[data-testid="phoneNumberTestId"]').type('56837810')

        // Type confirmation password which is different from first password
        cy.get('[id="password"]').type('123456')
        cy.get('[id="confirm"]').type('654321')
        cy.get('h2').contains('Password').click()

        // Assert that submit button is not enabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that successful message is not visible
        cy.get('[id="success_message"]').should('not.be.visible')

        // Assert that error message is visible
        cy.get('[id="password_error_message"').should('be.visible')
    })
    
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        cy.get('[data-testid="user"]').type('ErlendAndersonIsThereAWayToMakeAutomaticTestingSlower')
        cy.get('[name="email"]').type('erlendanderson@hotmailveryhot.com')
        cy.get('[data-cy="name"]').type('Erlend')
        cy.get('[data-testid="lastNameTestId"]').type('Anderson')
        cy.get('[data-testid="phoneNumberTestId"]').type('56837810')
        cy.get('[id="javascriptFavLanguage"]').click()
        cy.get('[id="vehicle2"]').click()
        cy.get('select[id="cars"]').select('opel')
        cy.get('select[id="animal"]').select('spider')
        cy.get('[id="password"]').type('123456')
        cy.get('[id="confirm"]').type('123456')
        cy.get('h2').contains('Password').click()
        
        // Assert that submit button is enabled
        cy.get('.submit_button').should('not.be.disabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system show successful message
        cy.get('[id="success_message"]').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get('[data-testid="user"]').type('ErlendAndersonIsThereAWayToMakeAutomaticTestingSlower')
        cy.get('[name="email"]').type('erlendanderson@hotmailveryhot.com')
        cy.get('[data-cy="name"]').type('Erlend')
        cy.get('[data-testid="lastNameTestId"]').type('Anderson')
        cy.get('[data-testid="phoneNumberTestId"]').type('56837810')
        cy.get('h2').contains('Password').click()

        // Assert that submit button is enabled
        cy.get('.submit_button').should('not.be.disabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system shows successful message
        cy.get('[id="success_message"]').should('be.visible')
    })

    //Not sure what this is for, so I'm gonna comment it out?
         // it('Input valid data to the page', () => {
         // inputValidData('')
    //})

    // You can add more similar tests for checking other mandatory field's absence

    it('Checking for mandatory fields.', ()=>{        
        // Assert that mandatory fields are marked
        cy.get('input[data-testid="user"]').should('have.attr', 'required')
        cy.get('input[name="email"]').should('have.attr', 'required')
        cy.get('input[data-cy="name"]').should('have.attr', 'required')
        cy.get('input[data-testid="lastNameTestId"]').should('have.attr', 'required')
        cy.get('input[data-testid="phoneNumberTestId"]').should('have.attr', 'required')
        // Assert that optional fields are not mandatory
        // I'm pretty sure this is not how one tests for mandatory fields in radio and checkbox fields. There should be required amount attribute.
        cy.get('input[id="htmlFavLanguage"]').should('not.have.attr', 'required')
        cy.get('input[id="cssFavLanguage"]').should('not.have.attr', 'required')
        cy.get('input[id="javascriptFavLanguage"]').should('not.have.attr', 'required')
        cy.get('input[id="phpFavLanguage"]').should('not.have.attr', 'required')
        cy.get('input[id="vehicle1"]').should('not.have.attr', 'required')
        cy.get('input[id="vehicle2"]').should('not.have.attr', 'required')
        cy.get('input[id="vehicle3"]').should('not.have.attr', 'required')
        cy.get('select[id="cars"]').should('not.have.attr', 'required')
        cy.get('select[id="animal"]').should('not.have.attr', 'required')
    })
})



/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that first logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[id="logo"]').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('[id="logo"]').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Creating similar test for checking second picture
    // The first test was testing for both pictures since it had "img" selector. I had to changed it to ID and create a separate test for the second picture.

    it('Check that second logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to be equal 116
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 80)
    })


    it('Check navigation part for link number #1', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    // Check that URL to Cerebrum Hub page is correct and clickable

    it('Check navigation part for link number #2', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            //Going to the cerebrumhub page gives a lot of security related errors. I have no idea how to fix it. Google and ChatGPT doesn't give many working solutions.
            //""> Permission denied to access property "document" on cross-origin object"
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one

    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car').and('not.be.checked')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Get the length of array of elements in Cars dropdown
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Creating a similar test for animal dropdown.

    it('Favourite animal dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')

        // Get the length of array of elements in animals dropdown
        cy.get('#animal').find('option').should('have.length', 6)
        
        //Check that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo','spider','mouse'])
        })
    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}