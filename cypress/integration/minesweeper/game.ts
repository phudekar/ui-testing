context('Minesweeper', () => {

    beforeEach(() => {
        cy.visit("/");
    })

    it('should show Minesweeper game', () => {
        cy.get(".title")
            .should('contain', 'Minesweeper');

        cy.get(".block")
            .should("have.length", 100);

        cy.get(".revealed")
            .should("have.length", 0);

        cy.get(".flag")
            .should("have.length", 0);

        cy.get(".bomb")
            .should("have.length", 0);
    })

    it('should toggle flag of a block', () => {
        cy.get(".flag")
            .should("not.be.visible");

        const block = cy.get(".block").first();

        block.rightclick();

        cy.get(".flag")
            .should("be.visible");

        block.rightclick();

        cy.get(".flag")
            .should("not.be.visible");
    })

    it('should reveal a block', () => {
        cy.get(".revealed")
            .should("not.be.visible");

        const block = cy.get(".block").first();

        block.click();

        cy.get(".revealed")
            .should("be.visible");

        cy.get(".block")
            .first()
            .rightclick();

        cy.get(".flag")
            .should("not.be.visible");
    })

    it('should click on bomb', () => {
        cy.get(".overlay")
            .should("not.be.visible");

        cy.get(".block")
            .click({ multiple: true, force: true });

        cy.get(".bomb")
            .should("have.length", 10);

        cy.get(".overlay")
            .should("be.visible");

        cy.contains("Game Over!")
            .should("be.visible");

        cy.contains("Retry")
            .should("be.visible")
            .click();

        cy.get(".overlay")
            .should("not.be.visible");

        cy.get(".revealed")
            .should("not.be.visible");

        cy.get(".block")
            .should("have.length", 100);

        cy.get(".bomb")
            .should("have.length", 0);
    })
})