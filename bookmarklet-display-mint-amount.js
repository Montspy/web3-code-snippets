
// Query and HTML element
// query nonFungibleToken($id: ID!) {
//     nonFungibleToken(id: $id) {
//         mintedAtTransaction {
//         id
//         amount
//         }
//         __typename
//     }
// }

// {
//     "id": "0x171af38a6a6ea549658ebc5fa1894e4a05f4cffe-0-0x5e2abb83b0066952ffda1befc1ca468fbc07c6ea-0x07bdfbc672f1462c9a15c08139d892376245395908a5be5e37689dda40a2a515-10"
// }

// `<tr><td class="p-4 bg-loopring-blue dark:bg-loopring-dark-darkBlue w-40 lg:w-44 text-white">Amount Minted</td><td class="pl-6 dark:text-white">${amount}</td></tr>`

// Bookmarklet
(function(){
    const lm = window.location.href.match(/\/nft\/(0x[0-9a-fA-F]{1,40}-\d-0x[0-9a-fA-F]{1,40}-0x[0-9a-fA-F]{1,64}-\d+)$/);
    if (lm) {
        const table = document.getElementsByTagName('table')[0];
        const displayAmount = (a) => {
            const previousMintTr = table.getElementsByClassName("amount-tr");
            if (previousMintTr.length > 0) {
                previousMintTr[0].remove();
            }
            const newMintTr = `<tr class="amount-tr"><td class="p-4 bg-loopring-blue dark:bg-loopring-dark-darkBlue w-40 lg:w-44 text-white">Amount Minted</td><td class="pl-6 dark:text-white">${a}</td></tr>`
            const targetParent = table.firstChild;
            targetParent.innerHTML += newMintTr;
        }
        fetch('https://gateway.thegraph.com/api/294a874dfcbae25bcca653a7f56cfb63/subgraphs/id/7QP7oCLbEAjejkp7wSLTD1zbRMSiDydAmALksBB5E6i1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query nonFungibleToken($id: ID!) {
                        nonFungibleToken(id: $id) {
                            mintedAtTransaction {
                            id
                            amount
                            }
                            __typename
                        }
                    }`,
                variables: {
                    id: lm[1]
                },
            })
        })
        .then((res) => res.json())
        .then((result) => {
            const amount = result['data']['nonFungibleToken']['mintedAtTransaction']['amount'];
            displayAmount(amount);
        });
    }
})();


// Minified
(function(){let a=window.location.href.match(/\/nft\/(0x[0-9a-fA-F]{1,40}-\d-0x[0-9a-fA-F]{1,40}-0x[0-9a-fA-F]{1,64}-\d+)$/);if(a){let b=document.getElementsByTagName("table")[0],c=c=>{let a=b.getElementsByClassName("amount-tr");a.length>0&&a[0].remove();let d=`<tr class="amount-tr"><td class="p-4 bg-loopring-blue dark:bg-loopring-dark-darkBlue w-40 lg:w-44 text-white">Amount Minted</td><td class="pl-6 dark:text-white">${c}</td></tr>`,e=b.firstChild;e.innerHTML+=d};fetch("https://gateway.thegraph.com/api/294a874dfcbae25bcca653a7f56cfb63/subgraphs/id/7QP7oCLbEAjejkp7wSLTD1zbRMSiDydAmALksBB5E6i1",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`query nonFungibleToken($id: ID!) {nonFungibleToken(id: $id) {mintedAtTransaction {amount}}}`,variables:{id:a[1]}})}).then(a=>a.json()).then(a=>{let b=a.data.nonFungibleToken.mintedAtTransaction.amount;c(b)})}})();
