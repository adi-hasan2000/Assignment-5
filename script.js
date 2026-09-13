
// GET ELEMENTS


const addButtons = document.querySelectorAll(".add-btn");
const stackBox = document.querySelector("#stack-box");
const selectedCount = document.querySelector("#selected-count");
const removeAllButton = document.querySelector("#remove-all");


// STACK ARRAY


let stack = [];



// ADD TECHNOLOGY


addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const type = button.dataset.type;
        const icon = button.dataset.icon;


        // Check already added
        const alreadyExists = stack.some(function (item) {
            return item.name === name;
        });

        if (alreadyExists) {
            return;
        }


        // Add to array
        stack.push({
            name: name,
            type: type,
            icon: icon
        });


        // Change button
        button.innerHTML = "✓ Added to Stack";

        button.classList.remove(
            "bg-slate-950",
            "text-white"
        );

        button.classList.add(
            "bg-pink-50",
            "text-pink-500",
            "border-pink-500"
        );


        // Change card border
        const techCard = button.closest(".tech-card");

        if (techCard) {

            techCard.classList.remove(
                "border-gray-200"
            );

            techCard.classList.add(
                "border-pink-500"
            );
        }


        showStack();

    });

});



// SHOW STACK


function showStack() {

   
    stackBox.innerHTML = "";


    // Update count
    selectedCount.innerText =
        stack.length + " Technologies Selected";


    // Empty stack
    if (stack.length === 0) {

        stackBox.innerHTML = `
            <div class="border border-dashed border-gray-200 rounded-md h-16
                        flex items-center justify-center">

                <span class="text-[8px] text-gray-400">
                    Your stack is empty.
                </span>

            </div>
        `;

        return;
    }


    // Create selected cards
    stack.forEach(function (item, index) {

        const card = document.createElement("div");

        card.className =
            "border border-gray-200 rounded-md p-3 mb-2 flex items-center justify-between";


        card.innerHTML = `
            <div class="flex items-center gap-3">

                <img
                    src="${item.icon}"
                    alt="${item.name}"
                    class="w-8 h-8"
                >

                <div>

                    <h3 class="font-semibold text-[10px]">
                        ${item.name}
                    </h3>

                    <p class="text-[7px] text-gray-400">
                        ${item.type}
                    </p>

                </div>

            </div>

            <button
                class="remove-btn text-gray-400 text-lg"
                data-index="${index}">
                ×
            </button>
        `;


        stackBox.appendChild(card);

    });



    // CROSS BUTTON
 

  const removeButtons = stackBox.querySelectorAll(".remove-btn");

removeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const index = Number(button.dataset.index);

        // Get removed technology
        const removedItem = stack[index];

        // Remove from stack
        stack.splice(index, 1);


        // Find original technology card
        const techCard = document.querySelector(
            `.tech-card[data-name="${removedItem.name}"]`
        );

        if (techCard) {

            // Change border back to gray
            techCard.classList.remove("border-pink-500");
            techCard.classList.add("border-gray-200");


            // Find original Add button
            const addButton = techCard.querySelector(".add-btn");

            if (addButton) {

                // Change text back
                addButton.innerHTML = "Add to Stack";


                // Remove pink styles
                addButton.classList.remove(
                    "bg-pink-50",
                    "text-pink-500",
                    "border-pink-500"
                );


                // Add original styles
                addButton.classList.add(
                    "bg-slate-950",
                    "text-white"
                );
            }
        }


     
        showStack();

    });

});

}


// REMOVE ALL


removeAllButton.addEventListener("click", function () {

   
    stack = [];


    // Reset all original cards
    addButtons.forEach(function (button) {

        // Reset button
        button.innerHTML =
            "Add to Stack";


        button.classList.remove(
            "bg-pink-50",
            "text-pink-500",
            "border-pink-500"
        );


        button.classList.add(
            "bg-slate-950",
            "text-white"
        );


        // Reset card
        const techCard =
            button.closest(".tech-card");


        if (techCard) {

            techCard.classList.remove(
                "border-pink-500"
            );

            techCard.classList.add(
                "border-gray-200"
            );

        }

    });


   
    showStack();

});



showStack();