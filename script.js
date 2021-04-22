const genesisBlockHash = "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";

document.addEventListener("DOMContentLoaded", event => {
    console.log(getMostRecentBlockHash());
})

// fetches the most recent blockhash from the mempool.space api
function getMostRecentBlockHash() {
    let test = "filler string";
    fetch("https://mempool.space/api/blocks/tip/hash")
    .then(resp => resp.text())
    .then(text => {
        test = text
        console.log("This might work: " + text);
    });

    return test;
}