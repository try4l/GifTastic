
      // Initial array of items
      var items = ["monkey", "aardvark", "anteater", "elephant", "kangaroo", "fish", "bird", "bugs bunny", "chameleon", 
        "wombat", "flying squirrel", "honey bee", "platypus", "sheep", "goat", "pig", "tasmanian devil", "disco", "moose"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayItemInfo() {
        //console.log("displayItemInfo function")
        var category = $(this).attr("data-name");
        //console.log("category: ", category);

        var giphyURL = "https://api.giphy.com/v1/gifs/search?";
        var apiKey = "api_key=7f1c7d7acfc048f88884fb9650342e30";
        var limit = "&limit=10";
        var offset = "&offset=0";
        var rating = "&rating=g";
        var language = "&lang=en";

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7f1c7d7acfc048f88884fb9650342e30&q=" 
          + category 
          + limit
          + offset
          + rating
          + language;
          //console.log("queryURL: ", queryURL);

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

          // first clear out any old images
          $("#items-view").empty();

          for (var i = 0; i < response.data.length; i++) {
            // Create a div to hold the item
            var itemDiv = $("<div class='image-div'>");

            var imgURL = response.data[i].images.fixed_height_still.url;
            var gifURL = response.data[i].images.fixed_height.url;

            // Create an element to hold the image
            var image = $("<img>")
              .attr("src", imgURL)
              .attr("data-animate", gifURL)
              .attr("data-still", imgURL)
              .attr("data-state", "still")
              .addClass("gif");
              //console.log("image: ", image);

            // Append the image
            itemDiv.append(image);
            
            var rating = response.data[i].rating;           // Store the rating data
            var pOne = $("<p>").text("Rating: " + rating);  // Create an element to display it
            itemDiv.append(pOne);                           // Display the rating below the item

            // Put the item before the previous item(s)
            $("#items-view").prepend(itemDiv);
          } // for
        }); // .done(function(response)
      }     // function displayItemInfo

      function toggleGif () {
        //console.log("click");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var URLstate = $(this).attr("data-state");
        console.log("URLstate: ", URLstate);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        if (URLstate === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");  // Set the image's data-state to animate 
        // Else set src to the data-still value
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");    // Set the image's data-state to still 
        }
      }   // function toggleGif

      // Function for displaying item data
      function renderButtons() {
        //console.log("renderButtons called");

        // Delete items prior to adding new items (to prevent duplicate buttons)
        $("#buttons-view").empty();

        // Dynamicaly generate buttons for each item in the array
        for (var i = 0; i < items.length; i++) {
          //console.log(items)

          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button class='btn btn-primary btn-sm'>");
          a.addClass("item");             // add class to button
          a.attr("data-name", items[i]);  // add data attribute
          a.text(items[i]);               // and button text
          $("#buttons-view").append(a);   // Add the button to the page
          //console.log(a)
        } // for
      }   // function renderButtons

      // Handle events when add category button is clicked
      $("#add-item").on("click", function(event) {
        //console.log("click");
        event.preventDefault(); // Prevent button default behavior (submitting form)
        var item = $("#item-input").val().trim();   // get input from textbox
        items.push(item);                           // add it to array
        renderButtons();        // Call function to handle processing of array
      }); 


      // Add click event listeners for all elements with these classes - item and gif
      // Note: We're adding the event listener to the document because it will work for dynamically generated elements
      //          $(".items").on("click") will only add listeners to elements that are on the page at that time
      // Function for displaying the item info      
      $(document).on("click", ".item", displayItemInfo);

      // Function for animating and pausing Gifs
      $(document).on("click", ".gif", toggleGif);

      // Call the function to render the buttons initially
      renderButtons();
      
