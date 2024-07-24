
        let urlArr = [];
        const input_tab = document.getElementById("input_url");
        const url_value = document.getElementById("url_value");
        const saveUrl = document.getElementById("save_url");
        const saveTab = document.getElementById("save_tab");
        const deleteUrl = document.getElementById("delete_url");
        const URLFromLocalStorage = JSON.parse( localStorage.getItem("URL") );

        if (URLFromLocalStorage) {
            urlArr = URLFromLocalStorage
            showUrl(urlArr)
        }

        saveUrl.addEventListener("click",function(){
            let inputUrl = input_tab.value;
            input_tab.value = '';
            urlArr.push(inputUrl);
            localStorage.setItem("URL", JSON.stringify(urlArr) )
            showUrl(urlArr);
        })

        function showUrl(URL){
            let listItems = ""
            for (let i = 0; i < URL.length; i++) {
            listItems += `
            <li>
                <a target='_blank' href='${URL[i]}'>
                    ${URL[i]}
                </a>
            </li>
            `
        }
        url_value.innerHTML = listItems
    }

        saveTab.addEventListener("click",function(){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            urlArr.push(tabs[0].url)
            localStorage.setItem("URL", JSON.stringify(urlArr) );
            showUrl(urlArr)
            })
        })
        
        deleteUrl.addEventListener("click",function(){
           if( confirm("Do you want to detele all items")){
            localStorage.clear();
            urlArr = [];
            showUrl(urlArr);
           }            
        })

    