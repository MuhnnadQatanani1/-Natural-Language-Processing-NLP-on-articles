function handleSubmit(event) {
    event.preventDefault();
  
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);
  
    console.log("::: Form Submitted :::");
  
    fetch('http://localhost:8081/analyze', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: formText }),
    })
      .then(res => res.json())
      .then(function (res) {
        document.getElementById('results').innerHTML = `Polarity: ${res.polarity}, Subjectivity: ${res.subjectivity}`;
      })
      .catch(error => console.log('Error:', error));
  }
  
  export { handleSubmit };
  