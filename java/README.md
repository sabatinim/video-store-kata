
## Video store kata

The idea of this kata is taken for the video store example from the book "Refactoring" of Martin Fowler  

In the video store there are 3 types of movies tha can be sold:  
- regular movies 
- new release movies 
- children movies

The base cost for a regular movie is 2 Eur  
After the 2 day of rental an additional cost of 1.5 per day is applied.   
( So the additional cost is applied from the 3rd day )  
  
The new release movie has a cost of 3 Eur per day rented  

The base cost for a children movie is 1.5 Eur  
After the 3 day of rental an additional cost of 1.5 per day is applied.   
( So the additional cost is applied from the 4th day )   

We want to print a statement for the videos purchased by a customer

Example: 
If the customer <i>Fred</i> purchase 
- The game of thrones new release video for 1 day
- Cinderella children video for 2 days
- Mr. Robot regular video for 1 day
- The Hobbit regular video for 3 days

We want to print the following statement:

<i>Rental Record for Fred</i>  
<i>- The game of thrones 3.0</i>   
<i>- Cinderella	1.5</i>   
<i>- Mr. Robot 2.0</i>  
<i>- The Hobbit	3.5</i>
<i>Total 10.0</i>


# Additional requirement:

## The video store owner changed his mind and asked to have the receipt also in HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Video store - statement for Fred</title>
  </head>
  <body>
    <h1>Rental Record for Fred</h1>
    <ul>
       <li>The game of thrones 3.0</li>
       <li>Cinderella	1.5</li>
       <li>Mr. Robot	2.0</li>
       <li>The Hobbit	3.5</li>
    </ul>
    <br>You owed 10.0
    <br>You earned 4 frequent renter points
  </body>
</html>
```

## The video store owner changed his mind again and asked to have the receipt both in HTML and plaint text.