const myNumber = () => {
    document.getElementById("my-number").innerText = 12;
};

const callApi = () => {
    fetch("/api/call").then((response) => {
        response.json().then(json => {
            document.getElementById("call-api").innerText = JSON.stringify(json);
        });
    });
};
