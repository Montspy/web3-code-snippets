// Bookmarklet
(function(){
    const am = document.getElementsByTagName('h1')[0].innerText.match(/Account #(\d+)/);
    for (let link of document.getElementsByTagName('a')) {
        if (link.href) {
            let lm = link.href.match(/\/nft\/(0x[0-9a-fA-F]{1,40}-\d-0x[0-9a-fA-F]{1,40}-0x[0-9a-fA-F]{1,64}-\d+)$/);
            if (lm) {
                const displayBalance = (b) => {
                    let previousBalanceDiv = link.getElementsByClassName("balance-div");
                    if (previousBalanceDiv.length > 0) {
                        previousBalanceDiv[0].remove();
                    }
                    const newBalanceDiv = `<div class="balance-div bg-loopring-blue dark:bg-loopring-dark-darkBlue text-white px-1 py-2 font-medium text-sm z-10 flex-1 flex items-center">Balance: ${b}</div>`;
                    const targetParent = link.firstChild.firstChild;
                    targetParent.innerHTML = newBalanceDiv + targetParent.innerHTML;
                    targetParent.style.height = '400px';
                }
                fetch('https://gateway.thegraph.com/api/294a874dfcbae25bcca653a7f56cfb63/subgraphs/id/7QP7oCLbEAjejkp7wSLTD1zbRMSiDydAmALksBB5E6i1', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query accountNFTSlots($where: AccountNFTSlot_filter) {
                                accountNFTSlots(
                                where: $where
                                ) {
                                balance
                                }
                            }
                        `,
                        variables: {
                            where: {
                            account: am[1],
                            nft: lm[1]
                            }
                        },
                    })
                })
                .then((res) => res.json())
                .then((result) => {
                    const balance = result['data']['accountNFTSlots'][0]['balance'];
                    displayBalance(balance);
                });
            }
        }
    }
})();


// Minified
(function(){let c=document.getElementsByTagName("h1")[0].innerText.match(/Account #(\d+)/);for(let a of document.getElementsByTagName("a"))if(a.href){let b=a.href.match(/\/nft\/(0x[0-9a-fA-F]{1,40}-\d-0x[0-9a-fA-F]{1,40}-0x[0-9a-fA-F]{1,64}-\d+)$/);if(b){let d=d=>{let c=a.getElementsByClassName("balance-div");c.length>0&&c[0].remove();let e=`<div class="balance-div bg-loopring-blue dark:bg-loopring-dark-darkBlue text-white px-1 py-2 font-medium text-sm z-10 flex-1 flex items-center">Balance: ${d}</div>`,b=a.firstChild.firstChild;b.innerHTML=e+b.innerHTML,b.style.height="400px"};fetch("https://gateway.thegraph.com/api/294a874dfcbae25bcca653a7f56cfb63/subgraphs/id/7QP7oCLbEAjejkp7wSLTD1zbRMSiDydAmALksBB5E6i1",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:`query accountNFTSlots($where: AccountNFTSlot_filter) {accountNFTSlots(where: $where) {balance}}`,variables:{where:{account:c[1],nft:b[1]}}})}).then(a=>a.json()).then(a=>{let b=a.data.accountNFTSlots[0].balance;d(b)})}}})();

