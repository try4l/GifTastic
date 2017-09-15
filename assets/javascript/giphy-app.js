
      // Initial array of items
      var items = ["Monkeys", "Dogs", "Cats", "Elephants"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayItemInfo() {
        console.log("displayItemInfo function")

        var category = $(this).attr("data-name");
        //console.log("category: ", category);

        var giphyURL = "https://api.giphy.com/v1/gifs/search?";
        var apiKey = "api_key=7f1c7d7acfc048f88884fb9650342e30";

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7f1c7d7acfc048f88884fb9650342e30&q=" 
          + category 
          + "&limit=10&offset=0&rating=G&lang=en";
          console.log("queryURL: ", queryURL);

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // first clear out any old images
          $("#items-view").empty();

          for (var i = 0; i < response.data.length; i++) {

            //console.log("response: ", response);
            // Creating a div to hold the item
            var itemDiv = $("<div>");
            //console.log("itemDiv: ", itemDiv);

            var imgURL = response.data[i].images.fixed_width_still.url;
            var gifURL = response.data[i].images.fixed_width.url;
            //console.log("imgURL: ", imgURL);
            //console.log("gifURL: ", gifURL);


            // Create an element to hold the image
            var image = $("<img>")
              .attr("src", imgURL)
              .attr("data-animate", gifURL)
              .attr("data-still", imgURL)
              .attr("data-state", "still")
              .addClass("gif");
            //console.log("image: ", image);

            // Appending the image
            itemDiv.append(image);

            // Storing the rating data
            var rating = response.data[i].rating;
            //console.log("rating: ", rating);

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            itemDiv.append(pOne);

            // Putting the items before the previous items
            $("#items-view").prepend(itemDiv);

          }

        });

      } 

      function sayClick () {
        console.log("Click");
      }

      // $(".gif").on("click", function() {
      //   console.log("click");
      //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      //   var URLstate = $(this).attr("data-state");
      //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      //   // Then, set the image's data-state to animate
      //   // Else set src to the data-still value
      //   if (state === "still") {
      //     $(this).attr("src", $(this).attr("data-animate"));
      //     $(this).attr("data-state", "animate");
      //   } else {
      //     $(this).attr("src", $(this).attr("data-still"));
      //     $(this).attr("data-state", "still");
      //   }
      // }); 

      function animateGif () {
        console.log("click");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var URLstate = $(this).attr("data-state");
        console.log("URLstate: ", URLstate);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (URLstate === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      }

      // Function for displaying item data
      function renderButtons() {
        //console.log("renderButtons called");

        // Deleting the items prior to adding new item
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of items
        for (var i = 0; i < items.length; i++) {
          console.log(items)

          // Then dynamicaly generating buttons for each item in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of item to our button
          a.addClass("item");
          // Adding a data-attribute
          a.attr("data-name", items[i]);
          // Providing the initial button text
          a.text(items[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
          //console.log(a)
        }
      }

      // This function handles events where one button is clicked
      $("#add-item").on("click", function(event) {
        //console.log("click");
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var item = $("#item-input").val().trim();

        // Adding the item from the textbox to our array
        items.push(item);

        // Calling renderButtons which handles the processing of our item array
        renderButtons();

      });

      // Function for displaying the item info
      // We're adding a click event listener to all elements with the class "item"
      // Note: We're adding the event listener to the document because it will work for dynamically generated elements
      //          $(".items").on("click") will only add listeners to elements that are on the page at that time
      $(document).on("click", ".item", displayItemInfo);

      $(document).on("click", ".gif", animateGif);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      
