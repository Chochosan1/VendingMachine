# VendingMachine

This is a single page application that emulates a vending machine.

Versions:
- Angular: 15.2.10
- Node: 19.8.1
- Package manager: npm 9.5.1

**Online hosting**: 

- If you do not wish to install the project, you can directly access it here: https://vendingmachine-8ccf0.web.app/vending

## Running the project 

1. Download the project from github

2. Run npm install to install all necessary files

3. Run ng serve

4. You should now be able to view the project in your browser (by going to http://localhost:4200 for example)

## [Vending Machine] Allowed coin denominations

You can only insert the following coin denominations into the machine:
* 0.1
* 0.2
* 0.5
* 1
* 2

The used currency is BGN.

* You can add coins by using the '+' sign button in the bottom right corner when browsing the main page. This will open a panel where you can do it. 
* You can always reset the process and get all of your coins returned. Use the 'Reset Coins' button located in the same panel.

## [Vending Machine] Project information

### Product specifics

Explore multiple products available for purchase on the main page. Initially, these products come from a mocked API. 

* Each product is limited to a maximum of 15 pieces in stock 
* Each product has a unique price. No duplicate prices.

There is also an 'Add Product' page that allows you to add another product. The rules above must be followed else the page will not let you submit the product.

* Purchasing a product will spend as many coins as required and then return the rest as change.

### Responsive design

The design is made responsive so that it can be viewed both on desktop & mobile.

