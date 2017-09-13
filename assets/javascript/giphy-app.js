
      // Initial array of items
      var items = ["Monkeys", "Dogs", "Cats", "Elephants"];

      // Generic function for capturing the item name from the data-attribute
      $("#buttons-view").on("click", ".item", function (){
        var category = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7f1c7d7acfc048f88884fb9650342e30&q="+category+"&limit=10&offset=0&rating=G&lang=en";
        $.ajax({
          URL: queryURL,
          method: "GET"
        }).done (function(response){
          console.log("response: ", response);
        })
      });

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
        console.log("click");
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
      // We're adding the event listener to the document because it will work for dynamically generated elements
      // $(".items").on("click") will only add listeners to elements that are on the page at that time


      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      
