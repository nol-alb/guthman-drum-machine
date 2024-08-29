let arrays = {
    'array1': [1, 0, 1, 0, 1],
    'array2': [0, 1, 0, 1, 0],
    'array3': [1, 1, 0, 0, 1],
    'array4': [0, 0, 1, 1, 0]
};
let select, button;

function setup() {
    noCanvas();
    select = createSelect();
    select.position(20, 20);
    for (let key in arrays) {
        select.option(key);
    }

    button = createButton('Manipulate Selected Array');
    button.position(20, 50);
    button.mousePressed(sendArrayToFlask);
}

function sendArrayToFlask() {
    let selectedID = select.value();
    let selectedArray = arrays[selectedID];

    fetch('http://127.0.0.1:5000/manipulate_array', { // Use your actual ngrok URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: selectedID, array: selectedArray}),
    })
    .then(response => response.json())
    .then(data => {
        arrays[data.id] = data.modifiedArray; // Update the specific array with the modified version from Flask
        console.log(`Modified ${data.id}:`, arrays[data.id]);
    })
    .catch(error => console.error('Error:', error));
}